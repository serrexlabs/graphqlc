Super simple graphql client

```ts
import { create } from './src';

const client = create({
    url: 'https://api.graphql.jobs/',
    headers: {
        Authorization: `Bearer ${token}`   
    }
});
 

interface Response<T> {
    readonly data: T;
}

interface CompanyResponse {
    companies: Array<Company>;
    remotes: Array<Remote>;
}

interface Company {
    name: string;
}

interface Remote {
    type: string;
    slug: string;
}

const query = `query jobs {
            remotes{
                type,
                slug
            },
            companies {
                name
            }
        }`;

const fetchData = async () => {
    const {
        data: { companies, remotes },
    } = await client.query<Response<CompanyResponse>>(query, {});
    console.log(companies[0].name);
    console.log(remotes[0].type);
};

console.log('yooooo');

fetchData();

```