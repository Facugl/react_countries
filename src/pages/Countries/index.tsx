import * as C from "./styles"
import { useEffect, useState } from "react";
import { Input } from "../../components/Input"
import { CountriesTS } from "../../types/Countries";
import { CountryItem } from "../../components/CountryItem";
import { api } from "../../api"
import { useForm } from "../../contexts/ThemeContext"

export const Countries = () => {
  const { state } = useForm()

  const [countries, setCountries] = useState<CountriesTS[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllCountries()
  }, []);

  const getAllCountries = async () => {
    setLoading(true)
    let countries = await api.getCountries()
    setCountries(countries)
    setLoading(false)
  }

  const lowerSearch = search.toLowerCase()

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(lowerSearch) || country.region.toLowerCase().includes(lowerSearch))

  return (
    <C.CountriesArea theme={state.theme}>
      <Input
        value={search}
        setSearch={setSearch}
      />
      <div className="countries">
        {loading && <div className="loading">Loading...</div>}
        {!loading && filteredCountries.map((item) => (
          <CountryItem
            key={item.name}
            name={item.name}
            population={item.population}
            region={item.region}
            capital={item.capital}
            flag={item.flags.png}
          />
        ))}
      </div>
    </C.CountriesArea>
  )
}