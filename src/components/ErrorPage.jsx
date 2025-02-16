import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
// here using useRouteError , we showing the error status , data . also a button for homepage 
function ErrorPage() {
    const err = useRouteError();
    return (
        <>
            <section className="flex items-center min-h-screen p-16 dark:bg-gray-50 dark:text-gray-800">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                            <span className="sr-only">{err.status}</span>404
                        </h2>
                        <p className="text-2xl font-semibold md:text-3xl">{err.data}</p>
                        <p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
                        <Link to={"/"}> <button className="px-8 py-3 font-semibold rounded dark:bg-blue-500 dark:text-gray-50"> Back to homepage</button></Link>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ErrorPage;