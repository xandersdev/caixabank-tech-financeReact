# CaixaBank Tech Finance React

Aplicación frontend desarrollada con **React**, **TailwindCSS** y **Flowbite React** que consume datos reales de la API *Financial Modeling Prep* para mostrar información financiera de acciones.

El proyecto forma parte del trabajo final de la microcredencial de desarrollo frontend y está construido por fases, siguiendo los requisitos del enunciado: listado inicial de datos, páginas de detalle, búsqueda, gestión de estado con Nanostore y despliegue en Netlify.

---

## Demo

**Aplicación desplegada en Netlify:**  
https://financialmodelapitest.netlify.app/

**Repositorio:**  
https://github.com/xandersdev/caixabank-tech-financeReact

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

## Requisitos

Este proyecto necesita **Node.js 20.19 o superior**.

**Durante el desarrollo se ha usado:**

```txt
Node.js 24.15.0
npm 10.4.0
```
---

## Configuración de variables de entorno

Este proyecto utiliza la API de Financial Modeling Prep, por lo que es necesario configurar una API key para que la aplicación pueda obtener los datos financieros. Para obtener una API key, es necesario crear una cuenta gratuita en:

**https://financialmodelingprep.com/**

Por seguridad, el archivo .env no está incluido en el repositorio ni en el ZIP de entrega. Cada persona que ejecute el proyecto debe crear su propio archivo .env en la raíz del proyecto.

- **Paso 1:** crear el archivo .env

En la raíz del proyecto, crea un archivo llamado:
```txt
.env
```
- **Paso 2:** añadir la API key

Dentro del archivo .env, añade la siguiente variable:
```txt
VITE_FMP_API_KEY=tu_api_key_de_financial_modeling_prep
```
Ejemplo: 
```txt
VITE_FMP_API_KEY=abc123456789
```
## Instalación y ejecución

- Clonar el repositorio:
```txt
git clone https://github.com/xandersdev/caixabank-tech-financeReact.git
```
- Entrar en el proyecto:
```txt
cd caixabank-tech-financeReact
```
- Instalar dependencias:
```txt
npm install
```
- Ejecutar en desarrollo:
```txt
npm run dev
```
- Generar build de producción:
```txt
npm run build
```

## Estructura del proyecto

```txt
src/
├── api/                    # Conexión con Financial Modeling Prep
│   └── fmp.js
├── components/             # Componentes reutilizables
│   ├── AppNavbar.jsx
│   ├── ErrorState.jsx
│   ├── LoadingState.jsx
│   ├── SearchBar.jsx
│   └── StockCard.jsx
├── pages/                  # Páginas principales de la aplicación
│   ├── HomePage.jsx
│   ├── SearchResultsPage.jsx
│   └── StockDetailsPage.jsx
├── stores/                  # Estado global con Nanostore
│   └── stocksStore.js
├── App.jsx                  # Rutas principales
├── index.css                # Punto de entrada de React
└── main.jsx                 # Estilos globales
