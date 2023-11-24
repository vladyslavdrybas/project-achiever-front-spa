import {AccessTokenWriter, PostRequest} from "@/api/ApiRequest";
import apiRoute from "@/api/ApiRouteCollection";
import {TSignInResponse} from "@/api/types";

class SignInRequest {
    _email: string;
    _password: string;
    _route: string;
    _response: TSignInResponse|null = null;

    constructor(email: string, password: string) {
      this._route = apiRoute('login');
      this._email = email;
      this._password = password;
    }

    get response(): TSignInResponse|null
    {
        return this._response;
    }

    send = async (): Promise<void> => {
        const request = new PostRequest(
            this._route,
            JSON.stringify({
                "email": this._email,
                "password": this._password,
            })
        );

        (new AccessTokenWriter()).decorate(request);

        await request.send();
        request.accessToken();

        this._response = {
            accessToken: request.response.token,
            refreshToken: request.response.refresh_token,
        };
    }
}

export default SignInRequest;
