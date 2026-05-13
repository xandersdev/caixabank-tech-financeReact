const API_KEY = import.meta.env.VITE_FMP_API_KEY
const BASE_URL = "https://financialmodelingprep.com/stable"

async function request(endpoint) {
    const separator = endpoint.includes("?") ? "&" : "?"
    const url = `${BASE_URL}${endpoint}${separator}apikey=${API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Error fetching data from Financial Modeling Prep")
    }

    return response.json()
}

export function getPopularStocks() {
    return request(
        "/company-screener?exchange=NASDAQ&limit=12&isActivelyTrading=true"
    )
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