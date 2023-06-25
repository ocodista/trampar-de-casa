'use client'

export default function Page (){
  const handleClose = () => {
    window.close()
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Tudo certo!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Obrigado por confirmar o seu e-mail. 
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">Agora, você pode fechar esta janela e continuar desfrutando do nosso aplicativo.</p>
        </div>

        <button 
          onClick={handleClose}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:boder hover:border-black hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Fechar janela
        </button>
      </div>
    </div>
  )
}