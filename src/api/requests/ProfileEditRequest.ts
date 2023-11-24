import {PutRequest} from "@/api/ApiRequest";
import apiRoute from "@/api/ApiRouteCollection";
import {TProfileResponse} from "@/api/types";

class ProfileEditRequest {
    _route: string;
    _response: TProfileResponse|null = null;
    _username: string;
    _email: string;
    _firstname: string|null;
    _lastname: string|null;

    constructor(
      userId: string,
      username: string,
      email: string,
      firstname: string|null,
      lastname: string|null
    ) {
      this._route = apiRoute(
        'userProfile',
        {
          'userId': userId,
        }
      );

      this._username = username;
      this._email = email;
      this._firstname = firstname;
      this._lastname = lastname;
    }

    get response(): TProfileResponse|null
    {
        return this._response;
    }

    send = async (): Promise<void> => {
        const request = new PutRequest(
          this._route,
          JSON.stringify({
            "username": this._username,
            "email": this._email,
            "firstname": this._firstname,
            "lastname": this._lastname,
          })
        );

        await request.sendWithAuthorization();

        this._response = request.response;
    }
}

export default ProfileEditRequest;
