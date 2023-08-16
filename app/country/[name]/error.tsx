"use client";

import Image from "next/image";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <section className="flex flex-col container my-12">
      <h1 className="text-5xl text-center font-bold text-gray-800">Ops, ocorreu um erro ao exibir esse país!</h1>
      <Link className="flex items-center py-2" href="/">
        <Image
          src="/back-arrow.svg"
          alt="back arrow icon"
          width={24}
          height={24}
        />
        Voltar
      </Link>
    </section>
  )
}
