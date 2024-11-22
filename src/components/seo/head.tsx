//这是 浏览器窗口的头部信息，包括标题和描述
import {Helmet,HelmetData} from 'react-helmet-async' //这是一个React组件，用于管理React组件的头部信息

type HeadProps = {
    title?: string; 
    description?: string;
}

const helmetData = new HelmetData({}); //这是一个对象，用于管理头部信息--

export const Head =({title='',description=''}:HeadProps={})=>{
    return(
        <>
            <Helmet
            helmetData={helmetData}
            title={title?`${title} | React App`:undefined}
            defaultTitle='React Apps'
            >
                <meta name='description' content={description} />
            </Helmet>
        </>
    )
}//这是一个React组件，用于管理React组件的头部信息