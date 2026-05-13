import {
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react"
import { Link } from "react-router"

export default function AppNavbar() {
    return (
        <Navbar fluid className="border-b border-slate-800 bg-slate-950/95">
            <NavbarBrand as={Link} to="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
                    Proyecto Frontend: Finanzas con React 
                </span>
            </NavbarBrand>

            <NavbarToggle />

            <NavbarCollapse>
                <NavbarLink as={Link} to="/" className="text-white">
                    Inicio
                </NavbarLink>

                <NavbarLink
                    href="https://github.com/xandersdev"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-white"
                    aria-label="Perfil de GitHub de xandersdev"
                >
                    <GithubIcon />

                    <span>
                        GitHub
                    </span>
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    )
}

function GithubIcon() {
    return (
        <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
        >
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.5v-1.75c-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.94c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9v2.81c0 .28.18.6.69.5A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
        </svg>
    )
}