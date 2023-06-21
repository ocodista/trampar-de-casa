'use client'
import React from 'react';

export default function Index() {
  return (
    <React.Fragment>
      <>
        <section className='relative'>
          <div className='absolute z-10 hidden lg:block left-0 top-0 max-w-xs w-full h-full bg-indigo-100' />
          <div className='container mx-auto overflow-hidden'>
            <div className='relative z-20 flex items-center justify-between px-4 py-5 bg-transparent'>
              <div className='w-auto'>
                <div className='flex flex-wrap items-center'>
                  <div className='w-auto mr-14'>
                    <a href='#'>
                      <img
                        src='flaro-assets/logos/flaro-logo-black.svg'
                        alt=''
                      />
                    </a>
                  </div>
                  <div className='w-auto hidden lg:block'>
                    <ul className='flex items-center mr-16'>
                      <li className='mr-9 font-medium hover:text-gray-700'>
                        <a href='#valores'>Nossos Valores</a>
                      </li>
                      <li className='mr-9 font-medium hover:text-gray-700'>
                        <a href='#como-funciona'>Como Funciona</a>
                      </li>
                      <li className='mr-9 font-medium hover:text-gray-700'>
                        <a href='#perguntas-frequentes'>Perguntas Frequentes</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='w-auto'>
                <div className='flex flex-wrap items-center'>
                  {/* <div className='w-auto hidden mr-5 lg:block'>
                    <div className='inline-block'>
                      <button
                        className='py-3 px-5 w-full hover:text-gray-700 font-medium rounded-xl bg-transparent transition ease-in-out duration-200'
                        type='button'
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                  <div className='w-auto hidden lg:block'>
                    <div className='inline-block'>
                      <button
                        className='py-3 px-5 w-full font-semibold border hover:border-gray-300 rounded-xl focus:ring focus:ring-gray-50 bg-white hover:bg-gray-50 transition ease-in-out duration-200'
                        type='button'
                      >
                        Create Free Account
                      </button>
                    </div>
                  </div> */}
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
              <nav className='relative z-10 px-9 pt-8 bg-white h-full overflow-y-auto'>
                <div className='flex flex-wrap justify-between h-full'>
                  <div className='w-full'>
                    <div className='flex items-center justify-between -m-2'>
                      <div className='w-auto p-2'>
                        <a className='inline-block' href='#'>
                          <img
                            src='flaro-assets/logos/flaro-logo-black.svg'
                            alt=''
                          />
                        </a>
                      </div>
                      <div className='w-auto p-2'>
                        <a className='navbar-burger' href='#'>
                          <svg
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M6 18L18 6M6 6L18 18'
                              stroke='#111827'
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
                        <a className='font-medium hover:text-gray-700' href='#'>
                          Features
                        </a>
                      </li>
                      <li className='mb-12'>
                        <a className='font-medium hover:text-gray-700' href='#'>
                          Solutions
                        </a>
                      </li>
                      <li className='mb-12'>
                        <a className='font-medium hover:text-gray-700' href='#'>
                          Resources
                        </a>
                      </li>
                      <li>
                        <a className='font-medium hover:text-gray-700' href='#'>
                          Pricing
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='flex flex-col justify-end w-full pb-8'>
                    <div className='flex flex-wrap'>
                      <div className='w-full mb-3'>
                        <div className='block'>
                          <button
                            className='py-3 px-5 w-full hover:text-gray-700 font-medium rounded-xl bg-transparent transition ease-in-out duration-200'
                            type='button'
                          >
                            Sign In
                          </button>
                        </div>
                      </div>
                      <div className='w-full'>
                        <div className='block'>
                          <button
                            className='py-3 px-5 w-full font-semibold border hover:border-gray-300 rounded-xl focus:ring focus:ring-gray-50 bg-white hover:bg-gray-50 transition ease-in-out duration-200'
                            type='button'
                          >
                            Create Free Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className='relative z-20 overflow-hidden pt-12 pb-28'>
            <div className='container px-4 mx-auto'>
              <div className='flex flex-wrap xl:items-center -m-8'>
                <div className='w-full md:w-1/2 p-8 xl:p-12 xl:w-1/2 md:flex'>
                  <div className='md:inline-block relative'>
                    <div className='overflow-hidden rounded-lg'>
                      <img
                        className='w-full md:w-auto rounded-lg transform hover:scale-105 transition ease-in-out duration-1000'
                        src='images/home-1.jpg'
                        alt=''
                      />
                    </div>
                    <div className='p-8 absolute bottom-0 left-0 w-full md:p-0'>
                      <div className='p-11 bg-black bg-opacity-70 backdrop-blur-xl rounded-lg md:w-full'>
                        <p className='text-sm text-white text-opacity-60 font-semibold uppercase tracking-px'>
                          RECEBA VAGAS EM PORTUGUÊS OU INGLÊS, DE ACORDO COM SUA
                          PREFERÊNCIA.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full md:w-1/2 xl:flex-1 p-8 xl:p-12'>
                  <div className='xl:max-w-2xl'>
                    <h1 style={{ textWrap: "balance" }} className='mb-7 text-6xl md:text-8xl xl:text-10xl font-bold font-heading tracking-px-n leading-none'>
                      Vagas remotas no seu e-mail.
                    </h1>
                    <p className='mb-9 text-lg text-gray-900 font-medium'>
                      Levamos as melhores oportunidades de trampo até você.
                    </p>
                    <div className='mb-16 p-1.5 xl:pl-7 inline-block w-full border-2 border-black rounded-3xl focus-within:ring focus-within:ring-indigo-300'>
                      <div className='flex flex-wrap items-center'>
                        <div className='w-full xl:flex-1'>
                          <input
                            className='p-3 xl:p-0 xl:pr-7 w-full text-gray-600 placeholder-gray-600 outline-none'
                            id='headerInput3-1'
                            type='text'
                            placeholder='Digite seu melhor e-mail '
                            name=''
                          />
                        </div>
                        <div className='w-full xl:w-auto'>
                          <div className='block'>
                            <button
                              className='py-4 px-7 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200'
                              type='button'
                            >
                              Inscreva Já
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-wrap items-center -m-16'>
                      <div className='w-auto'>
                        <div className='h-16 w-px bg-gray-200' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="valores" className='pt-32 pb-36 bg-indigo-600 overflow-hidden'>
          <div className='container px-4 mx-auto'>
            <div style={{ textWrap: 'balance' }}>
              <h2  className='mb-9 text-6xl md:text-8xl xl:text-10xl text-white font-bold tracking-px-n leading-none'>
                Apoiamos a liberdade do trabalho remoto.
              </h2>
              <p className='mb-36 text-white text-opacity-70'>
                Como profissionais dedicados da área de tecnologia, sabemos que
                é perfeitamente viável desfrutar de uma vida com menos trânsito,
                aproveitando mais o conforto e a tranquilidade
                residencial.&nbsp; Tudo isso é possível sem comprometer a
                qualidade de nossas entregas. &nbsp;
              </p>
            </div>
            <div className='flex flex-wrap -m-3'>
              <div className='w-full md:w-1/2 p-3'>
                <div className='p-7 bg-white border border-gray-900 rounded-3xl'>
                  <div className='flex flex-wrap -m-4'>
                    <div className='w-auto p-4'>
                      <svg
                        width={28}
                        height={28}
                        fill='#000000'
                        viewBox='0 0 32 32'
                        version='1.1'
                        xmlns='http://www.w3.org/2000/svg'
                        className=''
                      >
                        <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                        <g
                          id='SVGRepo_tracerCarrier'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <g id='SVGRepo_iconCarrier'>
                          <title>open</title>
                          <path d='M28 31h-24c-1.657 0-3-1.344-3-3v-14c0-1.657 1.343-3 3-3h24c1.656 0 3 1.343 3 3v14c0 1.656-1.344 3-3 3zM8 18.041c-1.657 0-3 1.567-3 3.5 0 1.934 1.343 3.5 3 3.5s3-1.566 3-3.5c0-1.933-1.344-3.5-3-3.5zM15.78 18.898c-0.115-0.237-0.269-0.422-0.458-0.553-0.19-0.132-0.426-0.221-0.707-0.268-0.2-0.037-0.49-0.055-0.87-0.055h-1.783v6.914h1.008v-2.016h0.842c0.81 0 1.368-0.356 1.679-0.693 0.309-0.338 0.464-1.812 0.464-2.299-0.001-0.282-0.059-0.793-0.175-1.030zM21.024 23.945h-3.058v-2.008h2.956v-0.93h-2.956v-2.055h3.050v-0.93h-3.995v6.914h4.003v-0.991zM26.954 18.023h-0.914v5.31l-3.012-5.31h-1.027v6.914h0.977v-5.061l3.012 5.061h0.965v-6.914zM13.823 21.93h-0.853v-2.977h0.838c0.343 0 0.578 0.017 0.706 0.051 0.197 0.055 0.357 0.166 0.478 0.336s0.182 0.375 0.182 0.613c0 0.33-0.103 1.522-0.309 1.704s-0.553 0.273-1.042 0.273zM8 24.125c-1.104 0-2-1.119-2-2.5s0.896-2.5 2-2.5 2 1.119 2 2.5-0.896 2.5-2 2.5zM25 11l-7.322-5.45c-0.344 0.277-0.775 0.45-1.25 0.45-0.662 0-1.244-0.325-1.607-0.821l-7.821 5.821h-1l8.493-6.518c-0.038-0.155-0.065-0.315-0.065-0.482 0-1.104 0.896-2 2-2 1.105 0 2 0.896 2 2 0 0.359-0.103 0.692-0.269 0.984l7.841 6.016h-1z' />
                        </g>
                      </svg>
                    </div>
                    <div className='flex-1 p-4'>
                      <h3 className='mb-3 text-lg font-semibold'>
                        Software Livre
                      </h3>
                      <p className='text-gray-600 font-medium'>
                        Todo o código utilizado neste projeto é público e está
                        disponível através do GitHub. Se você simpatiza com a
                        ideia de adoção do modelo de trabalho remoto, contribua
                        com nosso projeto!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-1/2 p-3'>
                <div className='p-7 bg-white border border-gray-900 rounded-3xl'>
                  <div className='flex flex-wrap -m-4'>
                    <div className='w-auto p-4'>
                      <svg
                        height={28}
                        width={28}
                        version='1.1'
                        id='Layer_1'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        viewBox='0 0 512 512'
                        xmlSpace='preserve'
                        fill='#000000'
                      >
                        <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                        <g
                          id='SVGRepo_tracerCarrier'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <g id='SVGRepo_iconCarrier'>
                          <path
                            style={{ fill: '#EAFFFF' }}
                            d='M489.739,500.87H22.261V66.783c0-24.588,19.933-44.522,44.522-44.522h378.435 c24.588,0,44.522,19.933,44.522,44.522V500.87z'
                          />
                          <path
                            style={{ fill: '#FFED8F' }}
                            d='M178.087,500.87H22.261v-77.913h155.826V500.87z'
                          />
                          <path
                            style={{ fill: '#CEA455' }}
                            d='M30.609,389.565V500.87c0,4.61-3.738,8.348-8.348,8.348s-8.348-3.738-8.348-8.348V389.565 c0-4.61,3.738-8.348,8.348-8.348S30.609,384.955,30.609,389.565z M77.913,381.217c-4.61,0-8.348,3.738-8.348,8.348v100.174 c0,4.61,3.738,8.348,8.348,8.348s8.348-3.738,8.348-8.348V389.565C86.261,384.955,82.523,381.217,77.913,381.217z'
                          />
                          <path
                            style={{ fill: '#C1813A' }}
                            d='M148.008,422.957c0,4.61-3.738,8.348-8.348,8.348H8.348c-4.61,0-8.348-3.738-8.348-8.348 c0-4.61,3.738-8.348,8.348-8.348H139.66C144.27,414.609,148.008,418.346,148.008,422.957z'
                          />
                          <path
                            style={{ fill: '#FFFF81' }}
                            d='M189.217,94.609c0,52.251-42.358,94.609-94.609,94.609S0,146.859,0,94.609S42.358,0,94.609,0 S189.217,42.358,189.217,94.609z'
                          />
                          <path
                            style={{ fill: '#FFF145' }}
                            d='M94.609,44.522c27.662,0,50.087,22.424,50.087,50.087s-22.424,50.087-50.087,50.087 s-50.087-22.424-50.087-50.087S66.946,44.522,94.609,44.522z'
                          />
                          <path
                            style={{ fill: '#A9D5BB' }}
                            d='M422.957,100.174L422.957,100.174c0,12.295-9.966,22.261-22.261,22.261H319.78 c1.899,3.277,3.003,7.071,3.003,11.13l0,0c0,12.295-9.966,22.261-22.261,22.261H144.696c-12.295,0-22.261-9.966-22.261-22.261l0,0 c0-12.295,9.966-22.261,22.261-22.261h80.916c-1.899-3.277-3.003-7.071-3.003-11.13l0,0c0-12.295,9.966-22.261,22.261-22.261 h155.826C412.99,77.913,422.957,87.879,422.957,100.174z M489.739,77.913c-12.295,0-22.261,9.966-22.261,22.261 s9.966,22.261,22.261,22.261S512,112.469,512,100.174S502.034,77.913,489.739,77.913z'
                          />
                          <path
                            style={{ fill: '#D3D5BB' }}
                            d='M346.502,500.87H131.312V285.682h215.189V500.87z'
                          />
                          <path
                            style={{ fill: '#A0A092' }}
                            d='M269.648,470.128h-61.482v-96.464c0-6.147,4.983-11.13,11.13-11.13h39.221 c6.147,0,11.13,4.983,11.13,11.13V470.128z'
                          />
                          <path
                            style={{ fill: '#DD7400' }}
                            d='M253.352,195.565l130.804,94.47c2.897,2.093,4.614,5.449,4.614,9.023v6.234 c0,6.147-4.983,11.13-11.13,11.13H100.174c-6.147,0-11.13-4.983-11.13-11.13v-6.234c0-3.574,1.716-6.931,4.614-9.023l130.804-94.47 c1.897-1.37,4.177-2.107,6.517-2.107h15.858C249.176,193.458,251.455,194.195,253.352,195.565z'
                          />
                          <path
                            style={{ fill: '#DDB961' }}
                            d='M192.795,281.441h-46.112v-69.963c0-6.147,4.983-11.13,11.13-11.13h23.851 c6.147,0,11.13,4.983,11.13,11.13V281.441z'
                          />
                          <path
                            style={{ fill: '#A03D07' }}
                            d='M231.884,281.441c0,4.61-3.738,8.348-8.348,8.348h-78.84c-4.61,0-8.348-3.738-8.348-8.348 c0-4.61,3.738-8.348,8.348-8.348h78.84C228.147,273.093,231.884,276.831,231.884,281.441z M292.174,244.87h-23.188 c-4.61,0-8.348,3.738-8.348,8.348c0,4.61,3.738,8.348,8.348,8.348h23.188c4.61,0,8.348-3.738,8.348-8.348 C300.522,248.607,296.784,244.87,292.174,244.87z M262.492,225.391c0-4.61-3.738-8.348-8.348-8.348h-23.188 c-4.61,0-8.348,3.738-8.348,8.348c0,4.61,3.738,8.348,8.348,8.348h23.188C258.756,233.739,262.492,230.002,262.492,225.391z M281.043,278.817h-16.696c-4.61,0-8.348,3.738-8.348,8.348c0,4.61,3.738,8.348,8.348,8.348h16.696c4.61,0,8.348-3.738,8.348-8.348 C289.391,282.555,285.654,278.817,281.043,278.817z'
                          />
                          <path
                            style={{ fill: '#9FBA41' }}
                            d='M511.205,328.348L511.205,328.348c0,39.957-32.391,72.348-72.348,72.348h-33.391 c-39.956,0-72.348-32.392-72.348-72.348l0,0c0-25.611,13.32-48.097,33.398-60.954c0-0.088-0.007-0.175-0.007-0.264 c0-30.736,24.917-55.652,55.652-55.652s55.652,24.917,55.652,55.652c0,0.088-0.007,0.175-0.007,0.264 C497.885,280.251,511.205,302.737,511.205,328.348z'
                          />
                          <path
                            style={{ fill: '#C1813A' }}
                            d='M430.51,300.522v189.217c0,4.61-3.738,8.348-8.348,8.348s-8.348-3.738-8.348-8.348V300.522 c0-4.61,3.738-8.348,8.348-8.348S430.51,295.911,430.51,300.522z'
                          />
                          <path
                            style={{ fill: '#FF7039' }}
                            d='M500.075,261.565c0,15.368-12.458,27.826-27.826,27.826s-27.826-12.458-27.826-27.826 s12.458-27.826,27.826-27.826S500.075,246.197,500.075,261.565z M360.944,345.043c-15.368,0-27.826,12.458-27.826,27.826 s12.458,27.826,27.826,27.826s27.826-12.458,27.826-27.826S376.312,345.043,360.944,345.043z'
                          />
                          <path
                            style={{ fill: '#FFAF4A' }}
                            d='M483.777,245.267c0,15.368-12.458,27.826-27.826,27.826c-3.436,0-6.724-0.627-9.763-1.765 c-1.139-3.039-1.765-6.327-1.765-9.762c0-15.368,12.458-27.826,27.826-27.826c3.436,0,6.725,0.627,9.763,1.765 C483.15,238.543,483.777,241.831,483.777,245.267z M360.944,345.043c-15.368,0-27.826,12.458-27.826,27.826 c0,3.436,0.627,6.724,1.765,9.763c3.039,1.139,6.327,1.765,9.763,1.765c15.368,0,27.826-12.458,27.826-27.826 c0-3.436-0.627-6.724-1.765-9.763C367.668,345.67,364.38,345.043,360.944,345.043z'
                          />
                          <path
                            style={{ fill: '#9FBA41' }}
                            d='M500.87,512H11.13l21.77-15.549c36.703-26.217,79.981-41.691,124.986-44.692l155.129-10.342 C382.881,436.758,451.357,462.487,500.87,512L500.87,512z'
                          />
                          <path
                            style={{ fill: '#7F932A' }}
                            d='M400.696,512H11.13l21.77-15.549c36.703-26.217,79.981-41.691,124.986-44.692l68.451-4.563 c63.243-4.216,125.748,17.808,171.341,61.839C398.691,510.012,399.697,511.002,400.696,512L400.696,512z'
                          />
                          <path
                            style={{ fill: '#9FBA41' }}
                            d='M289.391,512H11.13l21.77-15.549c36.703-26.217,79.981-41.691,124.986-44.692l7.058-0.471 c14.187-0.946,28.409,1.255,41.642,6.46C237.279,469.82,265.537,488.145,289.391,512L289.391,512z'
                          />
                          <path
                            style={{ fill: '#7F932A' }}
                            d='M178.087,512H11.13l21.77-15.549c0.218-0.156,0.436-0.311,0.654-0.466 c41.894-29.715,99.073-25.975,136.931,8.736C173.066,507.086,175.6,509.513,178.087,512L178.087,512z'
                          />
                          <path
                            style={{ fill: '#606D11' }}
                            d='M512,503.652c0,4.61-3.738,8.348-8.348,8.348H8.348C3.738,512,0,508.262,0,503.652 s3.738-8.348,8.348-8.348h495.304C508.262,495.304,512,499.042,512,503.652z'
                          />
                        </g>
                      </svg>
                    </div>
                    <div className='flex-1 p-4'>
                      <h3
                        className='mb-3 text-lg font-semibold'
                        
                      >
                        Em busca de um mundo melhor
                      </h3>
                      <p
                        className='text-gray-600 font-medium'
                        
                      >
                        O mundo evoluiu. Tecnologias e automações atingiram
                        níveis de sofisticação inéditos, no entanto, o modelo de
                        trabalho permanece o mesmo. Defendemos uma melhor
                        qualidade de vida.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="como-funciona" className='py-32 bg-white overflow-hidden'>
          <div className='container px-4 mx-auto'>
            <div className='flex flex-wrap lg:items-center -m-8'>
              <div className='w-full md:w-1/2 p-8'>
                <img
                  className='mx-auto transform hover:-translate-y-4 transition ease-in-out duration-1000 rounded-2xl'
                  src='https://images.unsplash.com/photo-1473172707857-f9e276582ab6?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzIzMzB8MHwxfHNlYXJjaHwxNnx8dGhpbmtpbmd8ZW58MHx8fHwxNjg3MzkxMTMzfDA&ixlib=rb-4.0.3&q=85&w=1920'
                  alt=''
                />
              </div>
              <div className='w-full md:w-1/2 p-8'>
                <h2 className='mb-20 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight'>
                  Como Funciona
                </h2>
                <div className='flex flex-wrap -m-1.5'>
                  <div className='w-full p-1.5'>
                    <div className='flex flex-wrap -m-6'>
                      <div className='w-auto p-6'>
                        <div className='relative mb-3 w-10 h-10 text-lg text-white font-bold bg-indigo-600 rounded-full'>
                          <img
                            className='absolute top-0 left-0'
                            src='flaro-assets/images/how-it-works/gradient.svg'
                            alt=''
                          />
                          <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            1
                          </span>
                        </div>
                        <img
                          className='relative left-3'
                          src='flaro-assets/images/how-it-works/line.svg'
                          alt=''
                        />
                      </div>
                      <div className='flex-1 p-6'>
                        <div>
                          <h3 className='mb-3 text-2xl font-semibold leading-snug'>
                            Você se inscreve
                          </h3>
                          <p className='text-gray-700 font-medium leading-relaxed'>
                            Forneça-nos seu melhor e-mail e defina suas
                            preferências de trabalho (cargo, tecnologias e
                            idioma)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full p-1.5'>
                    <div className='flex flex-wrap -m-6'>
                      <div className='w-auto p-6'>
                        <div className='relative -left-1 mb-3 w-10 h-10 text-lg text-white font-bold bg-indigo-600 rounded-full'>
                          <img
                            className='absolute top-0 left-0'
                            src='flaro-assets/images/how-it-works/gradient.svg'
                            alt=''
                          />
                          <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            2
                          </span>
                        </div>
                        <img
                          className='relative left-3'
                          src='flaro-assets/images/how-it-works/line2.svg'
                          alt=''
                        />
                      </div>
                      <div className='flex-1 p-6'>
                        <div>
                          <h3 className='mb-3 text-2xl font-semibold leading-snug'>
                            Analizamos as vagas
                          </h3>
                          <p className='text-gray-700 font-medium leading-relaxed'>
                            Nós cruzamos suas preferências com nossas vagas
                            disponíveis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full p-1.5'>
                    <div className='flex flex-wrap -m-6'>
                      <div className='w-auto p-6'>
                        <div className='relative left-5 mb-3 w-10 h-10 text-lg text-white font-bold bg-indigo-600 rounded-full'>
                          <img
                            className='absolute top-0 left-0'
                            src='flaro-assets/images/how-it-works/gradient.svg'
                            alt=''
                          />
                          <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            3
                          </span>
                        </div>
                      </div>
                      <div className='flex-1 p-6'>
                        <div>
                          <h3 className='mb-3 text-2xl font-semibold leading-snug'>
                            Enviamos as oportunidades
                          </h3>
                          <p className='text-gray-700 font-medium leading-relaxed'>
                            Toda quarta-feira às 11:00h da manhã enviaremos uma
                            lista com as vagas que fazem mais sentido para você.
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
        <section id="perguntas-frequentes" className='pt-28 pb-32 bg-white overflow-hidden'>
          <div className='container px-4 mx-auto'>
            <p className='mb-5 text-sm text-indigo-600 font-semibold uppercase tracking-px'>
              ALGUMA DÚVIDA?
            </p>
            <h2 className='mb-16 text-6xl md:text-8xl xl:text-10xl font-bold font-heading tracking-px-n leading-none'>
              Perguntas Frequentes
            </h2>
            <div className='mb-8'>
              <div className='flex flex-wrap -m-4'>
                <div className='w-full md:w-1/2 p-4'>
                  <div className='p-6 border border-gray-200 rounded-2xl shadow-10xl'>
                    <h3 className='mb-4 text-lg font-semibold leading-normal'>
                      1. Qual o preço?
                    </h3>
                    <p className='font-sans text-gray-600 leading-relaxed'>
                      Nosso serviço é totalmente gratuito. Nosso objetivo é
                      conectar profissionais de tecnologia a oportunidades de
                      trabalho remoto de alta qualidade, sem nenhum custo.
                    </p>
                  </div>
                </div>
                <div className='w-full md:w-1/2 p-4'>
                  <div className='p-6 border border-gray-200 rounded-2xl shadow-10xl'>
                    <h3 className='mb-4 text-lg font-semibold leading-normal'>
                      2. A vaga não é remota, e agora?
                    </h3>
                    <p className='font-sans text-gray-600 leading-relaxed'>
                      Caso encontre alguma vaga que não seja remota, denuncie!
                      Analisaremos todas as denúncias o mais rápido possível e
                      tomaremos as providências.
                    </p>
                  </div>
                </div>
                <div className='w-full md:w-1/2 p-4'>
                  <div className='p-6 border border-gray-200 rounded-2xl shadow-10xl'>
                    <h3 className='mb-4 text-lg font-semibold leading-normal'>
                      3. Quantos e-mails receberei?
                    </h3>
                    <p className='font-sans text-gray-600 leading-relaxed'>
                      Apenas um e-mail por&nbsp; semana, às quartas-feiras 11:00h, com vagas que fizerem
                      sentido para você. Todas são 100% remotas.
                    </p>
                  </div>
                </div>
                <div className='w-full md:w-1/2 p-4'>
                  <div className='p-6 border border-gray-200 rounded-2xl shadow-10xl'>
                    <h3 className='mb-4 text-lg font-semibold leading-normal'>
                      4. O trabalho remoto pode afetar a produtividade?
                    </h3>
                    <p className='font-sans text-gray-600 leading-relaxed'>
                      O trabalho remoto pode aumentar sua produtividade ao
                      reduzir o tempo perdido em deslocamentos e interrupções no
                      escritório.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}

