import { Request, Response, NextFunction } from 'express';

async function tokenRequestMatch(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.currentUserId !== req.params._id) {
      console.log(
        '사용자 요청이 있었습니다. 하지만 권한이 없거나 적절하지 않습니다.'
      );
      res.status(403).json({
        result: 'forbidden-approach',
        message: '로그인된 유저는 요청할 수 있는 권한이 없습니다.',
      });

      return;
    }
    next();
  } catch (error) {
    res.status(403).json({
      result: 'forbidden-approach',
      message: '정상적인 토큰이 아닙니다.',
    });
    console.log(error);
    return;
  }
}

export { tokenRequestMatch };
