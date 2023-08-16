type Country = {
  name: {
    common: string;
  }
}


async function getCountries(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json()
}

export default async function Home() {
  const countries = await getCountries()
  console.log("teste", countries)
  return (
    <section className="container flex w-full">
      {countries.map((country) => (
        <h1 key={country.name.common}>{country.name.common}</h1>
      ) )}
    </section>
  )
}
