import {CreateForm} from "@/components/admin/estudiantes/CreateForm"

const Page = () => {


  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Registrar Nuevo Estudiante</h1>
            <p className="mt-2 text-gray-600">Complete el formulario para agregar un nuevo estudiante</p>
          </div>

          <CreateForm action="CREATE" /> 
        
        </div>
      </div>
    </div>
  );
};

export default Page;