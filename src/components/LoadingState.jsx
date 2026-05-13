import { Spinner } from "flowbite-react"

export default function LoadingState({ text = "Cargando datos..." }) {
    return (
        <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
            <Spinner size="xl" />
            <p className="text-sm text-slate-400">{text}</p>
        </div>
    )
}