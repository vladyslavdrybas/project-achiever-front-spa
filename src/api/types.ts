import _PostsCollectionRequest from "@/api/requests/_PostsCollectionRequest";

export enum TPageLength {
  five = 5,
  ten = 10,
  twenty = 20,
  fifty = 50,
}

export type TPage = {
  id: number;
  offset: number;
  length: number;
}

export type TProfileResponse = {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  locale: string;
  object: string;
  id: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isBanned: boolean;
  isDeleted: boolean;
  achievementsAmount?: number;
  avatar?: string;
}

export type TSignInResponse = {
  accessToken: string;
  refreshToken: string;
}

export type TAchievementListViewResponse = any;
export type TAchievementListCollectionResponse = TAchievementListViewResponse[];
export type TAchievementViewResponse = any;
export type TAchievementsCollectionResponse = TAchievementViewResponse[];
export type TAchievementPrerequisites = any;
export type TUserViewResponse = any;
export type TUserViewCollection = TUserViewResponse[];
export type TPostViewResponse = any;
export type TPostsCollection = TPostViewResponse[];
