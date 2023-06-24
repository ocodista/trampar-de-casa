"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EmailForm } from "./EmailForm";
import { ApiRoutes } from "../../../global/enums/apiRoutes";

export const Hero = () => {
  const [subscribersCount, setSubscribersCount] = useState(0)
  useEffect(() => {
    (async () => {
      const response = await fetch(ApiRoutes.Subscribers)
      if (response.ok) {
        const count = await response.json()
        setSubscribersCount(count)
      }
    })()
  }, [])
  return (
    <section className="relative overflow-hidden pt-12 pb-28 container px-4 mx-auto">
      <div className="flex flex-wrap xl:items-center -m-8">
        <div className="w-full md:w-1/2 p-8 xl:p-12 xl:w-1/2 md:flex">
          <div className="md:inline-block relative">
            <div className="overflow-hidden rounded-lg">
              <Image
                className="w-full md:w-auto rounded-lg transform hover:scale-105 transition ease-in-out duration-1000"
                src="/images/home-1.jpg"
                width="500"
                height="500"
                alt="Imagem ilustrando trabalho remoto"
              />
            </div>
            <div className="p-8 absolute bottom-0 left-0 w-full md:p-0">
              <div className="p-11 bg-black bg-opacity-70 backdrop-blur-xl rounded-lg md:w-full">
                <p className="text-sm text-white text-opacity-60 font-semibold uppercase tracking-px">
                      RECEBA VAGAS EM PORTUGUÊS OU INGLÊS, DE ACORDO COM SUA
                      PREFERÊNCIA.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:flex-1 p-8 xl:p-12">
          <div className="xl:max-w-2xl">
            <h1 className="mb-7 text-6xl md:text-8xl xl:text-10xl font-bold font-heading tracking-px-n leading-none">
                  Vagas remotas no seu e-mail.
            </h1>
            <p className="text-lg text-gray-900 font-medium">
                  Levamos as melhores oportunidades de trampo até você.
            </p>
            <div className="h-[24px] mt-5 mb-3">
              {Boolean(subscribersCount) && <h4 className="text-gray-900  font-semibold roll-animation">Junte-se a {subscribersCount} inscritos 🚀</h4>}
            </div>
            <div className="p-1.5 xl:pl-7 inline-block w-full border-2 border-black rounded-xl focus-within:ring focus-within:ring-indigo-300">
              <EmailForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
