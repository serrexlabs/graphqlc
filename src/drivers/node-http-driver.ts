import * as http from 'http';
import * as https from 'https';
import * as url from 'url';

import { HttpDriverInterface } from './index';
import { Config } from '../config';

export class NodeHttpDriver implements HttpDriverInterface {
    private config: Config;
    private isHttps = /https:?/;

    constructor(config: Config) {
        this.config = config;
    }

    request<T>(data: string): Promise<T> {
        const apiUrl = this.config.url as string;
        const parsed = url.parse(apiUrl);
        const protocol = parsed.protocol || 'http:';
        const httpClient = this.isHttps.test(protocol) ? https : http;

        return new Promise((resolve, reject) => {
            const req = httpClient.request(
                apiUrl,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                (res) => {
                    if (req.aborted) return;
                    let body = '';
                    res.on('data', (chunk: any) => {
                        body += chunk;
                    });

                    res.on('error', (err) => {
                        if (req.aborted) return;
                        // TODO: throw error
                        reject(err);
                    });

                    res.on('end', () => {
                        const data = JSON.parse(body);
                        resolve(data);
                    });
                },
            );

            req.write(data);
            req.on('error', (err) => console.log(err));
            req.end();
        });
    }
}
