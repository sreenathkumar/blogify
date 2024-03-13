import errorImage from "@assets/cry.png";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <section className="container">
      <div className="flex items-center justify-center min-h-screen">
        <img src={errorImage} alt="404 Error" className="max-w-lg mb-8" />
        <div className="flex items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold mb-4">Awww ...</h1>
            <p className="text-xl">
              {`Don't Cry. It's just a ${error.status} Error !`}
            </p>
            <p className="text-xl">{error.statusText || error.message}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/");
              }}
              className="bg-indigo-600 w-auto text-white px-6 py-2 mt-4 self-center  md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
