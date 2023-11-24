import {PutRequest} from "@/api/ApiRequest";
import apiRoute from "@/api/ApiRouteCollection";
import {TProfileResponse} from "@/api/types";

class ProfilePasswordChangeRequest {
    _route: string;
    _response: TProfileResponse|null = null;
    _confirmpassword: string;
    _newpassword: string;
    _oldpassword: string;

    constructor(
      userId: string,
      oldpassword: string,
      newpassword: string,
      confirmpassword: string,
    ) {
      this._route = apiRoute(
        'userProfilePasswordChange',
        {
          'userId': userId,
        }
      );

      this._confirmpassword = confirmpassword;
      this._newpassword = newpassword;
      this._oldpassword = oldpassword;
    }

    get response(): TProfileResponse|null
    {
        return this._response;
    }

    send = async (): Promise<void> => {
        const request = new PutRequest(
          this._route,
          JSON.stringify({
            "confirmpassword": this._confirmpassword,
            "newpassword": this._newpassword,
            "oldpassword": this._oldpassword,
          })
        );

        await request.sendWithAuthorization();

        this._response = request.response;
    }
}

export default ProfilePasswordChangeRequest;
