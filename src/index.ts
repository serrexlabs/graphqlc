import { CacheDriverInterface, getDefaultHttpDriver, HttpDriverInterface } from './drivers';
import { Config, defaultConfig } from './config';
import { merge } from './utils/merge';

export class Client {
    private http: HttpDriverInterface;
    private config: Config;
    private cache?: CacheDriverInterface;

    constructor(config: Config, http: HttpDriverInterface, cache?: CacheDriverInterface) {
        this.http = http;
        this.config = config;
        this.cache = cache;
    }

    public async query<T>(query: string, variables: object, config?: Config): Promise<T> {
        return await this.execute<T>(query, variables, config);
    }

    private async execute<T>(query: string, variables: object, config?: Config): Promise<T> {
        if (config?.url) {
            delete config.url;
        }

        return await this.http.request<T>(
            JSON.stringify({
                query: query,
                variables,
            }),
        );
    }
}

export const create = (config: Config): Client => {
    const configuration = merge(defaultConfig, config);
    const httpDriver = getDefaultHttpDriver(configuration);
    return new Client(config, httpDriver);
};
