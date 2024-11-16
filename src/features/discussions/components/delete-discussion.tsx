import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {ConfirmationDialog} from "@/components/ui/dialog"
import { useNotifications } from "@/components/ui/notifications";
import { Authorization, ROLES } from "@/lib/authorization";

import { useDeleteDiscussion } from "../api/delete-discussion";

type DeleteDiscussionProps = {
    id:string;
}

export const DeleteDiscussion = ({id}:DeleteDiscussionProps)=>{
    const {addNotification}=useNotifications();
    const deleteDiscussionMutation = useDeleteDiscussion({
        mutationConfig:{
            onSuccess:()=>{
                addNotification({type:'success',title:'讨论删除成功'});
            },
        },
    });

    // 

    return (
        <>
            <Authorization allowedRoles={[ROLES.ADMIN]}>
                <ConfirmationDialog
                icon="danger"
                title="删除讨论"
                body='确定要删除这个讨论吗？'
                triggerButton={
                    <Button
                    variant='destructive' //这个是一个红色的按钮
                    icon={<Trash className="size-4"/>}
                    >
                        删除
                    </Button>
                }
                confirmButton={
                    <Button
                    isLoading={deleteDiscussionMutation.isPending}
                    type="button"
                    variant={'destructive'}
                    onClick={()=>{
                        deleteDiscussionMutation.mutate({discussionId:id});
                    }}
                    >
                        确定
                    </Button>
                }
                />
            </Authorization>
        </>
    )
}