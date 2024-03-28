npm install graphql @apollo/client

Need to config between graphql and our application (root js file)
import {ApolloClient,ApolloProvider,InMemoryCache}
const client = new ApolloClient({
    uri:"graphql",
    cache:new InMemoryCache()
});
<ApolloProvider client="client">
<App/>
</ApolloProvider>


Make Query read (query.js file)
import {gql} from '@apollp/client';
export default const CUSTOM_QUERY = gql`{
    users{
        id,
        email,
        name
    }
}


Now use our query in our application
import CUSTOM_QUERY from ".query"
import {useQuery} from "@apollo/client"
Destructing
const {data,error,loading} = useQuery(CUSTOM_QUERY);


`