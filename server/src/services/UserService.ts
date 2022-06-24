import bcrypt from 'bcrypt';
import {
  userModel,
  UserModel,
  UserInfo,
  UserData,
} from '../db';


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

    const newUserInfo = { nickName, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }
}

const userService = new UserService(userModel);

export { userService };
