import { CacheDriverInterface, getDefaultHttpDriver, HttpDriverInterface } from './drivers';

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

    public async query(query: string, variables: object, config?: Config): Promise<string> {
        return await this.execute(query, variables, config);
    }

    private async execute<T>(query: string, variables: object, config?: Config): Promise<string> {
        return await this.http.request(
            JSON.stringify({
                query: query,
                variables,
            }),
        );
    }
}

export const create = (config: Config): Client => {
    const httpDriver = getDefaultHttpDriver(config);
    return new Client(config, httpDriver);
};
