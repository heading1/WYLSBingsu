import { model, Types } from 'mongoose';
import { AuthNumberSchema } from '../schemas/AuthNumberSchema';

const AuthNumber = model('authNumber', AuthNumberSchema);

export interface ToInsertAuthNumber {
  email: string;
  identifierNumber: string;
  authNumber: string;
  flag: string;
}

export interface AuthNumberData {
  _id: object;
  email: string;
  identifierNumber: string;
  authNumber: string;
  flag: string;
  createdAt: Date;
}

export class AuthNumberModel {
  async create(AuthNumberInfo: ToInsertAuthNumber): Promise<AuthNumberData> {
    const createdAuthNumber = await AuthNumber.create(AuthNumberInfo);
    return createdAuthNumber;
  }

  async find(
    AuthNumberInfo: Partial<ToInsertAuthNumber>
  ): Promise<AuthNumberData> {
    const findAuthNumber = await AuthNumber.findOne(AuthNumberInfo);
    return findAuthNumber;
  }
}

const authNumberModel = new AuthNumberModel();

export { authNumberModel };
