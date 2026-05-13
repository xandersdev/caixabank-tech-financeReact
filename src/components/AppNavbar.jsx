import { Navbar, NavbarBrand } from "flowbite-react"
import { Link } from "react-router"

export default function AppNavbar() {
    return (
        <Navbar fluid className="border-b border-slate-800 bg-slate-950">
            <NavbarBrand as={Link} to="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
                    CaixaBank Tech Finance
                </span>
            </NavbarBrand>
        </Navbar>
    )
}