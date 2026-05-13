import { Button, TextInput } from "flowbite-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { searchStocksByQuery } from "../stores/stocksStore"

export default function SearchBar() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        const cleanQuery = query.trim()

        if (!cleanQuery) {
            return
        }

        await searchStocksByQuery(cleanQuery)
        navigate(`/search?q=${encodeURIComponent(cleanQuery)}`)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
            <TextInput
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Busca una empresa o símbolo, por ejemplo AAPL"
                className="flex-1"
            />

            <Button type="submit" gradientDuoTone="cyanToBlue">
                Buscar
            </Button>
        </form>
    )
}