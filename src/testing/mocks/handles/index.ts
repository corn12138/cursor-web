import {http,HttpResponse} from 'msw'; // 这个是 mock service worker 的浏览器端的入口文件

import {env} from '@/config/env'; // 导入环境变量配置

import {networkDelay} from '../utils'; // 导入工具函数

import { authHandlers} from './auth';
import {commentsHandlers} from './comments'
import { discussionsHandlers} from './discussions';
import { teamsHandlers} from './teams';
import { usersHandlers} from './users';

export const handles = [
    ...authHandlers,
    ...commentsHandlers,
    ...discussionsHandlers,
    ...teamsHandlers,
    ...usersHandlers,
    http.get(`${env.API_URL}/healthcheck`, async () => {
        await networkDelay();
        return HttpResponse.json({status: 'ok',ok:true});
    })
] // 导出所有的 handlers