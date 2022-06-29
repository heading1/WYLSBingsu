import { Router } from 'express';
import { articleService } from '../services';

const articleRouter = Router();

articleRouter.post('/register', async (req, res, next) => {
  try {
    interface article {
      uniqueNumber: string;
      content: string;
      nickName: string;
      toppingImage: string;
    }
    //body 값 정리
    const { uniqueNumber, content, nickName, toppingImage }: article = req.body;

    const newArticle = await articleService.addArticle({
      uniqueNumber,
      content,
      nickName,
      toppingImage,
    });
    res.status(201).json(newArticle);
  } catch (error) {
    next(error);
  }
});

export { articleRouter };
