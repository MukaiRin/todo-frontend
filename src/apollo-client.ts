import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // バックエンドのエンドポイント
  cache: new InMemoryCache(), // キャッシュ設定
});

export default client;




