const API_KEY = import.meta.env.VITE_FMP_API_KEY
const BASE_URL = "https://financialmodelingprep.com/stable"

async function request(endpoint) {
    if (!API_KEY) {
        throw new Error("Falta la API key de Financial Modeling Prep")
    }

    const separator = endpoint.includes("?") ? "&" : "?"
    const url = `${BASE_URL}${endpoint}${separator}apikey=${API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`La petición a la API ha fallado con estado ${response.status}`)
    }

    const data = await response.json()

    if (data?.Error || data?.error) {
        throw new Error(data.Error || data.error)
    }

    return data
}

export async function getPopularStocks() {
    const queries = ["AAPL", "MSFT", "TSLA", "NVDA", "AMZN", "META"]

    const responses = await Promise.all(
        queries.map((query) => request(`/search-symbol?query=${query}`))
    )

    return responses
        .map((results) => results[0])
        .filter(Boolean)
        .map((stock) => ({
            symbol: stock.symbol,
            companyName: stock.name,
            marketCap: null,
            sector: stock.exchangeFullName,
            industry: stock.exchangeFullName,
            exchange: stock.exchange,
            currency: stock.currency,
            price: null,
        }))
}

export function searchStocks(query) {
    return request(`/search-symbol?query=${encodeURIComponent(query)}`)
}

export function getStockQuote(symbol) {
    return request(`/quote?symbol=${encodeURIComponent(symbol)}`)
}

export function getCompanyProfile(symbol) {
    return request(`/profile?symbol=${encodeURIComponent(symbol)}`)
}