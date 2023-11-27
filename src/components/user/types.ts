import {TProfileResponse} from "@/api/types";
import {IAuthUser} from "@/security/auth";

export interface UserProfileAvatarProps {
  profile: TProfileResponse | IAuthUser | null;
  cls: string;
  alt?: string;
}
