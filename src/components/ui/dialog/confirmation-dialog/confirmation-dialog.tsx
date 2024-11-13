import { CircleAlert, Info } from 'lucide-react'; // 这是一个SVG图标库
import React from 'react'; // 这是React的核心库
import { useEffect, useRef } from 'react';


import { Button } from '@/components/ui/button'; // 这是一个Button组件
import { useDisclosure } from '@/hooks/use-disclosure'; // 这是一个自定义的hook，用于控制UI组件的显示和隐藏

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../dialog'; // 这是一个Dialog组件


export type ConfirmationDialogProps = {
    triggerButton: React.ReactElement; // 触发按钮--这是一个React元素
    confirmButton: React.ReactElement; // 确认按钮--这是一个React元素   
    title: string; // 标题--这是一个字符串
    body?: string; // 内容--这是一个字符串
    cancelButtonText?: string; // 取消按钮文本--这是一个字符串  
    icon?: 'danger' | 'info'; // 图标--这是一个字符串
    isDone?: boolean; // 是否完成--这是一个布尔值
} // 这是一个确认对话框的props类型
export const ConfirmationDialog = ({
    triggerButton,
    confirmButton,
    title,
    body = '',
    cancelButtonText = '取消',
    icon = 'info',
    isDone = false
}: ConfirmationDialogProps) => {
    const { isOpen, open, close } = useDisclosure(); // 这是一个UI组件的显示和隐藏的hook

    const cancelButtonRef = useRef<HTMLButtonElement>(null); // 这是一个取消按钮的ref

    useEffect(() => {
        if (isDone) {
            close();
        }
    }, [isDone, close]); //目的是为了在完成时关闭对话框
    return (
        <>
            <Dialog
                open={isOpen}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        close();
                    } else {
                        open();
                    }
                }}
            >
                <DialogTrigger asChild>
                    {triggerButton}
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader className='flex'>
                        <DialogTitle className='flex items-center gap-2'>
                            {' '}
                            {icon === 'danger' && (
                                <CircleAlert className='size-6 text-red-600' aria-hidden='true' />
                            )}
                            {icon === 'info' && (
                                <Info className='size-6 text-blue-600' aria-hidden='true' />
                            )}
                            {title}
                        </DialogTitle>
                    </DialogHeader>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                        {body && (<div className='mt-2'>
                            <p>{body}</p>
                        </div>)}
                    </div>
                    <DialogFooter>
                        {confirmButton}
                        <Button
                            variant='outline'
                            onClick={close}
                            ref={cancelButtonRef}
                        >
                            {cancelButtonText}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}