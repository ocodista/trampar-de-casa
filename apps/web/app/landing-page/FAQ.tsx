import { FAQCard } from './FAQCard'

export const FAQ = () => (
  <section
    id="perguntas-frequentes"
    className="overflow-hidden bg-white pb-32 pt-28"
  >
    <div className="container mx-auto px-8 lg:px-4">
      <p className="tracking-px mb-5 text-sm font-semibold uppercase text-indigo-600">
        ALGUMA DÚVIDA?
      </p>
      <h2 className="xl:text-10xl font-heading max-xs:hyphens-auto max-xs:text-4xl mb-16 text-6xl font-bold leading-none tracking-tight md:text-8xl">
        Perguntas Frequentes
      </h2>
      <div className="mb-8">
        <div className="-m-4 flex flex-wrap">
          <FAQCard
            title="1. Qual o preço?"
            description="Nosso serviço é totalmente gratuito. Nosso objetivo é conectar
                profissionais de tecnologia a oportunidades de trabalho remoto
                de alta qualidade, sem nenhum custo."
          />
          <FAQCard
            title="2. A vaga não é remota, e agora?"
            description="Caso encontre alguma vaga que não seja remota, denuncie!
            Analisaremos todas as denúncias o mais rápido possível e
            tomaremos as providências."
          />
          <FAQCard
            title="3. Quantos e-mails receberei?"
            description="Apenas um e-mail por semana, nas quartas-feiras às 11h, com
            vagas que fizerem sentido para você. Todas são 100% remotas."
          />
          <FAQCard
            title="4. O trabalho remoto pode afetar a produtividade?"
            description="O trabalho remoto pode aumentar sua produtividade ao reduzir o
            tempo perdido em deslocamentos e interrupções no escritório."
          />
        </div>
      </div>
    </div>
  </section>
)
