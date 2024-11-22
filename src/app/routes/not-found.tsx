import { Link } from '@/components/ui/link';//引入Link组件
import { paths } from '@/config/paths';

export const NotFoundRoute = () => {
    return (
        <>
            <div className='mt-52 flex flex-col items-center font-semibold'>
                <h1>404-Not Found</h1>
                <p>Sorry, the page you are looking for could not be found.</p>
                <Link to={paths.home.getHref()} replace>Go back to the homepage</Link>
            </div>
        </>
    )
}