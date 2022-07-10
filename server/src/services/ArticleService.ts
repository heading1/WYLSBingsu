import { articleModel, ArticleModel, ArticleInfo, ArticleData } from '../db';

class ArticleService {
  constructor(private articleModel: ArticleModel) {}

  async addArticle(articleInfo: ArticleInfo): Promise<ArticleData> {
    // db에 저장
    const createdNewArticle = await this.articleModel.create(articleInfo);

    return createdNewArticle;
  }

  async getArticles(): Promise<ArticleData[]> {
    const products = await this.articleModel.findAll();

    return products;
  }
  async getDetailData(detailId: string): Promise<ArticleData> {
    const detail = await this.articleModel.detailFindById(detailId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!detail) {
      throw new Error('해당 id의 글은 없습니다. 다시 한 번 확인해 주세요.');
    }

    return detail;
  }
  async getArticleData(
    articleId: string,
    pageNumber: number
  ): Promise<Object[]> {
    const article = await this.articleModel.findById(articleId, pageNumber);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!article) {
      throw new Error('해당 id의 글은 없습니다. 다시 한 번 확인해 주세요.');
    }

    return article;
  }

  async deleteArticleData(articleId: string): Promise<{ result: string }> {
    const { deletedCount } = await this.articleModel.deleteById(articleId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${articleId} 글 삭제에 실패하였습니다`);
    }

    return { result: 'success' };
  }
}

const articleService = new ArticleService(articleModel);

export { articleService };
