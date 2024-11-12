import { Button } from "../ui/button";

// 这是一个React组件，用于显示一个错误信息
export const MainErrorFallback = () => {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center text-red-500" role="alert">
           <h2 className="text-lg font-semibold">Something Went Wrong:(</h2>
            <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>刷新</Button>
        </div>
    );
};