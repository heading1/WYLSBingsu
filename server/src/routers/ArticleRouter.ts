import { Router } from 'express';
import { articleService } from '../services';
import { authJwt, tokenRequestMatch } from '../middlewares';

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

articleRouter.get('/detail/tail/:_id', authJwt, async (req, res, next) => {
  try {
    const releaseTime = new Date(2022, 6, 23, 0, 0, 0, 0);
    const presentTime = Date.now();
    if (releaseTime.getTime() <= presentTime) {
      const _id: string = req.params._id;
      const articleDetailData = await articleService.getDetailData(_id);
      if (articleDetailData.uniqueNumber !== req.currentUserId) {
        return res.status(200).json({ message: '내 빙수만 볼 수 있습니다.' });
      }
      res.status(200).json(articleDetailData);
    } else {
      const day = Math.ceil(
        (releaseTime.getTime() - presentTime) / (1000 * 60 * 60 * 24)
      );
      const hour = Math.ceil(
        ((releaseTime.getTime() - presentTime) % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );
      const min = Math.ceil(
        ((releaseTime.getTime() - presentTime) % (1000 * 60 * 60)) / (1000 * 60)
      );
      const sec = Math.ceil(
        ((releaseTime.getTime() - presentTime) % (1000 * 60)) / 1000
      );
      const message = {
        message: `${day}일 ${hour}시간 ${min}분 ${sec}초 남았네요. 빙수먹으려면 좀 기다려야겠네요! 🥲`,
      };
      return res.status(200).json(message);
    }
  } catch (error) {
    next(error);
  }
});

export { articleRouter };
