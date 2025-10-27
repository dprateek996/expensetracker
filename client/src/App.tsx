import type { JSX } from 'react';
import './App.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

export function App(): JSX.Element {
  return (
    <main className="app-shell">
      <h1>Perfume Gallery Client</h1>
      <p>
        API Base URL: <code>{apiBaseUrl}</code>
      </p>
      <p>Edit <code>src/App.tsx</code> and save to get started.</p>
    </main>
  );
}

export default App;
