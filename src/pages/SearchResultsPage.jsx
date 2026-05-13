import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { useStore } from "@nanostores/react"
import { Badge } from "flowbite-react"
import ErrorState from "../components/ErrorState"
import LoadingState from "../components/LoadingState"
import SearchBar from "../components/SearchBar"
import StockCard from "../components/StockCard"
import {
    $searchError,
    $searchLoading,
    $searchResults,
    searchStocksByQuery,
} from "../stores/stocksStore"

export default function SearchResultsPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q") || ""

    const results = useStore($searchResults)
    const loading = useStore($searchLoading)
    const error = useStore($searchError)

    useEffect(() => {
        if (query) {
            searchStocksByQuery(query)
        }
    }, [query])

    return (
        <section className="space-y-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
                <Badge color="info" className="mb-4 w-fit">
                    Resultados de búsqueda
                </Badge>

                <h1 className="text-3xl font-black text-white sm:text-5xl">
                    Búsqueda de acciones
                </h1>

                <p className="mt-3 text-slate-400">
                    Resultados para:{" "}
                    <span className="font-semibold text-cyan-300">
                        {query || "Sin búsqueda"}
                    </span>
                </p>

                <SearchBar />
            </div>

            {loading && (
                <LoadingState text="Buscando acciones en Financial Modeling Prep..." />
            )}

            {error && (
                <ErrorState message={error} />
            )}

            {!loading && !error && results.length === 0 && (
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-slate-300">
                    No se han encontrado resultados. Prueba con símbolos como AAPL, MSFT, TSLA o NVDA.
                </div>
            )}

            {!loading && !error && results.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {results.map((stock) => (
                        <StockCard key={stock.symbol} stock={stock} />
                    ))}
                </div>
            )}
        </section>
    )
}