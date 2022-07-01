import nodemailer from 'nodemailer';

export interface mailAuthData {
  generatedAuthNumber: string;
  generatedIdentifierNumber: string;
}

const user = process.env.GMAIL_Id as string;
const pass = process.env.GMAIL_PW as string;

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user,
    pass,
  },
});

async function mailer(email: string): Promise<mailAuthData> {
  let generatedAuthNumber = Math.random().toString(36).slice(2);
  let generatedIdentifierNumber = Math.random().toString(36).slice(2);
  let info = await transport.sendMail({
    // 보내는 곳의 이름과, 메일 주소를 입력
    from: `"WYLSBingsu Team" <WYLSBingsu@gmail.com}>`,
    // 받는 곳의 메일 주소를 입력
    to: email,
    // 보내는 메일의 제목을 입력
    subject: 'WYLSBingsu 이메일 인증번호 발송',
    // 보내는 메일의 내용을 입력
    // text: 일반 text로 작성된 내용
    // html: html로 작성된 내용
    html: `<div style="padding: 70px 0; background: #f7f8f9">
      <div style="margin: 0 auto; width: 680px; color: #000">
          <h2 style="margin-bottom: 15px">

          </h2>
          <div
              style="
                  padding: 30px 90px;
                  text-align: center;
                  border: 1px solid #dfdfdf;
                  background: #fff;
              "
          >
              <h3
                  style="
                      margin-bottom: 35px;
                      font-size: 30px;
                      font-weight: 600;
                      color: #4A63C4;
                  "
              >
                  이메일 인증번호 발송
              </h3>
              <div style="padding: 10px 0 20px; border-top: 1px solid #333">
                  <p style="font-size: 18px; font-weight: 600; line-height: 20px">
                      안녕하세요 😆  빙수🍧먹을래?입니다.
                  </p>
                  <p style="font-size: 14px; font-weight: 600; line-height: 20px">
                      아래 인증 번호를 확인하시고 진행해주세요
                  </p>
              </div>
              <div style="padding: 20px 30px; background: #4A63C4">
                  🎫 인증번호: <b>${generatedAuthNumber}</b>
              </div>
              <h3>🤫 절대 타인에게 보여주지 마세요!</h3>
          </div>
          <div
              style="
                  padding: 30px 95px 0;
                  font-size: 12px;
                  font-family: 'Dotum';
                  line-height: 20px;
              "
          >
              <address style="margin-bottom: 15px; font-style: normal">
              WYLSBingsu 서울특별시 빙수구 빙동란로 293 타워 9층<br />
                  TEL. 02-7777-7777~9
              </address>
              <div style="text-align: center">
                  COPYRIGHT 2022 WYLSBingsu ALL RIGHT RESERVED.
              </div>
          </div>
      </div>
  </div>`,
  });

  return { generatedAuthNumber, generatedIdentifierNumber };
}

async function passwordMailer(email: string): Promise<string> {
  let generatedAuthNumber = temp_pw_issuance();
  let info = await transport.sendMail({
    // 보내는 곳의 이름과, 메일 주소를 입력
    from: `"WYLSBingsu Team" <WYLSBingsu@gmail.com}>`,
    // 받는 곳의 메일 주소를 입력
    to: email,
    // 보내는 메일의 제목을 입력
    subject: 'WYLSBingsu 임시 비밀번호 발송',
    // 보내는 메일의 내용을 입력
    // text: 일반 text로 작성된 내용
    // html: html로 작성된 내용
    html: `<div style="padding: 70px 0; background: #f7f8f9">
        <div style="margin: 0 auto; width: 680px; color: #000">
            <h2 style="margin-bottom: 15px">
  
            </h2>
            <div
                style="
                    padding: 30px 90px;
                    text-align: center;
                    border: 1px solid #dfdfdf;
                    background: #fff;
                "
            >
                <h3
                    style="
                        margin-bottom: 35px;
                        font-size: 30px;
                        font-weight: 600;
                        color: #4A63C4;
                    "
                >
                    임시 비밀번호 발송
                </h3>
                <div style="padding: 10px 0 20px; border-top: 1px solid #333">
                    <p style="font-size: 18px; font-weight: 600; line-height: 20px">
                        안녕하세요 😆 빙수🍧먹을래?입니다.
                    </p>
                    <p style="font-size: 14px; font-weight: 600; line-height: 20px">
                        아래 임시 비밀번호를 확인하시고 진행해주세요
                    </p>
                </div>
                <div style="padding: 20px 30px; background: #4A63C4">
                    🎫 임시 비밀번호: <b>${generatedAuthNumber}</b>
                </div>
                <h3>🤫 절대 타인에게 보여주지 마세요!</h3>
            </div>
            <div
                style="
                    padding: 30px 95px 0;
                    font-size: 12px;
                    font-family: 'Dotum';
                    line-height: 20px;
                "
            >
                <address style="margin-bottom: 15px; font-style: normal">
                WYLSBingsu 서울특별시 빙수구 빙동란로 293 타워 9층<br />
                    TEL. 02-7777-7777~9
                </address>
                <div style="text-align: center">
                    COPYRIGHT 2022 WYLSBingsu ALL RIGHT RESERVED.
                </div>
            </div>
        </div>
    </div>`,
  });

  return generatedAuthNumber;
}

function temp_pw_issuance(): string {
  let ranValue1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  let ranValue2 = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  let ranValue3 = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  let ranValue4 = ['$', '@', '$', '!', '%', '*,', '#', '?', '&'];

  let temp_pw: string = '';
  for (let i = 0; i < 2; i++) {
    let ranPick1 = Math.floor(Math.random() * ranValue1.length);
    let ranPick2 = Math.floor(Math.random() * ranValue2.length);
    let ranPick3 = Math.floor(Math.random() * ranValue3.length);
    let ranPick4 = Math.floor(Math.random() * ranValue4.length);
    temp_pw =
      temp_pw +
      ranValue1[ranPick1] +
      ranValue2[ranPick2] +
      ranValue3[ranPick3] +
      ranValue4[ranPick4];
  }
  let arraypw = temp_pw.split('');
  arraypw = [...arraypw].sort(() => Math.random() - 0.5);

  const generatedAuthNumber = arraypw.join('');

  return generatedAuthNumber;
}

export { mailer, passwordMailer };
