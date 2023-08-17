import Image from "next/image";
import Link from "next/link";

type CountryCardProps = {
  name: string;
  ptName: string;
  flag: string;
  flagAlt: string;
}

export default function CountryCard(props: CountryCardProps) {
  return (
    <Link href={`/country/${props.name}`} key={props.name}>
      <article className="h-60 min-w-full p-2 bg-gray-100 border-2 hover:border-indigo-200 transition-all hover:shadow-xl flex flex-col justify-center rounded-xl" >
        <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl ">
          <Image src={props.flag} alt={props.flagAlt} fill className="object-cover rounded-xl" />
        </div>
        <h1 className="font-bold text-xl text-center mt-2">{props.ptName}</h1>
      </article>
    </Link>
  )
}
