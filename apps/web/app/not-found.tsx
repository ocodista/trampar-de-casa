import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="my-12 flex min-h-[70vh] w-full items-center justify-center px-4 text-gray-900">
      <div className="flex w-full flex-col items-center gap-6">
        <h1 className="md:text-16xl w-full select-none text-center text-9xl font-black text-gray-400">
          404
        </h1>
        <p className="text-center text-6xl font-semibold">Oops!</p>
        <p className="text-center text-xl md:px-12">
          Você pode ter digitado o endereço errado ou a página foi movida para
          outra URL.
        </p>
        <div className="flex flex-row justify-between gap-8">
          <Link
            href="/"
            className="flex items-center justify-center rounded-md border border-black px-5 py-2 text-xl text-black transition-colors hover:bg-black hover:text-white"
          >
            Pagina Principal
          </Link>
        </div>
      </div>
    </div>
  )
}
