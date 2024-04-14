const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const {json} = require('body-parser');
const { ApolloServer } = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;

const app = express();
const httpServer = http.createServer(app);


const startApolloServer = async (typeDefs, resolvers) => {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        dataSources: db,
    });
    await server.start();
    app.use(
        '/graphql',
        cors(),
        json(),
        expressMiddleware( server, {
            context: authMiddleware,
        })
    );

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on ${PORT}`);
            console.log(
                `Use GraphQL at http://localhost:${PORT}`
            );
        });
    });

};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../ui/build/index.html'));
});

app.get("/*", (req, res) => {
    let url = path.join(__dirname, "../client/build", "index.html");
    if (!url.startsWith("/app/"))
      // we're on local windows
      url = url.substring(1);
    res.sendFile(url);
});

startApolloServer(typeDefs, resolvers);
