import { default as dayjs } from 'dayjs'; // dayjs 是一个轻量的处理时间和日期的库
export const formatDate = (date: string | number, format = 'MMMM D, YYYY h:mm A') => {
    return dayjs(date).format(format);
} //这里的目的是格式化时间