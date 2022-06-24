import { Router } from 'express';

const ArticleRouter = Router();

ArticleRouter.post('/article', async (req, res, next) => {
  interface article {
    uniqueNumber: string;
    nickName: string;
    content: string;
    toppingImage: string;
  }
  //body 값 정리
  const { uniqueNumber, nickName, content, toppingImage }: article = req.body;
});

export { ArticleRouter };
