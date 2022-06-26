import { model,Types } from 'mongoose';
import { UserSchema } from '../schemas/UserSchema';

const User = model('users', UserSchema);

export interface UserRefreshToken {
  kakao?: string;
  github?: string;
  google?: string;
  base?:string;
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

export interface ToUpdateRefreshToken {
    userId: object;
    update: {
      [key: string]: UserRefreshToken;
    };
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

  async updateRefreshToken({ userId, update }: ToUpdateRefreshToken): Promise<UserData> {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

}

const userModel = new UserModel();

export { userModel };
