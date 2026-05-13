# CaixaBank Tech Finance React

Aplicación frontend desarrollada con *React*, *TailwindCSS* y *Flowbite React* que consume datos reales de la API *Financial Modeling Prep* para mostrar información financiera de acciones.

El proyecto forma parte del trabajo final de la microcredencial de desarrollo frontend y está construido por fases, siguiendo los requisitos del enunciado: listado inicial de datos, páginas de detalle, búsqueda, gestión de estado con Nanostore y despliegue en Netlify.

---

## Demo

**Aplicación desplegada en Netlify:**  
https://brilliant-daifuku-7e8348.netlify.app/

---

## Descripción del proyecto

CaixaBank Tech Finance React es un panel financiero responsive que permite explorar información bursátil usando datos reales de Financial Modeling Prep.

La aplicación incluye una página principal con acciones destacadas, una barra de búsqueda, una página de resultados y páginas de detalle para cada acción. Además, utiliza Nanostore para gestionar estado compartido, como los resultados de búsqueda y las acciones vistas recientemente.

---

## Funcionalidades principales

- Página principal con diseño profesional y responsive.
- Consumo de datos reales desde Financial Modeling Prep.
- Listado de acciones destacadas.
- Tarjetas de acciones clicables.
- Página de detalle para cada acción.
- Búsqueda de empresas o símbolos bursátiles.
- Página de resultados de búsqueda.
- Gestión de estado global con Nanostore.
- Acciones vistas recientemente.
- Estados de carga y error.
- Navegación con React Router.
- Despliegue preparado para Netlify.
- Diseño construido con TailwindCSS y Flowbite React.

---

## Tecnologías utilizadas

- React
- Vite
- TailwindCSS
- Flowbite React
- React Router
- Nanostore
- Financial Modeling Prep API
- Netlify
- Git y GitHub

---

## Estructura del proyecto

```txt
src/
├── api/
│   └── fmp.js
├── components/
│   ├── AppNavbar.jsx
│   ├── ErrorState.jsx
│   ├── LoadingState.jsx
│   ├── SearchBar.jsx
│   └── StockCard.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── SearchResultsPage.jsx
│   └── StockDetailsPage.jsx
├── stores/
│   └── stocksStore.js
├── App.jsx
├── index.css
└── main.jsx