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
  _id: string;
  email: string;
  nickName: string;
  password: string;
  userType?: string;
  refreshToken?: UserRefreshToken;
}

export class UserModel {

  async findByEmail(email: string): Promise<UserData> {
    const user = await User.findOne({ email });
    return user;
  }
      

  async create(userInfo: UserInfo): Promise<UserData> {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }
}

const userModel = new UserModel();

export { userModel };

