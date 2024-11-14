import { Pen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form ,Input,FormDrawer,Textarea} from "@/components/ui/form";
import { useNotifications } from "@/components/ui/notifications";
import { useUser } from "@/lib/auth";


import { updateProfileInputSchema,useUpdateProfile } from "../api/update-profile";

export const UpdateProfile = () => {
const user = useUser();
const {addNotification} = useNotifications();
const updateProfileMutation = useUpdateProfile({
    mutationConfig:{
        onSuccess:()=>{
            addNotification({
                type:"success",
                title:"Profile updated"
            })
        }
    }
});

return (
    <>
    <FormDrawer 
    isDone={updateProfileMutation.isSuccess}
    triggerButton={<Button  size='sm' icon={<Pen className="size-4" />}>更新个人资料</Button>}
    title="Update Profile"
    submitButton={
        <Button
        form="update-profile"
        type="submit"
        size='sm'
        isLoading={updateProfileMutation.isPending}
        >
            提交    
        </Button>
    }
    >
        <Form
        id="update-profile"
        onSubmit={(values)=>{
            updateProfileMutation.mutate(values);
        }}
        options={{
            defaultValues:{
                firstName:user.data?.firstName??'',
                lastName:user.data?.lastName??'',
                email:user.data?.email??'',
                bio:user.data?.bio??'' //这里是初始化表单数据
            }
        }}
        schema={updateProfileInputSchema}
        >
            {({register,formState})=>(
                <>
                    <Input></Input>
                </>
            )}
        </Form>
    </FormDrawer>

  
    </>
)

}//这是一个更新用户信息的组件


