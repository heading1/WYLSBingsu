import { model } from 'mongoose';
import { UserSchema } from '../schemas/UserSchema';

const User = model('users', UserSchema);

export interface UserRefreshToken {
  kakao: String;
  github: String;
  google: String;
}

export interface UserInfo {
  email: string;
  nickName: string;
  password: string;
  userType?: string;
  refreshToken?: UserRefreshToken;
}

export interface UserData {
  _id: object;
  email: string;
  nickName: string;
  password: string;
  userType?: string;
  refreshToken?: UserRefreshToken;
}

export class UserModel {
  async findByEmail(email: string): Promise<UserData | null> {
    const user = await User.findOne({ email });
    return user as null;
  }

  async findByRandom(): Promise<UserData> {
    const user = await User.aggregate([{ $sample: { size: 1 } }]);
    const randomUser = user[0];
    return randomUser;
  }

  async create(userInfo: UserInfo): Promise<UserData> {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }
}

const userModel = new UserModel();

export { userModel };
