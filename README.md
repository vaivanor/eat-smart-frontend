# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Restaurant Reservation System – EatSmart

EatSmart Frontend is a React application built with Vite. EatSmart system allows users to browse restaurants, make reservations, and manage their profiles. This project works together with the [EatSmart backend API](https://github.com/vaivanor/eat-smart-backend) (Node.js + MongoDB).

### Versions

- React – `19.1.1`
- Vite – `7.1.14`
- Node.js – `v22.18.0`
- pnpm – `10.14.0`

### Getting Started

1. Download and set up the backend – [EatSmart backend API](https://github.com/vaivanor/eat-smart-backend)
   Follow the instructions in the backend README.md to:

   - Install dependencies
   - Configure .env
   - Start the backend server

2. Download and set up the frontend
   - Install dependencies:
   ```bash
   pnpm i
   ```
   - Start the project:
   ```bash
   pnpm run dev
   ```
