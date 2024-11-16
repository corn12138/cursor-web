import { Plus } from "lucide-react";

import {Button}from "@/components/ui/button";
import {Form,FormDrawer,Input,Textarea} from "@/components/ui/form";
import {useNotifications}from "@/components/ui/notifications";
import {Authorization,ROLES}from "@/lib/authorization";

import {useCreateDiscussion,createDiscussionInputSchema}from "../api/create-discussion";

export const CreateDiscussion = ()=>{
    const {addNotification}=useNotifications();
    const createDiscussionMutation = useCreateDiscussion({
        mutationConfig:{
            onSuccess:()=>{
                addNotification({type:'success',title:'讨论创建成功'});
            },
            
        },
    });

    // 
    return (
        <>
            <Authorization
            allowedRoles={[ROLES.USER]}
            >
                <FormDrawer
                isDone={createDiscussionMutation.isSuccess}
                triggerButton={
                    <Button 
                    size='sm'
                    icon={<Plus className="size-4"/>}
                    >
                        创建讨论
                    </Button>
                }
                title="创建讨论"
                submitButton={
                    <Button
                    form="create-discussion"
                    type="submit"
                    size='sm'
                    isLoading={createDiscussionMutation.isPending}
                    >
                        提交
                    </Button>
                }
                >
                    <Form
                    id="create-discussion"
                    onSubmit={(values)=>{
                        createDiscussionMutation.mutate({data:values});
                    }}
                    schema={createDiscussionInputSchema}
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