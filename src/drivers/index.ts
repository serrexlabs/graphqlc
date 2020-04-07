import { Config } from '../index';
import { NodeHttpDriver } from './node-http-driver';

export interface HttpDriverInterface {
    request(data: string): Promise<any>;
}

export interface CacheDriverInterface {
    set<T>(key: string, value: T): void;
}

export const getDefaultHttpDriver = (config: Config): HttpDriverInterface => {
    if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        return new NodeHttpDriver(config);
    }

    //TODO return browser of http driver
    return require('./node-http-driver');
};
