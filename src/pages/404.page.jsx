import { Link } from "react-router-dom";
import pageNotFoundImg from "../imgs/404.png";
import fullLogo from "../imgs/full-logo.png";

const PageNotFound = () => {
  return (
    <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
      <img
        src={pageNotFoundImg}
        className="select-none border-2 border-grey w-72 aspect-square object-cover rounded"
      />
      <h1 className="text-4xl font-gelasio leading-7">Page not Found</h1>
      <p className="text-dark-grey leading-7 -mt-8">
        The page you looking for does not exist. Headback to the{" "}
        <Link to="/" className="text-black text-xl  underline">
          homepage.
        </Link>
      </p>
      <div className="mt-auto">
        <img
          src={fullLogo}
          alt=""
          className="h-8 object-contain mx-auto select-none"
        />
        <p className="mt-5 text-dark-grey">
          Read millions of stories around the earth!
        </p>
      </div>
    </section>
  );
};
export default PageNotFound;
