import React from 'react'

export const HowItWorks = () => (
  <section id="como-funciona" className="py-32 bg-transparent overflow-hidden">
    <div className="container px-4 mx-auto">
      <div className="flex flex-wrap lg:items-center -m-8">
        <div className="w-full md:w-1/2 p-8">
          <figure>
            <img
              className="mx-auto transform hover:-translate-y-4 transition ease-in-out duration-1000 rounded-2xl"
              src="https://images.unsplash.com/photo-1473172707857-f9e276582ab6?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzIzMzB8MHwxfHNlYXJjaHwxNnx8dGhpbmtpbmd8ZW58MHx8fHwxNjg3MzkxMTMzfDA&ixlib=rb-4.0.3&q=85&w=1920"
              alt=""
            />
          </figure>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="mb-20 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight">
            Como Funciona
          </h2>
          <div className="flex flex-wrap -m-1.5">
            <div className="w-full p-1.5">
              <div className="flex flex-wrap -m-6">
                <div className="w-auto p-6">
                  <div className="relative mb-3 w-10 h-10 text-lg text-white font-bold bg-indigo-600 rounded-full">
                    <img
                      className="absolute top-0 left-0"
                      src="flaro-assets/images/how-it-works/gradient.svg"
                      alt=""
                    />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      1
                    </span>
                  </div>
                  <img
                    className="relative left-3"
                    src="flaro-assets/images/how-it-works/line.svg"
                    alt=""
                  />
                </div>
                <div className="flex-1 p-6">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold leading-snug">
                      Você se inscreve
                    </h3>
                    <p className="text-gray-700 dark:text-gray-400 font-medium leading-relaxed">
                      Forneça-nos seu melhor e-mail e defina suas preferências
                      de trabalho (cargo, tecnologias e idioma).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-1.5">
              <div className="flex flex-wrap -m-6">
                <div className="w-auto p-6">
                  <div className="relative -left-1 mb-3 w-10 h-10 text-lg text-white font-bold bg-indigo-600 rounded-full">
                    <img
                      className="absolute top-0 left-0"
                      src="flaro-assets/images/how-it-works/gradient.svg"
                      alt=""
                    />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      2
                    </span>
                  </div>
                  <img
                    className="relative left-3"
                    src="flaro-assets/images/how-it-works/line2.svg"
                    alt=""
                  />
                </div>
                <div className="flex-1 p-6">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold leading-snug">
                      Analisamos as vagas
                    </h3>
                    <p className="text-gray-700 dark:text-gray-400 font-medium leading-relaxed">
                      Nós cruzamos suas preferências com nossas vagas
                      disponíveis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-1.5">
              <div className="flex flex-wrap -m-6">
                <div className="w-auto p-6">
                  <div className="relative left-5 mb-3 w-10 h-10 text-lg text-white font-bold bg-indigo-600 rounded-full">
                    <img
                      className="absolute top-0 left-0"
                      src="flaro-assets/images/how-it-works/gradient.svg"
                      alt=""
                    />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      3
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold leading-snug">
                      Enviamos as oportunidades
                    </h3>
                    <p className="text-gray-700 dark:text-gray-400 font-medium leading-relaxed">
                      Toda quarta-feira às 11h enviaremos uma lista
                      com as vagas que fazem mais sentido para você.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);