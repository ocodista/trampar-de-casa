import Image from 'next/image'

export const HowItWorks = () => (
  <section id="como-funciona" className="py-32 bg-white overflow-hidden">
    <div className="container px-8 lg:px-4 mx-auto">
      <div className="flex flex-wrap items-center -m-8">
        <div className="w-full lg:w-1/2 p-8">
          <figure>
            <Image
              className="mx-auto max-md:w-full max-lg:w-10/12 max-lg:aspect-video object-cover transform hover:-translate-y-4 transition ease-in-out duration-1000 rounded-2xl"
              src="/images/footer-image.webp"
              alt="Homem olhando para o pôr do sol no horizonte do mar"
              width={652}
              height={435}
            />
          </figure>
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="mb-16 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight max-xs:text-4xl">
            Como Funciona
          </h2>
          <div className="flex flex-wrap -m-1.5">
            {/* card one starts here */}
            <div className="w-full p-1.5">
              <div className="flex flex-wrap xs:-m-6 max-xs:flex-col">
                <div className="w-auto xs:p-6">
                  <div className="relative xs:mb-3 w-10 h-10 text-lg text-white font-bold bg-indigo-600 rounded-full">
                    <img
                      className="absolute top-0 left-0"
                      src="flaro-assets/images/how-it-works/gradient.svg"
                      alt=""
                    />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      1
                    </span>
                  </div>
                  <Image
                    className="relative left-6 -rotate-6 max-xs:hidden"
                    src="flaro-assets/images/how-it-works/line.svg"
                    alt=""
                    width={23}
                    height={130}
                  />
                </div>
                <div className="flex-1 py-6 xs:p-6">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold leading-snug">
                      Você se inscreve
                    </h3>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      Forneça-nos seu melhor e-mail.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* card one ends here */}
            {/* card two starts here */}
            <div className="w-full p-1.5">
              <div className="flex flex-wrap xs:-m-6 max-xs:flex-col">
                <div className="w-auto xs:p-6">
                  <div className="relative xs:-left-1 xs:mb-3 w-10 h-10 text-lg text-white font-bold bg-indigo-600 rounded-full">
                    <img
                      className="absolute top-0 left-0"
                      src="flaro-assets/images/how-it-works/gradient.svg"
                      alt=""
                    />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      2
                    </span>
                  </div>
                  <Image
                    className="relative max-xs:hidden"
                    src="flaro-assets/images/how-it-works/line2.svg"
                    alt=""
                    width={23}
                    height={130}
                  />
                </div>
                <div className="flex-1 py-6 xs:p-6">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold leading-snug">
                      Analisamos as vagas
                    </h3>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      Nós cruzamos suas preferências com nossas vagas
                      disponíveis. (EM BREVE)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* card two ends here */}
            {/* card three starts here */}
            <div className="w-full p-1.5">
              <div className="flex flex-wrap xs:-m-6 max-xs:flex-col">
                <div className="w-auto xs:p-6">
                  <div className="relative xs:left-5 xs:mb-3 w-10 h-10 text-lg text-white font-bold bg-indigo-600 rounded-full">
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
                <div className="flex-1 py-6 xs:p-6">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold leading-snug">
                      Enviamos as oportunidades
                    </h3>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      Toda quarta-feira às 11h enviaremos uma lista com as vagas
                      que fazem mais sentido para você.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* card three ends here */}
          </div>
        </div>
      </div>
    </div>
  </section>
)
