import 'dotenv/config';
import { app } from './src/app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`π‘ ######################################################
####### μ μμ μΌλ‘ μλ²λ₯Ό μμνμμ΅λλ€.   ${PORT} #######`);
});
