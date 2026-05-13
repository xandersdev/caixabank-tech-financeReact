import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useStore } from "@nanostores/react"
import { Badge, Button } from "flowbite-react"
import { getPopularStocks } from "../api/fmp"
import ErrorState from "../components/ErrorState"
import LoadingState from "../components/LoadingState"
import SearchBar from "../components/SearchBar"
import StockCard from "../components/StockCard"
import { $recentStocks } from "../stores/stocksStore"

export default function HomePage() {
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const recentStocks = useStore($recentStocks)

    useEffect(() => {
        async function loadStocks() {
            try {
                setLoading(true)
                setError("")

                const data = await getPopularStocks()

                setStocks(data)
            } catch (error) {
                console.error(error)
                setError(
                    "No se han podido cargar los datos del mercado. Revisa tu API key o inténtalo más tarde."
                )
            } finally {
                setLoading(false)
            }
        }

        loadStocks()
    }, [])

    return (
        <section className="space-y-10">
            <HeroSection />

            <RecentStocksSection recentStocks={recentStocks} />

            <section>
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <Badge color="info" className="mb-3 w-fit">
                            Datos reales de la API
                        </Badge>

                        <h2 className="text-3xl font-bold text-white">
                            Acciones destacadas del mercado
                        </h2>

                        <p className="mt-2 max-w-2xl text-slate-400">
                            Explora una selección de empresas cotizadas usando datos reales de Financial Modeling Prep.
                        </p>
                    </div>

                    <Button
                        as="a"
                        href="https://financialmodelingprep.com"
                        target="_blank"
                        rel="noreferrer"
                        gradientDuoTone="cyanToBlue"
                    >
                        Ver fuente de la API
                    </Button>
                </div>

                {loading && (
                    <LoadingState text="Cargando datos del mercado..." />
                )}

                {error && <ErrorState message={error} />}

                {!loading && !error && stocks.length === 0 && (
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-slate-300">
                        No se han encontrado acciones.
                    </div>
                )}

                {!loading && !error && stocks.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {stocks.map((stock) => (
                            <StockCard key={stock.symbol} stock={stock} />
                        ))}
                    </div>
                )}
            </section>
        </section>
    )
}

function HeroSection() {
    return (
        <section className="overflow-hidden rounded-4xl border border-slate-800 bg-linear-to-br from-slate-900 via-slate-950 to-cyan-950 p-8 shadow-2xl sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                    <Badge color="info" className="mb-5 w-fit">
                        React · TailwindCSS · Flowbite
                    </Badge>

                    <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">
                        Panel financiero profesional construido con React.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                        Una aplicación frontend responsive que consume datos financieros reales y presenta información bursátil mediante una interfaz limpia y moderna.
                    </p>

                    <SearchBar />

                </div>

                <div className="rounded-3xl border border-cyan-400/20 bg-slate-950/80 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                        Resumen del mercado
                    </p>

                    <div className="mt-6 space-y-4">
                        <MetricCard label="API" value="FMP" />
                        <MetricCard label="Tecnología" value="React" />
                        <MetricCard label="Interfaz" value="Flowbite" />
                    </div>
                </div>
            </div>
        </section>
    )
}

function RecentStocksSection({ recentStocks }) {
    if (recentStocks.length === 0) {
        return null
    }

    return (
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-4">
                <Badge color="info" className="mb-3 w-fit">
                    Nanostore
                </Badge>

                <h2 className="text-2xl font-bold text-white">
                    Acciones vistas recientemente
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                    Accesos guardados temporalmente durante esta sesión.
                </p>
            </div>

            <div className="flex flex-wrap gap-3">
                {recentStocks.map((stock) => (
                    <Link
                        key={stock.symbol}
                        to={`/stock/${stock.symbol}`}
                        className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm transition hover:border-cyan-500 hover:bg-cyan-500/10"
                    >
                        <span className="font-bold text-cyan-300">
                            {stock.symbol}
                        </span>

                        <span className="ml-2 text-slate-300">
                            {stock.companyName}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    )
}

function MetricCard({ label, value }) {
    return (
        <div className="flex items-center justify-between rounded-2xl bg-slate-900 p-4">
            <span className="text-sm text-slate-400">{label}</span>

            <span className="text-lg font-bold text-white">{value}</span>
        </div>
    )
}