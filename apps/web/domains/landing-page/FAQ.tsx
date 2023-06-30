export const FAQ = () => (
  <section
    id="perguntas-frequentes"
    className="pt-28 pb-32 bg-transparent overflow-hidden"
  >
    <div className="container px-4 mx-auto">
      <p className="mb-5 text-sm text-indigo-600 font-semibold uppercase tracking-px">
        ALGUMA DÚVIDA?
      </p>
      <h2 className="mb-16 text-6xl md:text-8xl xl:text-10xl font-bold font-heading tracking-px-n leading-none">
        Perguntas Frequentes
      </h2>
      <div className="mb-8">
        <div className="flex flex-wrap -m-4">
          <div className="w-full md:w-1/2 p-4">
            <div className="p-6 border border-gray-200 rounded-2xl shadow-10xl">
              <h3 className="mb-4 text-lg font-semibold leading-normal">
                1. Qual o preço?
              </h3>
              <p className="font-sans text-gray-600 dark:text-gray-400 leading-relaxed">
                Nosso serviço é totalmente gratuito. Nosso objetivo é conectar
                profissionais de tecnologia a oportunidades de trabalho remoto
                de alta qualidade, sem nenhum custo.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="p-6 border border-gray-200 rounded-2xl shadow-10xl">
              <h3 className="mb-4 text-lg font-semibold leading-normal">
                2. A vaga não é remota, e agora?
              </h3>
              <p className="font-sans text-gray-600 dark:text-gray-400 leading-relaxed">
                Caso encontre alguma vaga que não seja remota, denuncie!
                Analisaremos todas as denúncias o mais rápido possível e
                tomaremos as providências.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="p-6 border border-gray-200 rounded-2xl shadow-10xl">
              <h3 className="mb-4 text-lg font-semibold leading-normal">
                3. Quantos e-mails receberei?
              </h3>
              <p className="font-sans text-gray-600 dark:text-gray-400 leading-relaxed">
                Apenas um e-mail por&nbsp; semana, nas quartas-feiras às 11h, com
                vagas que fizerem sentido para você. Todas são 100% remotas.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="p-6 border border-gray-200 rounded-2xl shadow-10xl">
              <h3 className="mb-4 text-lg font-semibold leading-normal">
                4. O trabalho remoto pode afetar a produtividade?
              </h3>
              <p className="font-sans text-gray-600 dark:text-gray-400 leading-relaxed">
                O trabalho remoto pode aumentar sua produtividade ao reduzir o
                tempo perdido em deslocamentos e interrupções no escritório.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);