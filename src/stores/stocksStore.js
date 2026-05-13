import { atom } from "nanostores"
import { searchStocks } from "../api/fmp"

export const $searchQuery = atom("")
export const $searchResults = atom([])
export const $searchLoading = atom(false)
export const $searchError = atom("")
export const $recentStocks = atom([])

export async function searchStocksByQuery(query) {
    const cleanQuery = query.trim()

    if (!cleanQuery) {
        $searchQuery.set("")
        $searchResults.set([])
        $searchError.set("")
        return
    }

    try {
        $searchQuery.set(cleanQuery)
        $searchLoading.set(true)
        $searchError.set("")

        const data = await searchStocks(cleanQuery)

        if (!Array.isArray(data)) {
            console.error("Respuesta inesperada de la API:", data)
            throw new Error("La API no ha devuelto una lista de resultados.")
        }

        const formattedResults = data.slice(0, 12).map((stock) => ({
            symbol: stock.symbol,
            companyName: stock.name,
            marketCap: null,
            sector: stock.exchangeFullName,
            industry: stock.exchangeFullName,
            exchange: stock.exchange,
            currency: stock.currency,
            price: null,
        }))

        $searchResults.set(formattedResults)
    } catch (error) {
        console.error(error)
        $searchResults.set([])
        $searchError.set(
            error.message || "No se pudieron cargar los resultados de búsqueda. Inténtalo de nuevo más tarde."
        )
    } finally {
        $searchLoading.set(false)
    }
}

export function addRecentStock(stock) {
    if (!stock?.symbol) {
        return
    }

    const currentStocks = $recentStocks.get()

    const filteredStocks = currentStocks.filter(
        (item) => item.symbol !== stock.symbol
    )

    const newStock = {
        symbol: stock.symbol,
        companyName: stock.companyName || stock.name || stock.symbol,
    }

    $recentStocks.set([newStock, ...filteredStocks].slice(0, 5))
}