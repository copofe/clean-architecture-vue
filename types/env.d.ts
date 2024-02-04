/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_MOCK_ENABLE: string
  readonly VITE_MOCK_GLOBAL: string
  readonly VITE_MOCK_SERVER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
