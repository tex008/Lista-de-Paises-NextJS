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
          <article className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 transition-all hover:shadow-xl" >
            <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
              <Image src={props.flag} alt={props.flagAlt} fill className="object-cover" />
            </div>
            <h1 className="font-bold text-xl text-center mt-1">{props.ptName}</h1>
          </article>
       </Link>
  )
}
