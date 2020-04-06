/*import http from 'http';
import https from 'https';
import url from 'url';*/
import { HttpDriverInterface } from './index';
import { Config } from '../index';

export class NodeHttpDriver implements HttpDriverInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    setHeader(header: string, value: string): void {
        const a = 's';
    }

    request(): string {
        return '';
    }
}
