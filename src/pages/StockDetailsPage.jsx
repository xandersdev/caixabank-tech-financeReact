import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { Badge, Button, Card } from "flowbite-react"
import { getCompanyProfile, getStockQuote } from "../api/fmp"
import ErrorState from "../components/ErrorState"
import LoadingState from "../components/LoadingState"

function formatCurrency(value) {
    if (!value) {
        return "No disponible"
    }

    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(value)
}

function formatLargeNumber(value) {
    if (!value) {
        return "No disponible"
    }

    return new Intl.NumberFormat("es-ES", {
        notation: "compact",
        maximumFractionDigits: 2,
    }).format(value)
}

export default function StockDetailsPage() {
    const { symbol } = useParams()

    const [profile, setProfile] = useState(null)
    const [quote, setQuote] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadStockDetails() {
            try {
                setLoading(true)
                setError("")

                const [profileData, quoteData] = await Promise.all([
                    getCompanyProfile(symbol),
                    getStockQuote(symbol),
                ])

                setProfile(profileData?.[0] || null)
                setQuote(quoteData?.[0] || null)
            } catch (error) {
                console.error(error)
                setError(
                    "No se han podido cargar los detalles de la acción. Inténtalo de nuevo más tarde."
                )
            } finally {
                setLoading(false)
            }
        }

        loadStockDetails()
    }, [symbol])

    if (loading) {
        return (
            <LoadingState text={`Cargando detalles de ${symbol}...`} />
        )
    }

    if (error) {
        return (
            <ErrorState message={error} />
        )
    }

    if (!profile && !quote) {
        return (
            <section className="space-y-6">
                <BackLink />

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-slate-300">
                    No se han encontrado detalles para esta acción.
                </div>
            </section>
        )
    }

    const companyName = profile?.companyName || quote?.name || symbol
    const description = profile?.description || "No hay descripción disponible para esta empresa."

    return (
        <section className="space-y-6">
            <BackLink />

            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
                <Card className="border-slate-800 bg-slate-900">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        {profile?.image && (
                            <img
                                src={profile.image}
                                alt={`Logo de ${companyName}`}
                                className="h-20 w-20 rounded-2xl bg-white object-contain p-3"
                            />
                        )}

                        <div>
                            <Badge color="info" className="mb-3 w-fit">
                                {symbol}
                            </Badge>

                            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                                {companyName}
                            </h1>

                            <p className="mt-3 text-slate-400">
                                {profile?.industry || profile?.sector || "Empresa cotizada"}
                            </p>
                        </div>
                    </div>

                    <p className="mt-8 leading-8 text-slate-300">
                        {description}
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <InfoBox label="Sector" value={profile?.sector} />
                        <InfoBox label="Industria" value={profile?.industry} />
                        <InfoBox label="País" value={profile?.country} />
                        <InfoBox label="Bolsa" value={profile?.exchangeShortName || quote?.exchange} />
                    </div>

                    {profile?.website && (
                        <Button
                            as="a"
                            href={profile.website}
                            target="_blank"
                            rel="noreferrer"
                            gradientDuoTone="cyanToBlue"
                            className="mt-8 w-fit"
                        >
                            Visitar web oficial
                        </Button>
                    )}
                </Card>

                <Card className="border-slate-800 bg-slate-900">
                    <h2 className="text-2xl font-bold text-white">
                        Resumen financiero
                    </h2>

                    <div className="mt-6 space-y-4">
                        <InfoRow label="Precio actual" value={formatCurrency(quote?.price)} />
                        <InfoRow label="Cambio" value={quote?.change ?? "No disponible"} />
                        <InfoRow label="Variación" value={quote?.changesPercentage ?? "No disponible"} />
                        <InfoRow label="Capitalización" value={formatLargeNumber(profile?.mktCap || quote?.marketCap)} />
                        <InfoRow label="Volumen" value={formatLargeNumber(quote?.volume)} />
                        <InfoRow label="CEO" value={profile?.ceo || "No disponible"} />
                    </div>
                </Card>
            </div>
        </section>
    )
}

function BackLink() {
    return (
        <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300"
        >
            ← Volver al inicio
        </Link>
    )
}

function InfoBox({ label, value }) {
    return (
        <div className="rounded-2xl bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {label}
            </p>

            <p className="mt-2 font-semibold text-white">
                {value || "No disponible"}
            </p>
        </div>
    )
}

function InfoRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4 text-sm">
            <span className="text-slate-400">
                {label}
            </span>

            <span className="text-right font-semibold text-white">
                {value || "No disponible"}
            </span>
        </div>
    )
}