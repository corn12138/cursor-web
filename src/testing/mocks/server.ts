import {setupServer} from 'msw/node'; // 这个是 mock service worker 的 node 端的入口文件

import {handles} from './handles'; // 导入所有的请求处理器

export const server = setupServer(...handles); // 创建一个 mock service worker 服务实例