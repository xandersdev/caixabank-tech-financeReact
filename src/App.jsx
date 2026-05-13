import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import AppNavbar from "./components/AppNavbar"

export default function App() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <AppNavbar />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </main>
        </div>
    )
}