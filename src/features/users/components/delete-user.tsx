import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/dialog";
import { useNotifications } from "@/components/ui/notifications";

import { useDeleteUser } from "../api/delete-user";
import { useUser } from "@/lib/auth";

type DeleteUserProps = {
    id: string;
};

export const DeleteUser = ({ id }: DeleteUserProps) => {
    const user = useUser();
    const { addNotification } = useNotifications();
    const deleteUserMutation = useDeleteUser({
        mutationOptions: {
            onSuccess: () => {
                addNotification({
                    type: "success",
                    title: "User deleted",
                });
            },
        }
    })

    if (user.data?.id === id) return null;

    return (
        <ConfirmationDialog
            icon="danger"
            title="Delete User"
            body="Are you sure you want to delete this user?"
            triggerButton={<Button variant="destructive">删除</Button>}
            confirmButton={<Button
                isLoading={deleteUserMutation.isPending}
                type="button"
                variant='destructive'
                onClick={() => {
                    deleteUserMutation.mutate({ userId: id })
                }}
            >
                删除用户
            </Button>
            }
        >

        </ConfirmationDialog>
    );
}