import { model, Types } from 'mongoose';
import { ArticleSchema } from '../schemas/ArticleSchema';

const Article = model('articles', ArticleSchema);

export interface ArticleInfo {
  uniqueNumber: string;
  content: string;
  nickName: string;
  toppingImage: string;
}
//반환값까지 interface를 지정 해줘야된다.
export interface ArticleData {
  _id: Object;
  uniqueNumber: string;
  content: string;
  nickName: string;
  toppingImage: string;
}

export class ArticleModel {
  async detailFindById(detailId: string): Promise<Object> {
    const releaseTime = new Date(2022, 6, 23, 0, 0, 0, 0);
    const presentTime = Date.now();
    if (releaseTime.getTime() <= presentTime) {
      const detail = await Article.findOne(
        { _id: detailId },
        {
          uniqueNumber: 0,
          toppingImage: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        }
      );
      return detail;
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
      return message;
    }
  }
  async findById(articleId: string, pageNumber: number): Promise<Object[]> {
    const pageLimit: number = 6;
    const article = await Article.find(
      { uniqueNumber: articleId },
      { createdAt: 0, updatedAt: 0, __v: 0, content: 0, uniqueNumber: 0 }
    )
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * pageLimit)
      .limit(pageLimit);

    return article;
  }
  async create(articleInfo: ArticleInfo): Promise<ArticleData> {
    const createdNewArticle = await Article.create(articleInfo);
    return createdNewArticle;
  }

  async findAll(): Promise<ArticleData[]> {
    const articles = await Article.find({});
    return articles;
  }

  async deleteById(articleId: string): Promise<{ deletedCount: number }> {
    const result = await Article.deleteOne({ _id: articleId });
    return result;
  }
}

const articleModel = new ArticleModel();

export { articleModel };
