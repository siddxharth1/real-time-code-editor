/// <reference types="vite/client" />

// Optional: strong typing for your env vars
interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // add additional VITE_ vars here as you create them
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
