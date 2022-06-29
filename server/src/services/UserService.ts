import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel, UserModel, UserInfo, UserData } from '../db';

interface UserRefreshToken {
  kakao?: string;
  github?: string;
  google?: string;
  base?: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

interface LoginResult {
  accessToken: string;
}

interface ToUpdateRefreshToken {
  userId: object;
  update: {
    [key: string]: UserRefreshToken;
  };
}

interface UserInfoRequired {
  email: string;
  currentPassword: string;
}

class UserService {
  constructor(private userModel: UserModel) {}

  async findUserByEmail(email: string): Promise<UserData> {
    // 객체 destructuring

    const user = await this.userModel.findByEmail(email);

    return user;
  }

  async updateRefreshToken({
    userId,
    update,
  }: ToUpdateRefreshToken): Promise<UserData> {
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

    // 이메일 중복 확인 -> 유저 이메일 발송 API로 처리
    // const user = await this.userModel.findByEmail(email);
    // if (user) {
    //   throw new Error(
    //     '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
    //   );
    // }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = {
      nickName,
      email,
      password: hashedPassword,
      userType: 'base',
    };

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

    const accessToken = jwt.sign(
      { userEmail: user.email, userNickname: user.nickName },
      secretKey,
      {
        expiresIn: '30s',
      }
    );

    const refreshToken = jwt.sign({}, secretKey, {
      expiresIn: '50s',
    });

    const updatedUser = await this.userModel.updateRefreshToken({
      userId,
      update: { refreshToken: { base: refreshToken } },
    });

    return { accessToken };
  }

  // 랜덤 유저 링크 생성
  async findRandomUser(): Promise<String> {
    const randomUser = await this.userModel.findByRandom();

    const { _id } = randomUser;

    const randomLink = _id.toString();

    return randomLink;
  }

  // 유저정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setUser(
    userInfoRequired: UserInfoRequired,
    toUpdate: Partial<UserInfo>
  ): Promise<UserData> {
    // 객체 destructuring
    const { email, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findByEmail(email);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 이제 업데이트 시작

    // 비밀번호도 변경하는 경우에는 해쉬화 해주어야 함.
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password!, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await this.userModel.update({
      email,
      update: toUpdate,
    });

    return user;
  }

  async getUserLink(email: string): Promise<String> {
    const user = await this.userModel.findByEmail(email);

    const { _id } = user;

    const userLink = _id.toString();

    return userLink;
  }

  async deleteUserData(
    email: string,
    password: string
  ): Promise<{ message: string }> {
    let user = await this.userModel.findByEmail(email);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    const { deletedCount } = await this.userModel.deleteById(email);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${email} 님의 회원탈퇴를 실패하였습니다.`);
    }

    return { message: `${email} 님의 회원탈퇴하였습니다.` };
  }
}

const userService = new UserService(userModel);

export { userService };
