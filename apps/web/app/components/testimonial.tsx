import * as React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from 'app/components/ui/carousel'
import TestimonialCard from './ui/TestimonialCard'
import { useMemo } from 'react'

interface Testimonial {
  name: string
  username: string
  avatarUrl: string
  jobTitle: string
  remoteWorkForThePast: string // 4 anos / 3 meses / 6 meses / 5 anos.
  testimonial: string
  writtenAt: string
}

const testimonialList: Testimonial[] = [
  {
    name: 'Nicolas Lopes Aquino',
    username: '@nicolaslopess__',
    avatarUrl:
      'https://pbs.twimg.com/profile_images/1705342255244939264/mRNT5gJ7_400x400.jpg',
    jobTitle: 'Senior Software Engineer',
    remoteWorkForThePast: '4 anos',
    writtenAt: '02 de Fevereiro de 2024, 9:19 PM',
    testimonial:
      'Consegui focar mais nos meus objetivos pessoais e passar mais tempo com a minha família.<br /><br />  A flexibilidade de conseguir unir o bem-estar com o trabalho e poder dividir melhor o meu tempo. Seja para cuidar da saúde ou ficar tempo com a minha família.',
  },
  {
    name: 'Caio Borghi',
    username: '@ocodista',
    avatarUrl:
      'https://pbs.twimg.com/profile_images/1729535038369263616/eianTw9g_400x400.jpg',
    jobTitle: 'Senior Software Engineer',
    remoteWorkForThePast: '5 anos',
    writtenAt: '03 de Fevereiro de 2024, 10:17 AM',
    testimonial:
      'O trabalho remoto mudou minha vida para melhor. Pude me mudar para perto da praia e acompanhar o crescimento dos meus filhos diariamente.',
  },
  {
    name: 'Lucas da Costa',
    username: '@thewizardlucas',
    avatarUrl:
      'https://pbs.twimg.com/profile_images/1677560491953254403/cCNdL2DP_400x400.jpg',
    jobTitle: 'Founder',
    writtenAt: '05 de Fevereiro de 2024, 12:20 PM',
    testimonial:
      'O trabalho remoto reforça minha disciplina e produtividade. O que mais gosta do trabalho remoto: tenho uma rotina bem estrita e gosto de fazer as exatas mesmas coisas nos mesmos horários.',
    remoteWorkForThePast: '7 anos',
  },
]

function by<T>(list: T[], count: number): T[][] {
  const chunks = []
  let tmpChunk = []
  list.forEach((item) => {
    tmpChunk.push(item)
    if (tmpChunk.length === count) {
      chunks.push(tmpChunk)
      tmpChunk = []
    }
  })

  if (tmpChunk.length) {
    chunks.push(tmpChunk)
  }
  return chunks
}

export function Testimonial() {
  const chunks = useMemo(() => by(testimonialList, 2), [])
  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden bg-blue-100 pb-24 pt-12">
      <h2 className="tracking-px-n text-center text-6xl font-bold leading-tight md:text-7xl">
        Além do escritório
      </h2>
      <main className="flex justify-center pt-10">
        <Carousel className="w-full">
          <CarouselPrevious className="previous flex" />
          <CarouselContent className="-ml-1 gap-2">
            {chunks.map((testimonialChunk, index) => (
              <CarouselItem key={index} className="pl-1 ">
                <div className="flex gap-2 p-1 px-4">
                  {testimonialChunk.map((testimonial) => (
                    <TestimonialCard
                      key={testimonial.username}
                      avatarUrl={testimonial.avatarUrl}
                      name={testimonial.name}
                      username={testimonial.username}
                      jobTitle={testimonial.jobTitle}
                      remoteWorkDuration={testimonial.remoteWorkForThePast}
                      quote={testimonial.testimonial}
                    />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </main>
    </section>
  )
}
