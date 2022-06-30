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
articleRouter.get('/:pageNumber/:_id', async (req, res, next) => {
  try {
    const _id: string = req.params._id;
    const pageNumber: number = Number(req.params.pageNumber);
    const articleData = await articleService.getArticleData(_id, pageNumber);

    res.status(200).json(articleData);
  } catch (error) {
    next(error);
  }
});

articleRouter.get('/detail/tail/:_id', async (req, res, next) => {
  try {
    const _id: string = req.params._id;
    const articleDetailData = await articleService.getDetailData(_id);
    res.status(200).json(articleDetailData);
  } catch (error) {
    next(error);
  }
});

export { articleRouter };
