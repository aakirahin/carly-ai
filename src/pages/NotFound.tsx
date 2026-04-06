import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl font-medium">Page not found.</h1>
        <Link to={"/"}>
            <button className="border border-gray-200 px-4 py-2 rounded-lg">Go back home</button>
        </Link>
    </div>
  )
}

export default NotFound