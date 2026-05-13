import { Alert } from "flowbite-react"

export default function ErrorState({ message }) {
    return (
        <Alert color="failure" className="border border-red-900 bg-red-950/40">
            <span className="font-medium">Ha ocurrido un error.</span>{" "}
            {message}
        </Alert>
    )
}