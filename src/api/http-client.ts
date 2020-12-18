import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

abstract class HttpClient {
    protected readonly api: AxiosInstance;

    public constructor(baseURL: string) {
        this.api = axios.create({
            baseURL,
        })

        this._initializeRequestInterceptor();
    }

    private _initializeRequestInterceptor = () => {
        this.api.interceptors.request.use(
            this._handleRequest,
        )
    }

    private _handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('COS_JWT')}`;
        return config;
    }

}

export default HttpClient;
