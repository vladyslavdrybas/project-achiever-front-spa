import {PostRequest} from "@/api/ApiRequest";
import apiRoute from "@/api/ApiRouteCollection";

class _SignUpRequest {
    _email: string;
    _password: string;
    _route: string;
    _response: any = null;

    constructor(email: string, password: string) {
      this._route = apiRoute('register');
      this._email = email;
      this._password = password;
    }

    get response(): any
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

        await request.send();

        this._response = {
            message: request.response.message,
        };
    }
}

export default _SignUpRequest;
