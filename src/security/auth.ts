import {StorageKeys} from "@/types/StorageKeys";
import {jwt_decode} from "@/util/Jwt";
import _SignInRequest from "@/api/requests/_SignInRequest";
import _SignUpRequest from "@/api/requests/_SignUpRequest";

interface IAuthProvider {
    user: IAuthUser | null;
    authenticate(): void;
    isAuthenticated(): boolean;
    signUp(email: string, password: string): Promise<void>;
    signIn(username: string, password: string): Promise<void>;
    signOut(): Promise<void>;
}

export interface IAuthUser {
    id: string | null;
    username: string | null;
    firstname: string | null;
    lastname: string | null;
    avatar: string | null;
    isAuthenticated(): boolean;
}

export const ApiAuthProvider: IAuthProvider = {
    user: null,

    authenticate(): void {
        const user = {
            id: localStorage.getItem(StorageKeys.LOGGED_USER_ID),
            username: localStorage.getItem(StorageKeys.LOGGED_USER_USERNAME),
            firstname: localStorage.getItem(StorageKeys.LOGGED_USER_FIRSTNAME),
            lastname: localStorage.getItem(StorageKeys.LOGGED_USER_LASTNAME),
            avatar: null,

            isAuthenticated(): boolean {
                return this.id !== null
                    && this.username !== null
                    ;
            }
        }

        const accessToken = localStorage.getItem(StorageKeys.ACCESS_TOKEN) ?? null;
        const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN) ?? null;

        if (accessToken) {
            const jwt = jwt_decode(accessToken);
            if (null === jwt) {
                // this.user = null;
            }
        }

        if (user.isAuthenticated()
            && accessToken !== null
            && refreshToken !== null
        ) {
            this.user = user;
        } else {
            this.user = null;
        }
    },

    isAuthenticated(): boolean {
        return !!this.user;
    },

    async signUp(email: string, password: string): Promise<void> {
        const request = new _SignUpRequest(email, password);
        await request.send();
    },

    async signIn(username: string, password: string): Promise<void> {
        const request = new _SignInRequest(username, password);

        await request.send();

        this.authenticate();
    },

    async signOut(): Promise<void> {
        localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
        localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
        localStorage.removeItem(StorageKeys.LOGGED_USER_ID);
        localStorage.removeItem(StorageKeys.LOGGED_USER_USERNAME);
        localStorage.removeItem(StorageKeys.LOGGED_USER_FIRSTNAME);
        localStorage.removeItem(StorageKeys.LOGGED_USER_LASTNAME);

        this.user = null;

        console.log(this.user);
    },
}
