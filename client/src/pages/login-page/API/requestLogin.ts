import axios from 'axios';
import { FormInputType } from '@/types/types';

const URI = `http://localhost:8070/user/login`;

const requestLogin = async (data: FormInputType) => {
  try {
    const response = await axios.post(URI, data);
    if (response.status === 200) {
      console.log(response.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export default requestLogin;

// "email": "test2@test.com",
// "password": "Test1234@"
