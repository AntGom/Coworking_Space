import NavBar from '../../shared/NavBar/NavBar';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <>
      <NavBar/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 pt-1">
      {/* <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Ups! Algo Salio Mal</h1> */}
      <div className="mb-4">
        <img 
          src="/ErrorPage3.png" 
          alt="Person exiting building" 
          className="w-[650px] h-[650px]"
        />
      </div>
      <Link to="/" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Volver al Home
      </Link>
    </div>
    </>
    
  );
}

export default ErrorPage



