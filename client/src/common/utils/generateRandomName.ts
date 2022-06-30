import name from './name.json';

const generateRandomName = () => {
  const firstCount = Math.floor(Math.random() * name['first'].length);
  const lastCount = Math.floor(Math.random() * name['last'].length);
  const random = String(Math.floor(Math.random() * 10)).padStart(2, '0');
  const nickName = `${name['first'][firstCount]} ${name['last'][lastCount]} ${random}`;

  return nickName;
};

export default generateRandomName;
