import Image from 'next/image'

export const HowItWorks = () => (
  <section id="como-funciona" className="overflow-hidden bg-white py-32">
    <div className="container mx-auto px-8 lg:px-4">
      <div className="-m-8 flex flex-wrap items-center">
        <div className="w-full p-8 lg:w-1/2">
          <figure>
            <Image
              className="mx-auto transform rounded-2xl object-cover transition duration-1000 ease-in-out hover:-translate-y-4 max-lg:aspect-video max-lg:w-10/12 max-md:w-full"
              src="/images/footer-image.webp"
              alt="Homem olhando para o pôr do sol no horizonte do mar"
              width={652}
              height={435}
            />
          </figure>
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="font-heading tracking-px-n max-xs:text-4xl mb-16 text-6xl font-bold leading-tight md:text-7xl">
            Como Funciona
          </h2>
          <div className="-m-1.5 flex flex-wrap">
            {/* card one starts here */}
            <div className="w-full p-1.5">
              <div className="xs:-m-6 max-xs:flex-col flex flex-wrap">
                <div className="xs:p-6 w-auto">
                  <div className="xs:mb-3 relative h-10 w-10 rounded-full bg-indigo-600 text-lg font-bold text-white">
                    <img
                      className="absolute left-0 top-0"
                      src="flaro-assets/images/how-it-works/gradient.svg"
                      alt=""
                    />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                      1
                    </span>
                  </div>
                  <Image
                    className="max-xs:hidden relative left-6 -rotate-6"
                    src="flaro-assets/images/how-it-works/line.svg"
                    alt=""
                    width={23}
                    height={130}
                  />
                </div>
                <div className="xs:p-6 flex-1 py-6">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold leading-snug">
                      Você se inscreve
                    </h3>
                    <p className="font-medium leading-relaxed text-gray-700">
                      Forneça-nos seu melhor e-mail.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* card one ends here */}
            {/* card two starts here */}
            <div className="w-full p-1.5">
              <div className="xs:-m-6 max-xs:flex-col flex flex-wrap">
                <div className="xs:p-6 w-auto">
                  <div className="xs:-left-1 xs:mb-3 relative h-10 w-10 rounded-full bg-indigo-600 text-lg font-bold text-white">
                    <img
                      className="absolute left-0 top-0"
                      src="flaro-assets/images/how-it-works/gradient.svg"
                      alt=""
                    />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                      2
                    </span>
                  </div>
                  <Image
                    className="max-xs:hidden relative"
                    src="flaro-assets/images/how-it-works/line2.svg"
                    alt=""
                    width={23}
                    height={130}
                  />
                </div>
                <div className="xs:p-6 flex-1 py-6">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold leading-snug">
                      Analisamos as vagas
                    </h3>
                    <p className="font-medium leading-relaxed text-gray-700">
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
              <div className="xs:-m-6 max-xs:flex-col flex flex-wrap">
                <div className="xs:p-6 w-auto">
                  <div className="xs:left-5 xs:mb-3 relative h-10 w-10 rounded-full bg-indigo-600 text-lg font-bold text-white">
                    <img
                      className="absolute left-0 top-0"
                      src="flaro-assets/images/how-it-works/gradient.svg"
                      alt=""
                    />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                      3
                    </span>
                  </div>
                </div>
                <div className="xs:p-6 flex-1 py-6">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold leading-snug">
                      Enviamos as oportunidades
                    </h3>
                    <p className="font-medium leading-relaxed text-gray-700">
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
