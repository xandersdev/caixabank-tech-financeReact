import { Badge, Card } from "flowbite-react";
import { Link } from "react-router";

function formatCurrency(value) {
  if (!value) {
    return "No disponible";
  }

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatLargeNumber(value) {
  if (!value) {
    return "No disponible";
  }

  return new Intl.NumberFormat("es-ES", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function StockCard({ stock }) {
  return (
    <Link
      to={`/stock/${stock.symbol}`}
      className="block h-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
      aria-label={`Ver detalles de ${stock.companyName || stock.symbol}`}
    >
      <Card className="group h-full cursor-pointer border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <Badge color="info" className="mb-3 w-fit">
                  {stock.symbol}
                </Badge>

                <h3 className="line-clamp-2 text-xl font-bold text-white transition group-hover:text-cyan-300">
                  {stock.companyName || "Empresa desconocida"}
                </h3>
              </div>

              <div className="rounded-2xl bg-cyan-500/10 px-3 py-2 text-right">
                <p className="text-xs text-cyan-300">Divisa</p>

                <p className="font-bold text-white">
                  {stock.currency || "No disponible"}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400">
              {stock.sector || "Datos de mercado"}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-slate-950/70 p-3">
                <p className="text-xs text-slate-500">Precio</p>

                <p className="mt-1 font-semibold text-white">
                  {formatCurrency(stock.price)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950/70 p-3">
                <p className="text-xs text-slate-500">Bolsa</p>

                <p className="mt-1 font-semibold text-white">
                  {stock.exchange || "No disponible"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-800 pt-4">
            <p className="text-xs text-slate-500">
              Capitalización: {formatLargeNumber(stock.marketCap)}
            </p>

            <p className="shrink-0 text-sm font-semibold text-cyan-400 transition group-hover:text-cyan-300">
              Ver detalles →
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
