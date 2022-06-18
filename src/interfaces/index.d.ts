export enum Gender {
  male = "male",
  female = "female",
}
export enum RedirectionTypeEnum {
  inAppBrowser = "inAppBrowser",
  phonenumber = "phonenumber",
  sms = "sms",
  mailto = "mailto",
  whatsApp = "whatsApp",
}

export enum LinkTypeEnum {
  contactInfo = "contactInfo",
  socialMedia = "contactInfo",
  bussiness = "bussiness",
  payments = "payments",
  music = "music",
}

export enum Category {
  technology = "technology",
  finance = "finance",
  education = "education",
}

export type CustomLink = {
  id: string;
  title: string;
  image: Upload;
  value: string;
  show: boolean;
};

export type Title = {
  _id: string;
  title: string;
  category: Category;
  updated_at: Date;
  deleted: boolean;
};
export type Upload = {
  _id: string;
  type: string;
  filename: string;
  created_at: Date;
};

export type GlobalLink = {
  _id: string;
  type: LinkTypeEnum;
  title: string;
  redirectionType: RedirectionTypeEnum;
  placeholder: string;
  image: Upload;
  created_at: Date;
  updated_at: Date;
  deleted: boolean;
};
export type MyLink = {
  globalLink: GlobalLink;
  value: string;
  show: boolean;
};
export type AuthReturn = {
  id: string;
  email: string;
  username: string;
  facebookId: string;
  googleId: string;
  twitterId: string;
  instagramId: string;
  gender: Gender;
  dob: Date;
  name: string;
  city: string;
  country: string;
  personalBio: string;
  created_at: Date;
  updated_at: Date;
  token: string;
  myLinks: [MyLink];
  profileImage: Upload;
  coverImage: Upload;
  title: Title;
  customLinks: [CustomLink];
  direct: Direct;
};

export type CreateUserInput = {
  email: string;
  password: string;
  gender: Gender;
  dob: Date;
};

export type LogInInput = {
  email: string;
  password: string;
};

export type LogInSocialsInput = {
  facebookId?: string;
  googleId?: string;
  twitterId?: string;
  instagramId?: string;
};

export type UpdateUserInput = {
  facebookId?: string;
  googleId?: string;
  twitterId?: string;
  instagramId?: string;
  gender?: string;
  dob?: Date;
  name?: string;
  city?: string;
  country?: string;
  personalBio?: string;
  profileImage?: string;
  coverImage?: string;
  title?: string;
};

export type CreateMyLinkInput = {
  globalLink: string;
  value: string;
  show: boolean;
};

export type Direct = {
  linkId: string;
  isOn: boolean;
};
export type UserReturn = {
  _id: string;
  id: string;
  email: string;
  gender: Gender;
  username: string;
  dob: Date;
  name: string;
  city: string;
  country: string;
  personalBio: string;
  myLinks: [MyLink];
  profileImage: Upload;
  coverImage: Upload;
  title: Title;
  customLinks: [CustomLink];
  direct: Direct;
};

export type Contact = {
  _id: string;
  owner: UserReturn;
  contacts: [UserReturn];
  created_at: Date;
  updated_at: Date;
  deleted: boolean;
};

export type ChangeUsernameInput = {
  username: string;
};

export type ShowMyLinkInput = {
  globalLinkId: string;
  show?: boolean;
};

export type DirectUpdateInput = {
  isOn?: boolean;
  linkId?: string;
};

export type CustomLinkInput = {
  id?: string;
  title: string;
  image: string;
  value: string;
};

export type ShowCustomLinkInput = {
  id: string;
  show: boolean;
};
export type Choice = {
  image: Upload;
  colorsHex: string;
};
export type Product = {
  _id: string;
  name: string;
  choices: [Choice];
  price: string;
  description?: string;
};

export type OrderProductInput = {
  product: string;
  quantity: number;
  color: string;
};

export type OrderProductInputFrontEnd = {
  product: Product;
  quantity: number;
  color: string;
  choice: Choice;
};

export type CreateOrderInput = {
  name: string;
  email: string;
  location: string;
  phonenumber: string;
  products: OrderProductInput[];
};
