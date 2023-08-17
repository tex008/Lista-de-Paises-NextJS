import { Country } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

type Props = { 
  params: { name: string };
}

async function getCountryByName(countryName: string): Promise<Country> {
  const response = await fetch(`https://restcountries.com/v3.1/all`)
  const countries: Country[] = await response.json()
  
  return countries.find((country) => country.name.common === countryName)!
}

async function getCountryBordersByName(countryName: string): Promise<Country> {
   const response = await fetch("https://restcountries.com/v3.1/all")
   const countries: Country[] = await response.json();

  const country = countries.find((country) => country.name.common === countryName)!;
  // console.log("country",country)

  return country.borders?.map((border) => {
    const borderCountry = countries.find((country) => country.cca3 === border)!
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
}:Props) {

  const country = await getCountryByName(decodeURI(name))
  const borderCountries = await getCountryBordersByName(decodeURI(name))
  
  const formatter = Intl.NumberFormat("en", { notation: "compact" })

  return (
    <section className="flex flex-col container">
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
      <article className="flex justify-between min-w-full p-10 bg-white rounded-xl">
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
          {country?.languages  && (<h2 className="text-xl text-gray-800 mt-3">
            <b>🗣️ Línguas faladas: </b> 
            <br />
            { Object.values(country.languages).map((language) => (
              <span key={language} className="inline-block px-2 bg-indigo-700 mr-2 text-white text-sm rounded-full">{language}</span>
            ))}
          </h2>)}
        </section>
        <div className="relative h-auto w-96 shadow-md">
          <Image 
            className="object-cover"
            fill
            src={country.flags.svg}
            alt={country.flags.alt}
          />
        </div>
      </article>
      <section>
        <h3 className="mt-12 text-2xl font-semibold text-gray-800">Países que fazem fronteira</h3>
        <div className="grid grid-cols-5 w-full">
          {country?.borders && country.borders.map((border) => (
            <div key={border}>{border}</div>
          ))}
        </div>
      </section>
    </section>
  )
}
