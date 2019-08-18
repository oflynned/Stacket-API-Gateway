import {environments} from "./environments";

require("dotenv").load();

function classifyEnvironment(env) {
    const dbName = env === "production" ? "api-prod" : `api-${env}`;
    return {
        dbName,
        env
    };
}

export function getEnvironment() {
    const hasEnvironment = process.env && process.env.ENVIRONMENT;
    const reportedEnvironment = hasEnvironment ? process.env.ENVIRONMENT.toLowerCase() : "development";
    return environments.includes(reportedEnvironment) ? reportedEnvironment : "development";
}

export function getCollection() {
    const env = getEnvironment();
    return classifyEnvironment(env);
}
