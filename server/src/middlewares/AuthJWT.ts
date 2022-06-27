import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import { userService } from '../services';

async function authJwt(req: Request, res: Response, next: NextFunction) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userAccessToken = req.headers['authorization']?.split(' ')[1];

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (!userAccessToken || userAccessToken === 'null') {

    res.status(403).json({
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });

    return;
  }

  // 해당 token 이 정상적인 token인지 확인
  try {
    
    const verifyAccessToken = verifyToken(userAccessToken);
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    // access token 만료
    if (verifyAccessToken == "jwt expired"){  
        
        const userInfo:any = jwt_decode(userAccessToken);
        
        const { userEmail } = userInfo;

        const user = await userService.findUserByEmail(userEmail);

        const userRefreshToken = user.refreshToken?.base as string;

        const verifyRefreshToken = verifyToken(userRefreshToken);

        // access token과 refresh token 모두가 만료된 경우 -> 에러 발생
        if(verifyRefreshToken == "jwt expired"){
            
            res.send({ errorMessage: "로그인이 필요합니다." });

            return ; 
        
        // access token은 만료됐지만, refresh token은 유효한 경우 ->  access token 재발급
        } else {
            
            const newAccessToken = jwt.sign({ userEmail: user.email, userNickname: user.nickName }, secretKey,{
                expiresIn: "30s",
              });
            
            res.send({ message: "new AccessToken", newAccessToken });
      
        }
    
    //  access token 만료 X
    } else {
        const { userEmail } = jwt.verify(userAccessToken,secretKey) as JwtPayload;

        const user = await userService.findUserByEmail(userEmail);

        const userId = user._id;

        const userRefreshToken = user.refreshToken?.base as string;

        const verifyRefreshToken = verifyToken(userRefreshToken);

        // access token은 유효하지만, refresh token은 만료된 경우 ->  refresh token 재발급
        if(verifyRefreshToken == "jwt expired"){
            
            const newRefreshToken = jwt.sign({}, secretKey,{
                expiresIn: "50s",
              });

            const updatedUser = await userService.updateRefreshToken({
                userId,
                update: {refreshToken : {base: newRefreshToken} },
            });

            res.send({ message: "new RefreshToken", newRefreshToken });

        }

        // accesss token과 refresh token 모두가 유효한 경우 -> 다음 미들웨어로
        else{

        } 
    }

    next();
  } catch (error) {
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });
    console.log(error);
    return;
  }
}

function verifyToken(token:string): string | JwtPayload {
    let result:string | JwtPayload ;
    try {
      const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
      const jwtDecoded = jwt.verify(token, secretKey) as JwtPayload;
      result = jwtDecoded;
    } catch (error:any) {
        result = error.message;
    }
    return result;
  }

export { authJwt };
