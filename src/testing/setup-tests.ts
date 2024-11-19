import '@testing-library/jest-dom/vitest';

import {initializeDb,resetDb} from "@/testing/mocks/db";
import {server} from "@/testing/mocks/server";

vi.mock('zustand'); // 这是一个 zustand 的 mock，用于模拟 zustand 的行为 ---vi是一个全局对象，它是一个 jest 的全局对象，用于模拟一些全局的行为

beforeAll(()=>server.listen({onUnhandledRequest:'error'})); // 在所有测试用例执行之前，启动 mock service worker 服务
afterAll(()=>server.close()); // 在所有测试用例执行之后，关闭 mock service worker 服务
beforeEach(()=>{
    const ResizeObserver = vi.fn(()=>({
        observe:vi.fn(),
        unobserve:vi.fn(),
        disconnect:vi.fn()
    }));
  
    vi.stubGlobal('ResizeObserver',ResizeObserver); // 在每个测试用例执行之前，模拟 ResizeObserver ---stubGlobal 是一个 jest 的全局函数，用于模拟全局对象的行为

    window.btoa =(str:string)=>Buffer.from(str,'binary').toString('base64'); // 模拟 window.btoa
    window.atob =(str:string)=>Buffer.from(str,'base64').toString('binary'); // 模拟 window.atob

    initializeDb(); // 初始化数据库
});
afterEach(()=>{
    server.resetHandlers(); // 在每个测试用例执行之后，重置 mock service worker 的处理器
    resetDb(); // 重置数据库
});