import { Country } from "@/app/page";

type Props = { 
  params: { name: string };
}

async function getCountryByName(countryName: string): Promise<Country> {
  const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  return (await response.json())[0]
}

export default async function CountryPage({
  params: { name },
}:Props) {

  const country = await getCountryByName(name)

  return (
    <section>
      <h1 className="text-5xl font-bold text-gray-800 mt-16">{country.translations.por.common}</h1>
    </section>
  )
}
