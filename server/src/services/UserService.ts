import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  userModel,
  UserModel,
  UserInfo,
  UserData,
} from '../db';

interface UserRefreshToken {
  kakao?: string;
  github?: string;
  google?: string;
  base?:string;
}

interface LoginInfo {
  email: string;
  password: string;
}

interface LoginResult {
  accessToken: string;
  refreshToken: string;
}

interface ToUpdateRefreshToken {
  userId: object;
  update: {
    [key: string]: UserRefreshToken;
  };
}

class UserService {
  constructor(private userModel: UserModel) {}

   async findUserByEmail(email: string): Promise<UserData> {
    // 객체 destructuring
  
    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);
    
    return user;
  }

  async updateRefreshToken({ userId, update }: ToUpdateRefreshToken): Promise<UserData> {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await this.userModel.updateRefreshToken({
      userId,
      update,
    });
    return updatedUser;
  }


  // 일반 회원가입
  async addUser(userInfo: UserInfo): Promise<UserData> {
    // 객체 destructuring
    const { email, nickName, password } = userInfo;

    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
      );
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = { nickName, email, password: hashedPassword,userType:"base"};

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }


  async getUserToken(loginInfo: LoginInfo): Promise<LoginResult> {
    // 객체 destructuring
    const { email, password } = loginInfo;

    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const userId = user._id;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    const accessToken = jwt.sign({ userEmail: user.email, userNickname: user.nickName }, secretKey,{
      expiresIn: "30s",
    });

    const refreshToken = jwt.sign({}, secretKey,{
      expiresIn: "50s",
    });

    const updatedUser = await this.userModel.updateRefreshToken({
      userId,
      update: {refreshToken : {base: refreshToken} },
    });


    return { accessToken, refreshToken };
  }

  // 랜덤 유저 링크 생성
  async findRandomUser(): Promise<String> {

    const randomUser = await this.userModel.findByRandom();

    const {_id } = randomUser;
    

    const randomLink = _id.toString()
    
    return randomLink;

  }
}

const userService = new UserService(userModel);

export { userService };
