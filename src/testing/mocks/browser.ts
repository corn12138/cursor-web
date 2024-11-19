import {setupWorker} from 'msw/browser'; // 这个是 mock service worker 的浏览器端的入口文件

import {handles} from './handles'; // 导入所有的请求处理器

export const worker = setupWorker(...handles); // 创建一个 mock service worker 服务实例