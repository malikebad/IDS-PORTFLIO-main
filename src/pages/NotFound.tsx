import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-lime-50">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-lime-600">Oops! Page not found</p>
        <a href="/" className="text-lime-500 underline hover:text-lime-400">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
