import { Router } from 'express';
import is from '@sindresorhus/is';
import { userService } from '../services';
import { authJwt } from '../middlewares';

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
    interface user{
        nickName:string;
        email:string;
        password:string;
    }
        
    const {nickName,email,password}:user = req.body
        
    let regexEmail = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(email)){
      throw new Error(
        '이메일 형식이 올바르지 않습니다.'
      );
    }

    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    if (!regexPassword.test(password)){
      throw new Error(
        '비밀번호 형식이 올바르지 않습니다.'
      );
    }

    // 위 데이터를 유저 db에 추가하기
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

    const { email,password } = req.body;

    // 위 데이터가 db에 있는지 확인하고,
    // db 있을 시 로그인 성공 및, 토큰 받아오기
    const userToken = await userService.getUserToken({ email, password });

    res.status(201).json(userToken);
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

userRouter.get('/link', authJwt, async (req, res, next) => {
  try {

    const userEmail = req.currentUserEmail;

    const userLink = await userService.getUserLink(userEmail);

    res.status(200).json(userLink);
    
  } catch (error) {
    next(error);
  }
});


export { userRouter };
