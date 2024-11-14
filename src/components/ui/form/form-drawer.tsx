import React, { useEffect } from "react";

import { useDisclosure } from "@/hooks/use-disclosure";

import { Button } from "../button";

import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger, DrawerTitle } from "../drawer";

type FormDrawerProps = {
    isDone?: boolean;
    triggerButton: React.ReactElement; // 触发按钮
    submitButton: React.ReactElement; // 提交按钮  
    title: string; // 标题
    children: React.ReactNode; // 子元素
};

export const FormDrawer = ({
    isDone,
    triggerButton,
    submitButton,
    title,
    children
}: FormDrawerProps) => {
    const { close, open, isOpen } = useDisclosure();
    useEffect(() => {
        if (isDone) {
            close();
        }
    }, [isDone, close]); // 当isDone变化时，关闭抽屉

    return (
        <>
            <Drawer open={isOpen} onOpenChange={(isOpen) => {
                if (!isOpen) {
                    close();
                } else {
                    open();
                }
            }}>
                <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
                {/*  */}
                <DrawerContent className="flex max-w-[800px] flex-col justify-between sm:max-w-[540px]">
                    <div className="flex flex-col">
                        <DrawerHeader>
                            <DrawerTitle>{title}</DrawerTitle>
                        </DrawerHeader>
                        <div>{children}</div>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline" type="submit">取消</Button>
                        </DrawerClose>
                        {submitButton}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}; // 这是一个FormDrawer组件，用于渲染表单抽屉