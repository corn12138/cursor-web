import { Plus } from "lucide-react"; // 👈 Import the icon

import { Button } from "@/components/ui/button";
import {Form,FormDrawer,Textarea}from "@/components/ui/form";
import {useNotifications}from "@/components/ui/notifications"
import {useCreateComment,createCommentInputSchema}from "../api/create-comment";

type CreateCommentProps={
    discussionId:string;
}

export const CreateComment=({discussionId}:CreateCommentProps)=>{
    const  {addNotification}=useNotifications(); // 通知
    const createCommentMutation=useCreateComment({
        discussionId,
        mutationConfig:{
            onSuccess:()=>{
                addNotification({
                    type:'success',
                    title:'Comment created'
                })
            }
        }
    }); // 创建评论
    return (
        <FormDrawer
        isDone={createCommentMutation.isSuccess}
        triggerButton={
            <Button
            size={'sm'}
            icon={<Plus className="size-4" />}
            >添加评论</Button>
        }
        title="Create Comment"
        submitButton={
            <Button
            isLoading={createCommentMutation.isPending}
            form="create-comment"
            type="submit"
            size={'sm'}
            disabled={createCommentMutation.isPending}
            >
                提交
            </Button>
        }
        >
            <Form
            id="create-comment"
            onSubmit={(values)=>{
                createCommentMutation.mutate({data:values});
            }}
            schema={createCommentInputSchema}
            options={{
                defaultValues:{
                    body:'',
                    discussionId:discussionId
                }
            }}
            >
                {
                ({register,formState})=>(
                    <Textarea
                    label="Body"
                    error={formState.errors.body}
                    registration={register('body')}
                    />

                   
                )}
            </Form>

        </FormDrawer>
    )
}