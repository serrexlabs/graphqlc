Super simple graphql client

```ts
import { GraphQLc, gql } from './src'

 const graphQLc = new GraphQLc("https:api.com/sd", {
        Authorization: `Bearer ${token}`
 })

 const query = gql`
    query {
        user {
            name
            email
        }
    }
 `
 const variables = {
       name: "test"
 }

 const request = graphQLc(query, variables)
 const data = request.execute();
 request.abort();

```