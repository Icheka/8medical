import axios, { AxiosInstance, AxiosResponse, Method } from "axios";

import { networkError } from "../../services";
import { TServicePath } from "../../types/services";
import { keys } from "../keys";

interface IConstructor {
    onAuthError: (err: any) => void;
    localStorageKey: string;
    signInRoute?: string;
}

interface IQuery {
    service: TServicePath;
    body?: any;
    buildPath?: (path: string) => string;
}

export class Https {
    onAuthError: (err: any) => void;
    localStorageKey: string;
    https: AxiosInstance;
    signInRoute?: string;

    constructor({ onAuthError, localStorageKey, signInRoute }: IConstructor) {
        this.onAuthError = onAuthError;
        this.localStorageKey = localStorageKey;
        this.signInRoute = signInRoute;
        this.https = axios.create({});

        this.addInterceptors();
    }

    query({ service, body, buildPath }: IQuery) {
        let { method, path } = service;
        if (buildPath) path = buildPath(path);

        return this.https
            .request({
                method,
                url: path,
                data: body,
            })
            .then((res: AxiosResponse) => [0, res.data.data])
            .catch((err: any) => [1, networkError(err)]);
    }

    handleAuthTokenErrors(error: any): void {
        const ACCESS_TOKEN_ERROR_STATUSES = [401, 403];

        if (error?.response?.status && ACCESS_TOKEN_ERROR_STATUSES.includes(error?.response?.status)) {
            this.onAuthError(error);
            // toast.error(`You must sign in to continue`);
            if (this.signInRoute) window.location.href = this.signInRoute;
        }
    }

    get token(): string | null {
        return localStorage.getItem(this.localStorageKey);
    }

    set token(token: string | null) {
        localStorage.setItem(this.localStorageKey, token ?? JSON.stringify(null));
    }

    addInterceptors() {
        this.addRequestInterceptors();
        this.addResponseInterceptors();
    }

    formDataFetch(url: string, { body }: { body: any }) {
        const headers = {
            authorization: `Bearer ${this.token}`,
        };

        return fetch(keys.api.buildPath(url), {
            body,
            method: "post",
            headers,
        });
    }

    // private
    private addRequestInterceptors() {
        const { https } = this;

        https.interceptors.request.use((req) => {
            if (!req.url!.startsWith("http")) {
                req.url = keys.api.buildPath(req.url!);
            }

            let path = new URL(req.url!).pathname;
            if (!path.endsWith("/")) req.url += "/";

            req.headers.Authorization = `Bearer ${this.token}`;

            return Promise.resolve(req);
        });
    }

    private addResponseInterceptors() {
        const { https } = this;

        https.interceptors.response.use(
            (res) => Promise.resolve(res),
            (error) => {
                this.handleAuthTokenErrors(error);

                return Promise.reject(error);
            }
        );
    }
}
