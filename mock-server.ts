import {createMiddleware} from "@mswjs/http-middleware"
import cors from "cors"
import express from "express"
import logger from 'pino-http' // 这个是一个日志库

import {env} from "./src/config/env";
import {initializeDb}from './src/testing/mocks/db';
import {handles} from './src/testing/mocks/handles';

const app = express(); // 创建 express 应用

app.use(
    cors({
        origin: env.APP_URL,
        credentials: true
    })
);
app.use(express.json());
app.use(logger());
app.use(createMiddleware(...handles)); // 使用 MSW 的中间件

initializeDb().then(()=>{
    console.log("Mock server is running");
    app.listen(env.APP_MOCK_API_PORT,()=>{
        console.log(`Mock server is running on http://localhost:${env.APP_MOCK_API_PORT}`);
    })
}); // 初始化数据库