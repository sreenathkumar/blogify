import errorImage from "@assets/cry.png";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

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
          </div>
        </div>
      </div>
    </section>
  );
}
