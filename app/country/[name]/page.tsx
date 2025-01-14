import { Country } from "@/app/page";
import CountryCard from "@/components/countryCard";
import Image from "next/image";
import Link from "next/link";
import { flattenDiagnosticMessageText } from "typescript";

type CountryPageProps = { 
  params: { name: string };
}

type CountryBorder = {
  name: string;
  ptName: string;
  flag: string;
  alt: string;
}

async function getCountryByName(countryName: string): Promise<Country> {
  const response = await fetch(`https://restcountries.com/v3.1/all`)
  const countries: Country[] = await response.json()
  
  return countries.find((country) => country.name.common === countryName)!
}

async function getCountryBordersByName(countryName: string) {
   const response = await fetch("https://restcountries.com/v3.1/all")
   const countries: Country[] = await response.json();

  const country = countries.find((country) => country.name.common === countryName)!;

  return country.borders?.map((border) => {
    const borderCountry = countries.find((country) => country.cca3 === border)!

    if (!borderCountry) {
      return {
        name: "",
        ptName: "",
        flag: "",
        alt: "",
      }
    }

    return {
      name: borderCountry?.name.common,
      ptName: borderCountry?.translations.por.common,
      flag: borderCountry?.flags.svg,
      alt: borderCountry?.flags.alt,
    }
  })
}

export default async function CountryPage({
  params: { name },
}:CountryPageProps) {

  const country = await getCountryByName(decodeURI(name))
  const borderCountries = await getCountryBordersByName(decodeURI(name))
  
  const formatter = Intl.NumberFormat("en", { notation: "compact" })

  return (
    <section className="flex flex-col container px-4 md:px-0">
      <h1 className="text-5xl font-bold text-gray-800 my-16 text-center">{country.translations.por.common}</h1>
      <Link className="flex items-center my-2" href={`/`}>
        <Image
          src="/back-arrow.svg"
          alt="Arrow back icon"
          width={24}
          height={24}
        />
        Voltar
      </Link>
      <article className="flex md:flex-row  flex-col justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
         {country.capital && <h2 className="text-xl text-gray-800 mt-3">
            <b>🏙️ Capital:</b> {country.capital}
          </h2>}
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗺️ Continente: </b>  {country.region}{country.subregion && `- ${country.subregion}`}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👨‍👩‍👧‍👦 População:</b> {formatter.format(country.population)}
            </h2>
          {country?.languages  && (<h2 className="text-xl text-gray-800 mt-3 max-w-xl">
            <b>🗣️ Línguas faladas: </b> 
            <br />
            { Object.values(country.languages).map((language) => (
              <span key={language} className="inline-block px-2 bg-indigo-700 mr-2 text-white text-sm rounded-full max-w-2">{language}</span>
            ))}
          </h2>)}
        </section>
        <div className="relative h-48 my-2 md:h-auto md:my-0  md:w-96 w-auto shadow-md md:order-last order-first rounded-xl overflow-hidden">
          <Image 
            className="object-cover"
            fill
            src={country.flags.svg}
            alt={country.flags.alt}
          />
        </div>
      </article>
      <section className="px-1 md:px-0">
        <h3 className="mt-12 text-2xl font-semibold text-gray-800">Países que fazem fronteira</h3>
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-2 mt-4">
          {borderCountries?.map((border:CountryBorder) => (
              <CountryCard
                key={border.name}
                name={border.name}
                ptName={border.ptName}
                flag={border.flag}
                flagAlt={border.alt}
                />
          ))}
        </div>
      </section>
    </section>
  )
}
