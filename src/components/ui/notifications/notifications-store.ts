import {nanoid} from 'nanoid';
import {create} from 'zustand';

export type Notification = {
    id:string;
    type: 'success' | 'error' | 'info'| 'warning';
    title:string;
    message?: string;
};

type NotificationsStore = {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification,'id'>) => void;
    dismissNotification: (id: string) => void; // 这是一个函数，接受一个id参数
};

//这是一个自定义的hook，用于创建一个全局的store，用于管理通知
export const useNotifications = create<NotificationsStore>((set) => ({
    notifications: [], // 通知列表
    addNotification: (notification) => {
        set((state) => ({
            notifications: [...state.notifications, {...notification, id: nanoid()}],
        }));
    }, // 添加通知
    dismissNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.filter((notification) => notification.id !== id),
        }));
    }, // 关闭通知
}));