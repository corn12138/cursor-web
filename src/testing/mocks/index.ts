import {env} from '@/config/env';

export const enableMocking = async()=>{
    if(env.ENABLE_API_MOCKING){ // 如果启用了 API 模拟
        const {worker} = await import('./browser'); // 加载浏览器环境下的模拟
        const {initializeDb} = await import('./db'); // 加载数据库初始化
        await initializeDb(); // 初始化数据库
        return worker.start(); // 启动模拟服务
    }
}