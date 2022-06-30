interface DeviceViewport {
  deviceWidth?: string;
  deviceHeight?: string;
}

interface FormInputType {
  email: string;
  password: string;
}

interface RegisterInputType extends FormInputType {
  nickName: string;
  emailAuthNumber: string;
}

interface ArticleInputType {
  nickName: string;
  content: string;
}

interface ArticlePostType extends ArticleInputType {
  uniqueNumber: string;
  toppingImage: string;
}

interface ResponseObjectType {
  type: string;
  content: string;
}

export type {
  DeviceViewport,
  FormInputType,
  RegisterInputType,
  ArticleInputType,
  ArticlePostType,
  ResponseObjectType,
};
