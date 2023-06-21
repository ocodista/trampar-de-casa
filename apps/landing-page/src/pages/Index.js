import React, { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    const burger = document.querySelectorAll('.navbar-burger');
    const menu = document.querySelectorAll('.navbar-menu');

    if (burger.length && menu.length) {
      for (var i = 0; i < burger.length; i++) {
        burger[i].addEventListener('click', function () {
          for (var j = 0; j < menu.length; j++) {
            menu[j].classList.toggle('hidden');
          }
        });
      }
    }

    // close
    const close = document.querySelectorAll('.navbar-close');
    const backdrop = document.querySelectorAll('.navbar-backdrop');

    if (close.length) {
      for (var i = 0; i < close.length; i++) {
        close[i].addEventListener('click', function () {
          for (var j = 0; j < menu.length; j++) {
            menu[j].classList.toggle('hidden');
          }
        });
      }
    }

    if (backdrop.length) {
      for (var i = 0; i < backdrop.length; i++) {
        backdrop[i].addEventListener('click', function () {
          for (var j = 0; j < menu.length; j++) {
            menu[j].classList.toggle('hidden');
          }
        });
      }
    }
  }, [])
  return (
    <React.Fragment>
      <>
        <section className='overflow-hidden'>
          <div className='flex items-center justify-between px-7 xl:px-40 py-5 text-black'>
            <div className='w-auto'>
              <div className='flex flex-wrap items-center'>
                <div className='w-auto mr-14'>
                  <a href='#'>
                    <img src='flaro-assets/logos/flaro-logo-light.svg' alt='' />
                  </a>
                </div>
              </div>
            </div>
            <div className='w-auto'>
              <div className='flex flex-wrap items-center'>
                <div className='w-auto lg:block'>
                  <ul className='flex items-center mr-16 text-black'>
                    <li className='mr-9 font-medium'>
                      <a href='#'>Como Funciona</a>
                    </li>
                    <li className='mr-9 font-medium'>
                      <a href='#'>Empresas</a>
                    </li>
                    <li className='mr-9 font-medium'>
                      <a href='#'>Perguntas Frequentes</a>
                    </li>
                    <li className='font-medium'>
                      <a href='#'>Vagas</a>
                    </li>
                  </ul>
                </div>
                <div className='w-auto hidden lg:block'>
                  <div className='inline-block'>
                    <button
                      className='py-3 px-5 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200'
                      type='button'
                    >
                      Cadastre uma Vaga
                    </button>
                  </div>
                </div>
                <div className='w-auto lg:hidden'>
                  <a href='#'>
                    <svg
                      className='navbar-burger text-indigo-600'
                      width={51}
                      height={51}
                      viewBox='0 0 56 56'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        width={56}
                        height={56}
                        rx={28}
                        fill='currentColor'
                      />
                      <path
                        d='M37 32H19M37 24H19'
                        stroke='white'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='hidden navbar-menu fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50'>
            <div className='navbar-backdrop fixed inset-0 bg-gray-800 opacity-80' />
            <nav className='relative z-10 px-9 pt-8 bg-black h-full overflow-y-auto'>
              <div className='flex flex-wrap justify-between h-full'>
                <div className='w-full'>
                  <div className='flex items-center justify-between -m-2'>
                    <div className='w-auto p-2'>
                      <a className='inline-block' href='#'>
                        <img
                          src='flaro-assets/logos/flaro-logo-light.svg'
                          alt=''
                        />
                      </a>
                    </div>
                    <div className='w-auto p-2'>
                      <a className='navbar-burger text-white' href='#'>
                        <svg
                          width={24}
                          height={24}
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M6 18L18 6M6 6L18 18'
                            stroke='currentColor'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-center py-16 w-full'>
                  <ul>
                    <li className='mb-12'>
                      <a
                        className='font-medium text-white hover:text-gray-200'
                        href='#'
                      >
                        Features
                      </a>
                    </li>
                    <li className='mb-12'>
                      <a
                        className='font-medium text-white hover:text-gray-200'
                        href='#'
                      >
                        Solutions
                      </a>
                    </li>
                    <li className='mb-12'>
                      <a
                        className='font-medium text-white hover:text-gray-200'
                        href='#'
                      >
                        Resources
                      </a>
                    </li>
                    <li>
                      <a
                        className='font-medium text-white hover:text-gray-200'
                        href='#'
                      >
                        Pricing
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='flex flex-col justify-end w-full pb-8'>
                  <div className='flex flex-wrap'>
                    <div className='w-full'>
                      <div className='block'>
                        <button
                          className='py-3 px-5 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200'
                          type='button'
                        >
                          Try 14 Days Free Trial
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </section>
        <section className='py-24 bg-white overflow-hidden'>
          <div className='container px-4 mx-auto'>
            <div className='flex flex-wrap xl:items-center -m-8'>
              <div className='w-full md:w-1/2 p-8'>
                <div className='md:max-w-xl'>
                  <h2
                    className='mb-3 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight'
                    contentEditable='false'
                  >
                    Encontre sua vaga 100% remota.
                  </h2>
                  <p
                    className='mb-9 font-medium text-gray-600 leading-relaxed'
                    contentEditable='false'
                  >
                    Levamos as melhores oportunidades de trampo até você.
                  </p>
                  <div className='mb-3 p-2 xl:pl-6 inline-block md:max-w-xl w-full border border-gray-300 rounded-lg focus-within:ring focus-within:ring-indigo-300'>
                    <div className='flex flex-wrap items-center'>
                      <div className='w-full xl:flex-1'>
                        <input
                          className='p-3 xl:p-0 xl:pr-6 w-full font-medium text-gray-500 placeholder-gray-500 outline-none'
                          id='newsletterInput2-1'
                          type='text'
                          placeholder='Seu melhor e-mail aqui'
                          contentEditable='false'
                          name=''
                        />
                      </div>
                      <div className='w-full xl:w-auto'>
                        <div className='block'>
                          <button
                            className='py-4 px-8 w-full text-white font-semibold border border-indigo-700 rounded-lg focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200'
                            type='button'
                          >
                            Inscreva-se Já
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p
                    className='text-sm text-gray-500 font-medium'
                    contentEditable='false'
                  >
                    Apenas um e-mail por semana com as melhores oportunidades de
                    trampo para você.
                  </p>
                </div>
              </div>
              <div className='w-full md:w-1/2 p-8'>
                <div className='flex flex-wrap -m-4'>
                  <div className='w-full xl:w-1/2 p-4'>
                    <div className='p-7 bg-gray-50 rounded-2xl'>
                      <h2 className='mb-2 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight'>
                        + 10
                      </h2>
                      <p className='mb-6 text-gray-800 font-semibold'>
                        Áreas de tecnologia
                      </p>
                      <p className='text-gray-600 font-medium'>
                        Oferecemos vagas em mais de 10 diferentes áreas de
                        tecnologia.
                      </p>
                    </div>
                  </div>
                  <div className='w-full xl:w-1/2 p-4'>
                    <div className='p-7 bg-gray-50 rounded-2xl'>
                      <h2 className='mb-2 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight'>
                        2
                      </h2>
                      <p className='mb-6 text-gray-800 font-semibold'>
                        Idiomas Disponíveis
                      </p>
                      <p className='text-gray-600 font-medium'>
                        Receba vagas em português ou inglês, de acordo com sua
                        preferência.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='py-32 bg-white overflow-hidden'>
          <div className='container px-4 mx-auto'>
            <div className='flex flex-wrap -m-8'>
              <div className='w-full md:w-1/2 p-8'>
                <div className='md:max-w-lg'>
                  <h2 className='mb-5 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight'>
                    Como funciona o Trampo Em Casa
                  </h2>
                  <p className='text-gray-600 font-medium leading-relaxed'>
                    Três passos simples para receber vagas incríveis diretamente
                    na sua caixa de entrada.
                  </p>
                </div>
              </div>
              <div className='w-full md:w-1/2 p-8'>
                <div className='flex flex-wrap'>
                  <div className='w-full'>
                    <div className='flex flex-wrap -m-7'>
                      <div className='w-auto p-7'>
                        <div className='relative w-11 h-11 border border-blueGray-200 rounded-full'>
                          <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='#4F46E5'
                              className=''
                            >
                              <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                              <g
                                id='SVGRepo_tracerCarrier'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <g id='SVGRepo_iconCarrier'>
                                <path d='M21.5 4h-19A1.504 1.504 0 0 0 1 5.5v13A1.5 1.5 0 0 0 2.5 20h19a1.5 1.5 0 0 0 1.5-1.5v-13A1.504 1.504 0 0 0 21.5 4zM12 12.07L2.82 5h18.36zm-2.846-.93L2 18.292V5.631zm.798.615L12 13.33l2.048-1.576L21.293 19H2.707zm4.894-.616L22 5.631v12.662z' />
                                <path fill='none' d='M0 0h24v24H0z' />
                              </g>
                            </svg>
                          </div>
                        </div>
                        <div className='w-px h-28 bg-blueGray-200 mx-auto' />
                      </div>
                      <div className='flex-1 p-7'>
                        <div className='md:max-w-sm pb-8'>
                          <h3 className='mb-4 text-xl font-semibold leading-normal'>
                            Inscreva-se
                          </h3>
                          <p className='text-gray-600 font-medium leading-relaxed'>
                            Forneça seu melhor e-mail e defina suas preferências
                            de trabalho.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div className='flex flex-wrap -m-7'>
                      <div className='w-auto p-7'>
                        <div className='relative w-11 h-11 border border-blueGray-200 rounded-full'>
                          <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='#000000'
                              className=''
                            >
                              <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                              <g
                                id='SVGRepo_tracerCarrier'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <g id='SVGRepo_iconCarrier'>
                                <path d='M21.5 4h-19A1.504 1.504 0 0 0 1 5.5v13A1.5 1.5 0 0 0 2.5 20h19a1.5 1.5 0 0 0 1.5-1.5v-13A1.504 1.504 0 0 0 21.5 4zM12 12.07L2.82 5h18.36zm-2.846-.93L2 18.292V5.631zm.798.615L12 13.33l2.048-1.576L21.293 19H2.707zm4.894-.616L22 5.631v12.662z' />
                                <path fill='none' d='M0 0h24v24H0z' />
                              </g>
                            </svg>
                          </div>
                        </div>
                        <div className='w-px h-36 bg-blueGray-200 mx-auto' />
                      </div>
                      <div className='flex-1 p-7'>
                        <div className='md:max-w-sm pb-8'>
                          <h3 className='mb-4 text-xl font-semibold leading-normal'>
                            Encontre a correspondência perfeita
                          </h3>
                          <p className='text-gray-600 font-medium leading-relaxed'>
                            Nós cruzamos suas preferências com nossas vagas
                            disponíveis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div className='flex flex-wrap -m-7'>
                      <div className='w-auto p-7'>
                        <div className='relative w-11 h-11 border border-blueGray-200 rounded-full'>
                          <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='#000000'
                              preserveAspectRatio='xMidYMid'
                              viewBox='0 0 31.781 31.906'
                              className=''
                            >
                              <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                              <g
                                id='SVGRepo_tracerCarrier'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <g id='SVGRepo_iconCarrier'>
                                {' '}
                                <path d='M28.802,31.908 L2.981,31.908 C1.338,31.908 0.001,30.566 0.001,28.915 L0.001,13.951 C0.001,13.938 0.008,13.928 0.008,13.916 C0.009,13.880 0.021,13.846 0.029,13.811 C0.040,13.731 0.054,13.655 0.084,13.580 C0.088,13.566 0.089,13.551 0.095,13.538 C0.115,13.495 0.146,13.459 0.174,13.420 C0.201,13.379 0.213,13.333 0.245,13.295 C0.262,13.276 0.284,13.269 0.301,13.252 C0.309,13.244 0.314,13.233 0.322,13.225 C0.331,13.216 0.335,13.205 0.344,13.197 L4.967,9.172 L4.967,4.973 C4.967,4.422 5.412,3.975 5.960,3.975 L10.937,3.975 L15.241,0.228 C15.615,-0.096 16.168,-0.096 16.542,0.228 L20.847,3.975 L25.823,3.975 C26.372,3.975 26.816,4.422 26.816,4.973 L26.816,9.172 L31.440,13.197 C31.449,13.205 31.452,13.217 31.462,13.225 C31.470,13.233 31.475,13.244 31.483,13.253 C31.500,13.269 31.522,13.277 31.538,13.295 C31.570,13.332 31.582,13.378 31.607,13.418 C31.636,13.458 31.668,13.495 31.688,13.538 C31.694,13.552 31.695,13.567 31.699,13.581 C31.729,13.655 31.742,13.730 31.753,13.808 C31.762,13.844 31.774,13.879 31.775,13.916 C31.775,13.928 31.782,13.938 31.782,13.951 L31.782,28.915 C31.782,30.566 30.445,31.908 28.802,31.908 ZM28.298,29.913 L15.988,18.957 C15.955,18.929 15.827,18.929 15.783,18.967 L3.485,29.913 L28.298,29.913 ZM1.906,28.652 L9.030,22.312 L1.906,16.073 L1.906,28.652 ZM2.508,13.953 L4.967,16.106 L4.967,11.813 L2.508,13.953 ZM15.892,2.302 L13.970,3.975 L17.813,3.975 L15.892,2.302 ZM20.759,5.906 C20.665,5.935 20.570,5.967 20.472,5.967 C20.356,5.967 20.240,5.947 20.129,5.906 L6.906,5.906 L6.906,17.805 L10.529,20.978 L14.478,17.463 C15.277,16.776 16.506,16.776 17.293,17.453 L21.253,20.977 L24.906,17.779 L24.906,5.906 L20.759,5.906 ZM26.816,11.813 L26.816,16.106 L29.274,13.953 L26.816,11.813 ZM29.906,16.047 L22.753,22.312 L29.906,28.678 L29.906,16.047 Z' />{' '}
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className='flex-1 p-7'>
                        <div className='md:max-w-sm pb-8'>
                          <h3 className='mb-4 text-xl font-semibold leading-normal'>
                            Receba as oportunidades
                          </h3>
                          <p className='text-gray-600 font-medium leading-relaxed'>
                            As vagas selecionadas são enviadas diretamente para
                            o seu e-mail.
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
        <section className='relative pt-24 pb-28 bg-blueGray-50 overflow-hidden'>
          <img
            className='absolute bottom-0 left-1/2 transform -translate-x-1/2'
            src='flaro-assets/images/faqs/gradient.svg'
            alt=''
          />
          <div className='relative z-10 container px-4 mx-auto'>
            <div className='md:max-w-4xl mx-auto'>
              <p className='mb-7 text-sm text-indigo-600 text-center font-semibold uppercase tracking-px'>
                ALGUMA DÚVIDA?
              </p>
              <h2 className='mb-16 text-6xl md:text-8xl xl:text-10xl text-center font-bold font-heading tracking-px-n leading-none'>
                Perguntas Frequentes
              </h2>
              <div className='mb-11 flex flex-wrap -m-1'>
                <div className='w-full p-1'>
                  <a href='#'>
                    <div className='py-7 px-8 bg-white bg-opacity-60 border-2 border-indigo-600 rounded-2xl shadow-10xl'>
                      <div className='flex flex-wrap justify-between -m-2'>
                        <div className='flex-1 p-2'>
                          <h3 className='mb-4 text-lg font-semibold leading-normal'>
                            Terei que pagar algo?
                          </h3>
                          <p className='text-gray-600 font-medium'>
                            Não, nosso serviço é absolutamente gratuito para os
                            candidatos. Nosso objetivo é conectar
                            desenvolvedores a oportunidades de trabalho remoto
                            de alta qualidade, sem nenhum custo.
                          </p>
                        </div>
                        <div className='w-auto p-2'>
                          <svg
                            className='relative top-1'
                            width={20}
                            height={20}
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M4.16732 12.5L10.0007 6.66667L15.834 12.5'
                              stroke='#4F46E5'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className='w-full p-1'>
                  <a href='#'>
                    <div className='py-7 px-8 bg-white bg-opacity-60 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-10xl'>
                      <div className='flex flex-wrap justify-between -m-2'>
                        <div className='flex-1 p-2'>
                          <h3 className='text-lg font-semibold leading-normal'>
                            Vaga não é remota, e agora?
                          </h3>
                        </div>
                        <div className='w-auto p-2'>
                          <svg
                            className='relative top-1'
                            width={18}
                            height={18}
                            viewBox='0 0 18 18'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M14.25 6.75L9 12L3.75 6.75'
                              stroke='#18181B'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className='w-full p-1'>
                  <a href='#'>
                    <div className='py-7 px-8 bg-white bg-opacity-60 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-10xl'>
                      <div className='flex flex-wrap justify-between -m-2'>
                        <div className='flex-1 p-2'>
                          <h3 className='text-lg font-semibold leading-normal'>
                            Código aberto para contribuições?
                          </h3>
                        </div>
                        <div className='w-auto p-2'>
                          <svg
                            className='relative top-1'
                            width={18}
                            height={18}
                            viewBox='0 0 18 18'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M14.25 6.75L9 12L3.75 6.75'
                              stroke='#18181B'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className='w-full p-1'>
                  <a href='#'>
                    <div className='py-7 px-8 bg-white bg-opacity-60 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-10xl'>
                      <div className='flex flex-wrap justify-between -m-2'>
                        <div className='flex-1 p-2'>
                          <h3 className='text-lg font-semibold leading-normal'>
                            Quantos e-mails receberei?
                          </h3>
                        </div>
                        <div className='w-auto p-2'>
                          <svg
                            className='relative top-1'
                            width={18}
                            height={18}
                            viewBox='0 0 18 18'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M14.25 6.75L9 12L3.75 6.75'
                              stroke='#18181B'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <p className='text-gray-600 text-center font-medium'>
                <span>Ainda em dúvida?</span>
                <a
                  className='font-semibold text-indigo-600 hover:text-indigo-700'
                  href='#'
                >
                  Fale conosco!
                </a>
              </p>
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}

