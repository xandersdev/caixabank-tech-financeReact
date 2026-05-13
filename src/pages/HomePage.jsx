import { useEffect, useState } from "react";
import { Badge, Button } from "flowbite-react";
import { getPopularStocks } from "../api/fmp";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import SearchBar from "../components/SearchBar";
import StockCard from "../components/StockCard";

export default function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStocks() {
      try {
        setLoading(true);
        setError("");

        const data = await getPopularStocks();
        setStocks(data);
      } catch (error) {
        setError(
          "Ha ocurrido un error y no se han podido cargar los datos del mercado",
        );
      } finally {
        setLoading(false);
      }
    }

    loadStocks();
  }, []);

  return (
    <section className="space-y-10">
      <HeroSection />

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
              Explora una selección de empresas cotizadas usando datos reales de
              Financial Modeling Prep.
            </p>
          </div>

          <Button
            as="a"
            href="https://financialmodelingprep.com"
            target="_blank"
            rel="noreferrer"
            gradientDuoTone="cyanToBlue"
          >
            Ver web oficial de la API
          </Button>
        </div>

        {loading && <LoadingState text="Cargando datos del mercado..." />}

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
  );
}

function HeroSection() {
  return (
    <section className="overflow-hidden rounded-4XL border border-slate-800 bg-linear-to-br from-slate-900 via-slate-950 to-cyan-950 p-8 shadow-2xl sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <Badge color="info" className="mb-5 w-fit">
            React · TailwindCSS · Flowbite
          </Badge>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">
            Panel financiero profesional construido con React.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Una aplicación frontend responsive que consume datos financieros
            reales y presenta información bursátil mediante una interfaz limpia
            y moderna.
          </p>

          <SearchBar />

        </div>

        <div className="rounded-3xl border border-cyan-400/20 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            RESUMEN DEL MERCADO
          </p>

          <div className="mt-6 space-y-4">
            <MetricCard label="API" value="FMP" />
            <MetricCard label="Framework" value="React" />
            <MetricCard label="UI" value="Flowbite" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-900 p-4">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-lg font-bold text-white">{value}</span>
    </div>
  );
}
