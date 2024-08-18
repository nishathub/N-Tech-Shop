import { Link } from "react-router-dom";

const ErrorElement = () => {
  return (
    <div className="text-center bg-base-300 p-8 h-screen bg-no-repeat bg-center bg-[url('https://us.123rf.com/450wm/nexusby/nexusby1610/nexusby161000188/65163403-404-error-page-not-found-dark-version-vector-illustration.jpg?ver=6')]">
      <button className="text-green-200 text-2xl btn btn-ghost">
        <Link to={"/"}>Back to Home</Link>
      </button>
    </div>
  );
};

export default ErrorElement;
