import { useRouteError } from "react-router-dom";
import error_404 from "../assets/gifs/404.gif";

const Error =() => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex justify-center items-center">
      <img className="object-fit" src={error_404} alt="error page"/>
    </div>
  );
}

export default Error;