import { CacheDriverInterface, getDefaultHttpDriver, HttpDriverInterface } from './adapaters';

type Headers = {
    [key in string]: string;
};

export type Config = {
    url: string;
    headers?: Headers;
};

export class Client {
    private http: HttpDriverInterface;
    private config: Config;
    private cache?: CacheDriverInterface;

    constructor(config: Config, http: HttpDriverInterface, cache?: CacheDriverInterface) {
        this.http = http;
        this.config = config;
        this.cache = cache;
    }

    public async query(query: string, variable: object, config: Config): Promise<string> {
        return await this.execute(query, variable, config);
    }

    private async execute<T>(query: string, variable: object, config: Config): Promise<string> {
        return await this.http.request();
    }
}

export const create = (config: Config): Client => {
    const httpDriver = getDefaultHttpDriver(config);
    return new Client(config, httpDriver);
};
