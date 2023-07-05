import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center w-full min-h-[70vh] text-gray-900 my-12 px-4">
      <div className="flex flex-col items-center w-full gap-6">
        <h1 className="text-9xl md:text-16xl w-full select-none text-center font-black text-gray-400">
          404
        </h1>
        <p className="text-6xl font-semibold text-center">Oops!</p>
        <p className="text-xl md:px-12 text-center">
          Você pode ter digitado o endereço errado ou a página foi movida para
          outra URL.
        </p>
        <div className="flex flex-row justify-between gap-8">
          <Link
            href="/"
            className="flex justiy-center items-center px-5 py-2 text-xl rounded-md text-black border border-black hover:bg-black hover:text-white transition-colors"
          >
            Pagina Principal
          </Link>
        </div>
      </div>
    </div>
  )
}
