import {Chat} from '@/components/Chat'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl">Pruebas con IA</h1>

        <Chat />
    </div>
  )
}
export default page;