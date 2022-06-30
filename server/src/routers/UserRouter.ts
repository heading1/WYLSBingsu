import { Router } from 'express';
import is from '@sindresorhus/is';
import { redisClient } from '../app';
import {
  userService,
  mailer,
  authNumberService,
  passwordMailer,
} from '../services';
import { authJwt, tokenRequestMatch } from '../middlewares';

const userRouter = Router();

userRouter.post('/register', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    interface user {
      nickName: string;
      email: string;
      password: string;
      emailAuthNumber: string;
    }

    const { nickName, email, password, emailAuthNumber }: user = req.body;

    // 이메일 폼 검증 이동 -> 이메일 발송 API
    // let regexEmail =
    //   /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (!regexEmail.test(email)) {
    //   throw new Error('이메일 형식이 올바르지 않습니다.');
    // }

    //패스워드 폼 검증
    let regexPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    if (!regexPassword.test(password)) {
      throw new Error('비밀번호 형식이 올바르지 않습니다.');
    }

    //이메일 인증 로직
    let serverAuthNumber: string = '0';
    const AuthEmailIdentifier = req.cookies['AuthEmailIdentifier'];
    console.log('req.cookies', AuthEmailIdentifier);
    if (!AuthEmailIdentifier) {
      throw new Error('이메일 인증을 다시 시작하세요');
    }
    const redisData = await redisClient.HGETALL(AuthEmailIdentifier);
    console.log(redisData);
    console.log(redisData.authNumber);
    console.log(typeof redisData.authNumber);

    if (typeof redisData.authNumber == 'undefined') {
      const flag: string = 'email';
      const toFindAuthNumber = {
        email: email,
        flag: flag,
        identifierNumber: AuthEmailIdentifier,
      };
      const dbSave = await authNumberService.findAuthNumber(toFindAuthNumber);
      if (!dbSave) {
        throw new Error(
          '인증 시간이 지났습니다. 이메일 인증을 다시 시작하세요'
        );
      }
      serverAuthNumber = dbSave.authNumber;
    } else {
      serverAuthNumber = redisData.authNumber;
    }

    if (emailAuthNumber !== serverAuthNumber) {
      throw new Error('인증번호가 틀립니다. 다시 입력해주세요');
    }

    // // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      nickName,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/login', async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    // const email: string = req.body.email;
    // const password: string = req.body.password;

    const { email, password } = req.body;

    // 위 데이터가 db에 있는지 확인하고,
    // db 있을 시 로그인 성공 및, 토큰 받아오기
    const userToken = await userService.getUserToken({ email, password });

    const { accessToken } = userToken;
    res.cookie('user', accessToken, {
      httpOnly: true,
    });

    res.status(201).json({ message: '로그인에 성공했습니다!' });
  } catch (error) {
    next(error);
  }
});

userRouter.get('/random', async (req, res, next) => {
  try {
    const randomLink = await userService.findRandomUser();

    res.status(200).json(randomLink);
  } catch (error) {
    next(error);
  }
});

userRouter.patch('/', authJwt, async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const email: string = req.body.email;
    const password: string = req.body.password;
    const nickName: string = req.body.nickName;

    let regexPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    if (!regexPassword.test(password)) {
      throw new Error('비밀번호 형식이 올바르지 않습니다.');
    }

    // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
    const currentPassword = req.body.currentPassword;

    // currentPassword 없을 시, 진행 불가
    if (!currentPassword) {
      throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
    }

    const userInfoRequired = { email, currentPassword };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(nickName && { nickName }),
      ...(password && { password }),
    };

    // 사용자 정보를 업데이트함.
    const updatedUserInfo = await userService.setUser(
      userInfoRequired,
      toUpdate
    );

    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
});

userRouter.delete('/', authJwt, async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
    const password: string = req.body.password;

    // Password 없을 시, 진행 불가
    if (!password) {
      throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
    }

    // 사용자 정보를 삭제함.
    const deleteResult = await userService.deleteUserData(
      req.currentUserEmail,
      password
    );

    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/link', authJwt, async (req, res, next) => {
  try {
    const userEmail = req.currentUserEmail;

    const userLink = await userService.getUserLink(userEmail);

    res.status(200).json(userLink);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/mail', async (req, res, next) => {
  try {
    //이메일 중복확인
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
    const email: string = req.body.email;

    let regexEmail =
      /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }

    const mailcheck = await userService.findUserByEmail(email);

    if (mailcheck) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
      );
    }

    const mailAuth = await mailer(email);

    const { generatedAuthNumber, generatedIdentifierNumber } = mailAuth;
    console.log(generatedAuthNumber, generatedIdentifierNumber);
    console.log('통과했습니다');
    const redisSave = await redisClient.HSET(generatedIdentifierNumber, {
      email: email,
      authNumber: generatedAuthNumber,
    });
    console.log('통과했습니다', redisSave);

    const redisExpire = await redisClient.expire(
      generatedIdentifierNumber,
      180
    );
    console.log(redisExpire);

    // const redisData = await redisClient.HGETALL(generatedIdentifierNumber);
    // console.log(redisData);

    if (!redisSave || redisSave < 1) {
      //dbtest
      const flag: string = 'email';
      const authNumber = generatedAuthNumber;
      const identifierNumber = generatedIdentifierNumber;
      const toInsertAuthNumberInfo = {
        email,
        authNumber,
        identifierNumber,
        flag,
      };
      const dbSave = await authNumberService.addAuthNumber(
        toInsertAuthNumberInfo
      );
      if (!dbSave) {
        throw new Error('디비,redis연결이 이상합니다.');
      }
    }

    res.cookie('AuthEmailIdentifier', generatedIdentifierNumber, {
      httpOnly: true,
    });
    res.status(201).json({ message: '메일발송성공' });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/password-auth', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // body data로부터, 확인용으로 사용할 현재 메일인증번호를 추출함.
    interface user {
      email: string;
      emailAuthNumber: string;
    }

    const { email, emailAuthNumber }: user = req.body;

    //이메일 인증 로직
    let serverAuthNumber: string = '0';
    const AuthEmailIdentifier = req.cookies['AuthEmailIdentifier'];
    console.log('req.cookies', AuthEmailIdentifier);
    if (!AuthEmailIdentifier) {
      throw new Error('이메일 인증을 다시 시작하세요');
    }
    const redisData = await redisClient.HGETALL(AuthEmailIdentifier);
    console.log(redisData);
    console.log(redisData.authNumber);
    console.log(typeof redisData.authNumber);

    if (typeof redisData.authNumber == 'undefined') {
      const flag: string = 'email';
      const toFindAuthNumber = {
        email: email,
        flag: flag,
        identifierNumber: AuthEmailIdentifier,
      };
      const dbSave = await authNumberService.findAuthNumber(toFindAuthNumber);
      if (!dbSave) {
        throw new Error(
          '인증 시간이 지났습니다. 이메일 인증을 다시 시작하세요'
        );
      }
      serverAuthNumber = dbSave.authNumber;
    } else {
      serverAuthNumber = redisData.authNumber;
    }

    if (emailAuthNumber !== serverAuthNumber) {
      throw new Error('인증번호가 틀립니다. 다시 입력해주세요');
    }

    const passwordAuthNumber = await passwordMailer(email);

    const updatePassword = await userService.setPassword(
      email,
      passwordAuthNumber
    );

    res.status(200).json({ message: '비밀번호를 변경하였습니다.' });
  } catch (error) {
    next(error);
  }
});

//비밀번호 password인증에 필요한 유저 이메일 발송
userRouter.post('/password-mail', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
    const email: string = req.body.email;

    let regexEmail =
      /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }

    const mailcheck = await userService.findUserByEmail(email);

    if (!mailcheck) {
      throw new Error('가입된 이메일이 아닙니다. 다시 이메일을 입력해주세요.');
    }

    const mailAuth = await mailer(email);

    const { generatedAuthNumber, generatedIdentifierNumber } = mailAuth;
    console.log(generatedAuthNumber, generatedIdentifierNumber);
    console.log('통과했습니다');
    const redisSave = await redisClient.HSET(generatedIdentifierNumber, {
      email: email,
      authNumber: generatedAuthNumber,
    });
    console.log('통과했습니다', redisSave);

    const redisExpire = await redisClient.expire(
      generatedIdentifierNumber,
      180
    );
    console.log(redisExpire);

    // const redisData = await redisClient.HGETALL(generatedIdentifierNumber);
    // console.log(redisData);

    if (!redisSave || redisSave < 1) {
      //dbtest
      const flag: string = 'email';
      const authNumber = generatedAuthNumber;
      const identifierNumber = generatedIdentifierNumber;
      const toInsertAuthNumberInfo = {
        email,
        authNumber,
        identifierNumber,
        flag,
      };
      const dbSave = await authNumberService.addAuthNumber(
        toInsertAuthNumberInfo
      );
      if (!dbSave) {
        throw new Error('디비,redis연결이 이상합니다.');
      }
    }

    res.cookie('AuthEmailIdentifier', generatedIdentifierNumber, {
      httpOnly: true,
    });
    res.status(201).json({ message: '메일발송성공' });
  } catch (error) {
    next(error);
  }
});

export { userRouter };
