
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="text-8xl font-bold text-hidroin-blue mb-6">404</h1>
        <p className="text-2xl text-hidroin-darkblue font-medium mb-4">
          Página no encontrada
        </p>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Regresar al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
