import 'dotenv/config';
import { app } from './src/app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🛡 ######################################################
####### 정상적으로 서버를 시작하였습니다.   ${PORT} #######`);
});
