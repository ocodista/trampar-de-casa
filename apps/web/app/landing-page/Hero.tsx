"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Confetti from "react-confetti";
import { StatusCodes } from "http-status-codes";
import { LoadingContext } from "../contexts/LoadingContext";

import { ApiRoutes } from "shared/src/enums";

import { useToast } from "../components/ui/use-toast";
import { useQuery } from "react-query";

const validationSchema = z.object({
  email: z.string().email("Insira um e-mail válido!"),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const PADDING_X = 32; 



export const Hero = () => {
  const { isLoading, withLoading } = useContext(LoadingContext);

  const {
    register,
    getValues,
    formState: { isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const [isConfettiVisible, setConfettiVisibility] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setConfettiVisibility(false);
    }, 20_000);
  }, [isConfettiVisible]);

  const { toast } = useToast();

  const getSubscribersCount = async (): Promise<number | null> => {
    const response = await fetch(ApiRoutes.Subscribers)
    if (!response?.ok) return null
    const count = await response.json()
    return count
  }

  const { data: subscribersCount } = useQuery<number>('subscribersCountQuery', async () => await getSubscribersCount())
 
  const saveSubscriber = async () => {
    const email = getValues().email;
    try {
      const response = await fetch(ApiRoutes.Subscribers, {
        body: JSON.stringify({ email }),
        method: "POST",
      });

      if (response.ok) {
        setConfettiVisibility(true);
        toast({
          title: "Tudo certo 🥳",
          description: "Enviamos uma confirmação para o seu e-mail!",
        });
        return;
      }

      if (response.status === StatusCodes.CONFLICT) {
        toast({
          title: "Algo deu errado 🥶",
          variant: "destructive",
          description: await response.text(),
        });
        return;
      }

      throw new Error(response.statusText);
    } catch (err) {
      toast({
        title: "Algo deu errado 🥶",
        variant: "destructive",
        description:
          "Não conseguimos adicionar seu e-mail, tente novamente mais tarde.",
      });
    }

    return false;
  };

  return (
    <>
      {isConfettiVisible && <Confetti width={window.innerWidth - PADDING_X} />}
      <section className="relative">
        <header className="container mx-auto overflow-hidden">
          <div className="relative flex items-center justify-between px-4 py-5 bg-transparent">
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto mr-14">
                  <a href="#">
                    <Image
                      width={70}
                      height={70}
                      src="images/logo.svg"
                      alt="Logotipo da Trampar De Casa"
                    />
                  </a>
                </div>
                <nav className="w-auto hidden lg:block">
                  <ul className="flex items-center mr-16">
                    <li className="mr-9 font-medium hover:text-gray-700">
                      <a href="#valores">Nossos Valores</a>
                    </li>
                    <li className="mr-9 font-medium hover:text-gray-700">
                      <a href="#como-funciona">Como Funciona</a>
                    </li>
                    <li className="mr-9 font-medium hover:text-gray-700">
                      <a href="#perguntas-frequentes">Perguntas Frequentes</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto lg:hidden">
                  <a href="#">
                    <svg
                      className="navbar-burger text-indigo-600"
                      width={51}
                      height={51}
                      viewBox="0 0 56 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width={56}
                        height={56}
                        rx={28}
                        fill="currentColor"
                      />
                      <path
                        d="M37 32H19M37 24H19"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50">
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80" />
            <nav className="relative px-9 pt-8 bg-white h-full overflow-y-auto">
              <div className="flex flex-wrap justify-between h-full">
                <div className="w-full">
                  <div className="flex items-center justify-between -m-2">
                    <div className="w-auto p-2">
                      <a className="inline-block" href="#">
                        <Image
                          width={70}
                          height={70}
                          src="images/logo.svg"
                          alt="Logotipo da Trampar De Casa"
                        />
                      </a>
                    </div>
                    <div className="w-auto p-2">
                      <a className="navbar-burger" href="#">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 18L18 6M6 6L18 18"
                            stroke="#111827"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center py-16 w-full">
                  <ul>
                    <li className="mb-12">
                      <a
                        className="font-medium hover:text-gray-700"
                        href="#valores"
                      >
                        Nossos Valores
                      </a>
                    </li>
                    <li className="mb-12">
                      <a
                        className="font-medium hover:text-gray-700"
                        href="#como-funciona"
                      >
                        Como Funciona
                      </a>
                    </li>
                    <li>
                      <a
                        className="font-medium hover:text-gray-700"
                        href="#perguntas-frequentes"
                      >
                        Perguntas Frequentes
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <div className="relative  overflow-hidden pt-12 pb-28">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap xl:items-center -m-8">
              <div className="w-full md:w-1/2 p-8 xl:p-12 xl:w-1/2 md:flex">
                <div className="md:inline-block relative">
                  <div className="overflow-hidden rounded-lg">
                    <figure>
                      <img
                        className="w-full md:w-auto rounded-lg transform hover:scale-105 transition ease-in-out duration-1000"
                        src="images/home-1.jpg"
                        alt="Logo da Trampar de Casa"
                      />
                    </figure>
                  </div>
                  <div className="p-8 absolute bottom-0 left-0 w-full md:p-0">
                    <div className="p-11 bg-black bg-opacity-70 backdrop-blur-xl rounded-lg md:w-full">
                      <p className="text-sm text-white text-opacity-60 font-semibold uppercase tracking-px">
                        RECEBA VAGAS NACIONAIS E INTERNACIONAIS.
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
                    {Boolean(subscribersCount) && (
                      <h4 className="text-gray-900  font-semibold roll-animation">
                        Junte-se a {subscribersCount} inscritos 🚀
                      </h4>
                    )}
                  </div>
                  <div className="p-1.5 xl:pl-7 inline-block w-full border-2 border-black rounded-xl focus-within:ring focus-within:ring-indigo-300">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await withLoading(saveSubscriber);
                      }}
                    >
                      <div className="flex flex-wrap items-center">
                        <div className="w-full xl:flex-1">
                          <input
                            className="p-3 xl:p-0 xl:pr-7 w-full text-gray-600 placeholder-gray-600 outline-none"
                            id="email"
                            type="email"
                            placeholder="Digite seu melhor e-mail"
                            {...register("email")}
                          />
                        </div>
                        <div className="w-full xl:w-auto">
                          <div className="block">
                            <button
                              type="submit"
                              disabled={!isValid || isLoading}
                              className="py-4 px-7 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200 pointer 
                              disabled:opacity-50 cursor-pointer disabled:cursor-default"
                            >
                              Quero participar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
