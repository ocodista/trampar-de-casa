import Image from 'next/image'
import { PartnerCompanies } from '../components/PartnerCompanies'
import { FrontinCoupon } from './FrontinCoupon'
import { SubscriberForm } from './SubscriberForm'
import SubscribersCount from './SubscribersCount'

export const Hero = () => {
  return (
    <>
      <FrontinCoupon />
      <div className="pb-28 pt-6">
        <div className="container mx-auto">
          <div className="-m-8 flex flex-wrap items-center">
            <div className="w-full p-8 lg:w-1/2 lg:pr-0">
              <SubscribersCount />
              <h1 className="mb-6 text-6xl md:text-8xl lg:text-10xl font-bold leading-none tracking-tight max-xs:text-4xl">
                Vagas remotas no seu e-mail
              </h1>
              <p className="mb-9 text-lg font-medium text-gray-900 max-xl:max-w-sm md:text-xl">
                Levamos as melhores oportunidades de trampo até você.
              </p>
              <SubscriberForm />
              <PartnerCompanies />
            </div>
            <div className="w-full p-8 lg:w-1/2">
              <Image
                className="mx-auto max-md:w-full max-lg:w-10/12 max-lg:aspect-video object-cover transform hover:-translate-y-4 transition ease-in-out duration-1000 rounded-xl"
                src="/images/HO-brasil.webp"
                alt="Escritório com uma paisagem natural ao fundo que pode ser vista pelas janelas"
                width={583}
                height={583}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
