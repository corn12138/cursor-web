import { Pen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormDrawer, Input, Textarea } from "@/components/ui/form";
import { useNotifications } from "@/components/ui/notifications";
import { Authorization, ROLES } from "@/lib/authorization";

import {useDiscussion}from '../api/get-discussion';
import { useUpdateDiscussion, updateDiscussionInputSchema } from "../api/update-discussion";

type UpdateDiscussionProps = {  
    discussionId:string;
};

export const UpdateDiscussion = ({discussionId}:UpdateDiscussionProps)=>{
    const {addNotification}=useNotifications();
    const discussionQuery = useDiscussion({discussionId});
    const updateDiscussionMutation = useUpdateDiscussion({
        mutationConfig:{
            onSuccess:()=>{
                addNotification({type:'success',title:'讨论更新成功'});
            },
        },
    });

    const discussion = discussionQuery.data?.data;

    return (
        <>
            <Authorization
            allowedRoles={[ROLES.USER]}
            >
                <FormDrawer
                isDone={updateDiscussionMutation.isSuccess}triggerButton={
                    <Button
                    icon={<Pen className="size-4"/>}
                    size={'sm'}
                    >
                        更新
                    </Button>
                }
                title="更新讨论"
                submitButton={
                    <Button
                    form="update-discussion"
                    type="submit"
                    size="sm"
                    isLoading={updateDiscussionMutation.isPending}
                    >
                        提交
                    </Button>
                }
                >
                    <Form
                    id="update-discussion"
                    onSubmit={(values)=>{
                        updateDiscussionMutation.mutate({discussionId,data:values});
                    }}
                    options={{defaultValues:{
                        title:discussion?.title??"",
                        body:discussion?.body??"",
                    }}}
                    schema={updateDiscussionInputSchema}
                    >
                        {({register,formState})=>(
                            <>
                                <Input
                                label="标题"
                                error={formState.errors['title']}
                                registration={register('title')}
                                />
                                <Textarea
                                label="内容"
                                error={formState.errors['body']}
                                registration={register('body')}
                                />
                            </>
                        )}
                    </Form>
                </FormDrawer>
            </Authorization>
        </>
    )
}