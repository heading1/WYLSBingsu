import { model } from 'mongoose';
import { ArticleSchema } from '../schemas/ArticleSchema';

const Article = model('artilces', ArticleSchema);

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
  async findById(articleId: string): Promise<ArticleData | null> {
    const article = await Article.findOne({ _id: articleId });
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
