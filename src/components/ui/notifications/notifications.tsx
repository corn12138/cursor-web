import { Notification } from "./notification";
import { useNotifications } from "./notifications-store";

export const Notifications = () => {
    const {notifications, dismissNotification} = useNotifications(); // 从store中获取通知列表和关闭通知的方法
    return (
        <div 
        aria-live="assertive"
         className="pointer-events-none fixed inset-0 z-50 flex flex-col items-center space-y-4 px-4 py-6 sm:items-start sm:p-6">
            {notifications.map((notification) => (
                <Notification 
                key={notification.id} 
                notification={notification} 
                onDismiss={() => dismissNotification(notification.id)} 
                />
            ))}
        </div>
    );
}; // 通知组件，用于展示通知列表