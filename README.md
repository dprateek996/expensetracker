# Perfume Gallery Monorepo Bootstrap

This repository provides a TypeScript-first monorepo that mirrors the client/server layout used in the `perfume-gallery` project. It is ready for local development with Node.js 20+, React + Vite on the client, and an Express API on the server.

## Project Structure

```
.
├── client/         # React + Vite single-page application
├── server/         # Express REST API written in TypeScript
├── package.json    # Workspace manager with shared scripts
├── tsconfig.base.json
├── .editorconfig
├── .prettierrc.json
└── .gitignore
```

### Client (`client/`)
- React 18 with Vite for development tooling and builds.
- TypeScript configuration extending the shared base config.
- ESLint and Prettier configured for consistent code style.
- Environment variable support via Vite.

### Server (`server/`)
- Express 4 with TypeScript, bundled via the TypeScript compiler.
- Nodemon-like workflow powered by `ts-node-dev`.
- Environment configuration powered by `dotenv` and validated helpers.

## Prerequisites

- **Node.js** 20 or newer
- **npm** 9 or newer (ships with Node 20)

## Getting Started

Run the following commands from the repository root:

```bash
# Install dependencies across all workspaces
npm run install:all

# Start the client and server in separate terminals
npm run dev:client
npm run dev:server
```

Alternatively you can manage each workspace individually:

```bash
cd client
npm install
npm run dev

cd ../server
npm install
npm run dev
```

## Environment Variables

Copy the `.env.example` file in each workspace and adjust the values for your local environment:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

### Client (`client/.env`)
- `VITE_API_BASE_URL` – Base URL for API requests (defaults to the local server).

### Server (`server/.env`)
- `DATABASE_URL` – Connection string for the primary database.
- `JWT_SECRET` – Secret used to sign and verify JSON Web Tokens.
- `PORT` – HTTP port for the API server (defaults to `3000`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run install:all` | Installs dependencies for every workspace. |
| `npm run build:all` | Runs the build command for the client and server sequentially. |
| `npm run lint:all` | Executes ESLint in each workspace. |
| `npm run format:all` | Applies Prettier formatting in each workspace. |
| `npm run dev:client` | Starts the client development server (Vite). |
| `npm run dev:server` | Starts the API server in watch mode with ts-node-dev. |

Each workspace also defines its own `build`, `dev`, `lint`, and `format` commands. Refer to `client/package.json` and `server/package.json` for the full list.

## Production Builds

To prepare production assets:

```bash
# Build both workspaces
npm run build:all

# Client output: client/dist
# Server output: server/dist
```

Deploy the contents of `client/dist` to your static hosting provider and run the compiled server output via `node server/dist/server.js`.

## Contributing

1. Create a branch for your change.
2. Install dependencies (`npm run install:all`).
3. Run the workspace `lint` and `build` scripts before opening a PR.
4. Include updates to documentation when adding new features or environment variables.

Happy hacking!
