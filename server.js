const { ApolloServer } = require('apollo-server');
const config = require('config');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(config.mongoDbUrl)
.then(() => {
    console.log('Connected to Database...');
    return server.listen({ port: config.port || 5000 })
})
.then(res => {
    console.log(`Server running at url ${res.url}`);
})
.catch(err => console.error(err));