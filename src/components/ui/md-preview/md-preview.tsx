import createDOMPurify from 'dompurify'; //这是一个用于净化HTML的库
import {parse} from 'marked'; //这是一个用于将markdown转换为HTML的库

const DOMPurify = createDOMPurify(window);

export type MDPreviewProps = {
    value:string;
}

export const MDPreview = ({value=''}:MDPreviewProps) => {
    return <div
    className='prose prose-slate w-full p-2'
    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(parse(value) as string)}}
    ></div>
}//这个组件用于将markdown转换为HTML并显示出来