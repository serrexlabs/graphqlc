import * as http from 'http';
import * as https from 'https';
import * as url from 'url';
import * as zlib from 'zlib';

import { HttpDriverInterface } from './index';
import { Config } from '../index';

export class NodeHttpDriver implements HttpDriverInterface {
    private config: Config;
    private isHttps = /https:?/;

    constructor(config: Config) {
        this.config = config;
    }

    request(data: string): Promise<any> {
        const parsed = url.parse(this.config.url);
        const protocol = parsed.protocol || 'http:';
        const httpClient = this.isHttps.test(protocol) ? https : http;

        return new Promise((resolve, reject) => {
            const req = https.request(
                this.config.url,
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
                        console.log(body);
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
