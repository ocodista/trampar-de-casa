'use client'
import { useAmazonProducts } from '../hooks/useAmazonProducts'

interface HomeOfficeItem {
  id: string
  title: string
  image: string
  description: string
  price: string
  affiliateLink: string
}

const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  keyboard:
    'Teclado mecânico gaming HyperX com switches HX Red, layout BR, ideal para jogos e produtividade.',
  chair:
    'Cadeira presidente ergonômica NR17 com apoio lombar, regulagem e conforto para longas jornadas.',
  'notebook-support':
    'Apoio ajustável e ventilado para MacBook e laptops até 17.3", ergonômico para home office.',
  'usb-adapter':
    'Adaptador USB3.2 de 10 Gbps, pacote com 2 unidades, compatível com iPhone, iPad, MacBook.',
  'hub-usbc':
    'Dongle USB-C com HDMI 4K, PD 100W, USB 3.0 e leitor de cartão para MacBook e laptops.',
  headphone:
    'Fones de ouvido profissionais over-ear, design fechado para gravação e monitoramento.',
  mouse:
    'Mouse ergonômico vertical que reduz tensão no pulso, ideal para longas jornadas de trabalho.',
  'monitor-support':
    'Suporte articulado para monitor, permite ajuste de altura e ângulo para melhor ergonomia.',
  ssd: 'SSD externo de 2TB, ultra rápido e portátil, perfeito para backup e armazenamento adicional.',
}

const PRODUCT_ORDER = [
  'keyboard',
  'chair',
  'notebook-support',
  'usb-adapter',
  'hub-usbc',
  'headphone',
  'mouse',
  'monitor-support',
  'ssd',
]

export const HomeOfficeItems = () => {
  const { products, loading, loadingStates, error, refetch } =
    useAmazonProducts()

  // Create ordered array with placeholders for products that haven't loaded yet
  const homeOfficeItems: (HomeOfficeItem | null)[] = PRODUCT_ORDER.map(
    (productId) => {
      const product = products.find((p) => p.id === productId)

      if (product) {
        return {
          id: product.id,
          title: product.title,
          image: product.image,
          description:
            PRODUCT_DESCRIPTIONS[product.id] ||
            'Produto selecionado para home office.',
          price: product.price,
          affiliateLink: product.url,
        }
      }

      // Return null for products not yet loaded (will show skeleton)
      return null
    }
  )

  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mb-20 text-center">
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-800">
                🏠 Equipamentos Profissionais
              </span>
            </div>
            <h1 className="max-xs:text-4xl mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl xl:text-7xl">
              Equipamentos para
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Trabalho Remoto
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
              Carregando equipamentos profissionais cuidadosamente
              selecionados...
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="group animate-pulse">
                <div className="overflow-hidden rounded-2xl bg-white p-1 shadow-sm">
                  <div className="aspect-square overflow-hidden rounded-xl bg-gray-200"></div>
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="h-5 w-3/4 rounded bg-gray-200"></div>
                      <div className="h-6 w-20 rounded-full bg-gray-200"></div>
                    </div>
                    <div className="mb-4 space-y-2">
                      <div className="h-3 w-full rounded bg-gray-200"></div>
                      <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-4 w-24 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="mb-20 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-800">
              🏠 Equipamentos Profissionais
            </span>
          </div>
          <h1 className="max-xs:text-4xl mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl xl:text-7xl">
            Equipamentos para
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Trabalho Remoto
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            Equipamentos profissionais cuidadosamente selecionados para criar o
            ambiente de trabalho remoto ideal. Preços e disponibilidade em tempo
            real.
          </p>

          {error && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-lg bg-orange-50 px-4 py-3 text-orange-800">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <span className="text-sm font-medium">
                Alguns preços podem não estar atualizados
              </span>
              <button
                onClick={refetch}
                className="ml-2 rounded-md bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 transition-colors hover:bg-orange-200"
              >
                Atualizar
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {homeOfficeItems.map((item, index) => {
            const productId = PRODUCT_ORDER[index]
            const isLoading = loadingStates[productId]

            // Show skeleton while loading
            if (!item || isLoading) {
              return (
                <div key={productId} className="group animate-pulse">
                  <div className="overflow-hidden rounded-2xl bg-white p-1 shadow-sm">
                    <div className="aspect-square overflow-hidden rounded-xl bg-gray-200">
                      <div className="flex h-full items-center justify-center">
                        <svg
                          className="h-12 w-12 animate-spin text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="h-5 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-6 w-20 rounded-full bg-gray-200"></div>
                      </div>
                      <div className="mb-4 space-y-2">
                        <div className="h-3 w-full rounded bg-gray-200"></div>
                        <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                      </div>
                      <div className="h-4 w-24 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div key={item.id} className="animate-fadeIn group">
                <a
                  href={item.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-2xl bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          if (!e.currentTarget.dataset.errorHandled) {
                            e.currentTarget.dataset.errorHandled = 'true'
                            e.currentTarget.src =
                              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA3NUgxMjVWMTI1SDc1Vjc1WiIgZmlsbD0iIzk0QTNCOCIvPgo8L3N2Zz4K'
                          }
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
                          <svg
                            className="h-12 w-12 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center rounded-full bg-black/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        #{index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold leading-tight text-gray-900 transition-colors group-hover:text-indigo-600">
                        {item.title}
                      </h3>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-sm font-semibold text-white shadow-sm">
                          {item.price}
                        </span>
                      </div>
                    </div>

                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-indigo-600 transition-colors group-hover:text-indigo-700">
                        <span className="text-sm font-medium">
                          Ver na Amazon
                        </span>
                        <svg
                          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>

                      <div className="flex items-center text-xs text-gray-400">
                        <svg
                          className="mr-1 h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        Afiliado
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200/50 bg-white/60 p-8 shadow-sm backdrop-blur-sm">
            <div className="mb-4">
              <svg
                className="mx-auto h-8 w-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              💡 Links com programa de afiliados Amazon
            </p>
            <p className="mb-3 text-sm leading-relaxed text-gray-600">
              Este site pode receber uma pequena comissão por compras realizadas
              através dos links acima. Isso nos ajuda a manter o Trampar de Casa
              gratuito para toda a comunidade.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-400"></div>
                Preços atualizados automaticamente
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
