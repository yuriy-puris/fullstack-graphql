import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';

import typeDefs from './schema';
import resolvers from './resolvers';

const mongoose = require('mongoose');

const config = require('./config');

const app = express();

app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
  if ( err ) {
      console.log(err);
  } else {
      console.log('Connected to the database');
  }
});

app.listen({ port: config.port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)