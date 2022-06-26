import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  userModel,
  UserModel,
  UserInfo,
  UserData,
} from '../db';

interface LoginInfo {
  email: string;
  password: string;
}

interface LoginResult {
  acessToken: string;
  refreshToken: string;
}

class UserService {
  constructor(private userModel: UserModel) {}

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

    const acessToken = jwt.sign({ userEmail: user.email, userNickname: user.nickName }, secretKey,{
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({}, secretKey,{
      expiresIn: "1d",
    });

    const updatedUser = await this.userModel.updateRefreshToken({
      userId,
      update: {refreshToken : {base: refreshToken} },
    });


    return { acessToken, refreshToken };
  }
}

const userService = new UserService(userModel);

export { userService };
