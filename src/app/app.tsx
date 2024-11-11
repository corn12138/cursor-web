import { AppProvider } from "./provider";// 提供全局状态管理
import { AppRouter } from "./router";// 路由

const App = () => {
    return (<>
        <AppProvider>
            <AppRouter />
        </AppProvider>
    </>)
};
export { App };
