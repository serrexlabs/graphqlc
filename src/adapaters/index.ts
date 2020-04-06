import { Config } from '../index';
import { NodeHttpDriver } from './nodeHttpDriver';

export interface HttpDriverInterface {
    setHeader(header: string, value: string): void;
    request(): string;
}

export interface CacheDriverInterface {
    set<T>(key: string, value: T): void;
}

export const getDefaultHttpDriver = (config: Config): HttpDriverInterface => {
    if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        return new NodeHttpDriver(config);
    }

    //TODO return browser of http driver
    return require('./nodeHttpDriver');
};
