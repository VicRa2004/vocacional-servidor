import Link from "next/link"
import { FaGamepad } from "react-icons/fa"

export const Footer = () => {
  return (
    <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <FaGamepad className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-indigo-600">CareerCraft</span>
              </div>
              <p className="text-gray-500 text-base">
                Transformando la orientación vocacional a través del juego.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navegación</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <Link href="/" className="text-base text-gray-600 hover:text-indigo-600">
                        Inicio
                      </Link>
                    </li>
                    <li>
                      <Link href="/test" className="text-base text-gray-600 hover:text-indigo-600">
                        Test Vocacional
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers" className="text-base text-gray-600 hover:text-indigo-600">
                        Carreras
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <Link href="/privacy" className="text-base text-gray-600 hover:text-indigo-600">
                        Privacidad
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-base text-gray-600 hover:text-indigo-600">
                        Términos
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; {new Date().getFullYear()} CareerCraft. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
  )
}