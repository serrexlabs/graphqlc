import { version } from '../package.json';

type Headers = {
    [key in string]: string;
};

export type Config = {
    url?: string;
    headers?: Headers;
    method?: 'GET' | 'POST';
};

export const defaultConfig: Config = {
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': `graphqlc/${version}`,
    },
    method: 'POST',
};
