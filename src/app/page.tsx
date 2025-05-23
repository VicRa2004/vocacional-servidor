// app/page.tsx
import { FaGamepad, FaChartLine, FaUserGraduate, FaLightbulb } from 'react-icons/fa';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Descubre tu vocación <span className="text-indigo-600">jugando</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            CareerCraft transforma el test vocacional en una experiencia lúdica para ayudarte a encontrar tu camino profesional.
          </p>
          
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Características</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Una nueva forma de descubrir tu vocación
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <FaGamepad className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Enfoque lúdico</h3>
                <p className="mt-2 text-base text-gray-500">
                  Juegos interactivos que evalúan tus habilidades e intereses sin que te des cuenta.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <FaChartLine className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Resultados precisos</h3>
                <p className="mt-2 text-base text-gray-500">
                  Algoritmos avanzados que analizan tus respuestas para ofrecer recomendaciones personalizadas.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <FaUserGraduate className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Orientación profesional</h3>
                <p className="mt-2 text-base text-gray-500">
                  No solo carreras, te mostramos rutas de formación y perspectivas laborales.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <FaLightbulb className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Descubre talentos</h3>
                <p className="mt-2 text-base text-gray-500">
                  Identifica habilidades que no sabías que tenías y cómo aplicarlas profesionalmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-12">Lo que dicen nuestros usuarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">
                Nunca me había divertido tanto haciendo un test vocacional. Los juegos hacen que sea muy natural responder.
              </p>
              <p className="mt-4 font-medium text-indigo-600">- María G., 17 años</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">
                Los resultados fueron increíblemente precisos. Me recomendaron carreras que ni siquiera había considerado.
              </p>
              <p className="mt-4 font-medium text-indigo-600">- Javier R., 18 años</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">
                Como orientador, recomiendo CareerCraft porque los jóvenes se comprometen más con este formato.
              </p>
              <p className="mt-4 font-medium text-indigo-600">- Prof. Laura M., Orientadora</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">¿Listo para descubrir tu camino?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Comienza ahora y en menos de 30 minutos tendrás recomendaciones personalizadas basadas en tus habilidades e intereses.
          </p>
          <button
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Comenzar ahora
          </button>
        </div>
      </div>
    </main>
  );
}