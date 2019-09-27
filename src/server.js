// HTTP SERVER
import express from 'express';
import cors from 'cors';

require("dotenv").load();

const {ENVIRONMENT, CORS_DOMAIN} = process.env;

const app = express();

function setPort(port) {
    app.set('port', parseInt(port, 10));
}

function listen() {
    const port = app.get('port') || 3001;
    app.listen(port, () => {
        console.log(`The server is running and listening at http://localhost:${port}`);
    });
}

app.use(cors({
    origin: () => isProductionEnvironment() ? CORS_DOMAIN : '*',
    optionsSuccessStatus: 200
}));

// Endpoint to check if the API is running
app.get('/api/status', (req, res) => {
    res.send({status: 'ok'});
});

export const isProductionEnvironment = () => ENVIRONMENT === "production";

export const isDevelopmentEnvironment = () => ENVIRONMENT === "development";

export default {
    getApp: () => app,
    setPort,
    listen
};
