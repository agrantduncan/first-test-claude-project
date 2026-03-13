# LexCore — Legal Management Dashboard

A sleek, modern frontend prototype for an internal legal business application. Built as a demo-ready prototype with mock data, a dark/light theme toggle, and full CRUD interactions across 5 pages.

## Stack

- **React 18** + **Vite** — fast dev server, hot reload
- **Tailwind CSS** — utility-first styling with dark mode support
- **React Router** — client-side navigation
- **Recharts** — revenue and case status charts
- **Lucide React** — icons

## Pages

| Page | Features |
|---|---|
| **Dashboard** | KPI stat cards, revenue area chart, case status donut chart, recent cases, upcoming deadlines |
| **Cases** | Searchable/filterable table, New Case modal form, Import CSV, Export CSV |
| **Clients** | Client table with individual/corporate avatars, New Client modal, Import CSV, Export CSV |
| **Documents** | Document table with file-type icons, Upload Document modal, Export CSV |
| **Billing** | Revenue summary cards, time entries table, Log Time modal, status filter, Export CSV |

## Features

- **Dark / Light theme toggle** — persists via localStorage, no flash on load
- **CSV Import & Export** — on Cases and Clients pages
- **Modal forms** — add cases, clients, documents, and billing entries live
- **Search & filter** — on Cases, Clients, Documents, and Billing
- **Mock data** — 10 cases, 10 clients, 10 documents, 10 billing entries pre-loaded

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Planned Integration

This prototype runs standalone in Node. For production it is intended to be embedded in a **.NET Core** application — the React build output drops into `wwwroot` and is served as static files, with mock data replaced by ASP.NET Core Web API endpoints.
