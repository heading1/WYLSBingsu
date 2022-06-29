import {
  ToInsertAuthNumber,
  AuthNumberData,
  authNumberModel,
  AuthNumberModel,
} from '../db';

class AuthNumberService {
  constructor(private authNumberModel: AuthNumberModel) {}

  async addAuthNumber(
    AuthNumberInfo: ToInsertAuthNumber
  ): Promise<AuthNumberData> {
    // 이메일 중복 확인
    const createdAuthNumber = await this.authNumberModel.create(AuthNumberInfo);

    return createdAuthNumber;
  }

  async findAuthNumber(
    AuthNumberInfo: Partial<ToInsertAuthNumber>
  ): Promise<AuthNumberData> {
    // 이메일 중복 확인
    const createdAuthNumber = await this.authNumberModel.find(AuthNumberInfo);

    return createdAuthNumber;
  }
}

const authNumberService = new AuthNumberService(authNumberModel);

export { authNumberService };
