type Headers = {
    [key in string]: string;
};

interface ClientInterface {
    execute<T>(): T;
    abort(): void;
}

export class Client implements ClientInterface {
    private baseUrl: string;
    private headers: Headers | undefined;

    constructor(baseUrl: string, headers?: Headers) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    abort(): void {
        return undefined;
    }

    execute<T>(): T {
        return undefined;
    }
}

export const createClient = <T extends ClientInterface>(): T => {
    return new Client('');
};
