import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { userService } from '../services';

async function authJwt(req: Request, res: Response, next: NextFunction) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  // const userAccessToken = req.headers['authorization']?.split(' ')[1];

  var accessCookies = req.headers['cookie']?.split(';').map(function (element) {
    let elements = element.split('=');
    return {
      key: elements[0].replace(/(\s*)/g, ''),
      value: elements[1],
    };
  });

  console.log(accessCookies);

  const accessCookie = accessCookies?.find((token) => token.key === 'user');
  console.log(accessCookie);
  console.log(accessCookie?.value);

  const userAccessToken = accessCookie?.value;

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (!userAccessToken || userAccessToken === 'null') {
    res.status(403).json({
      result: 'forbidden-approach',
      message: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });

    return;
  }

  // 해당 token 이 정상적인 token인지 확인
  try {
    const verifyAccessToken = verifyToken(userAccessToken);
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    // access token 만료
    if (verifyAccessToken == 'jwt expired') {
      const userInfo: any = jwt_decode(userAccessToken);

      const { userEmail, userId } = userInfo;

      const user = await userService.findUserByEmail(userEmail);

      const userRefreshToken = user.refreshToken?.base as string;

      const verifyRefreshToken = verifyToken(userRefreshToken);

      if (verifyRefreshToken == 'jwt expired') {
        res.status(403).json({
          result: 'login expired',
          message: '로그인이 만료되었습니다. 다시 로그인 해주세요',
        });

        return;
      } else {
        const newAccessToken = jwt.sign(
          {
            userEmail: user.email,
            userNickname: user.nickName,
            userId: user._id.toString(),
          },
          secretKey,
          {
            expiresIn: '1h',
          }
        );

        res.cookie('user', newAccessToken, {
          httpOnly: true,
        });

        req.currentUserEmail = user.email;
        req.currentUserId = user._id.toString();
      }

      //  access token 만료 X
    } else {
      const { userEmail } = jwt.verify(
        userAccessToken,
        secretKey
      ) as JwtPayload;

      const user = await userService.findUserByEmail(userEmail);

      const userId = user._id;
      req.currentUserEmail = user.email;
      req.currentUserId = userId.toString();

      const userRefreshToken = user.refreshToken?.base as string;

      const verifyRefreshToken = verifyToken(userRefreshToken);

      // access token은 유효하지만, refresh token은 만료된 경우 ->  refresh token 재발급
      if (verifyRefreshToken == 'jwt expired') {
        const newRefreshToken = jwt.sign({}, secretKey, {
          expiresIn: '24h',
        });

        const updatedUser = await userService.updateRefreshToken({
          userId,
          update: { refreshToken: { base: newRefreshToken } },
        });
      }

      // accesss token과 refresh token 모두가 유효한 경우 -> 다음 미들웨어로
      else {
      }
    }

    next();
  } catch (error) {
    res.status(403).json({
      result: 'forbidden-approach',
      message: '정상적인 토큰이 아닙니다.',
    });

    return;
  }
}

function verifyToken(token: string): string | JwtPayload {
  let result: string | JwtPayload;
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(token, secretKey) as JwtPayload;
    result = jwtDecoded;
  } catch (error: any) {
    result = error.message;
  }
  return result;
}

export { authJwt };
