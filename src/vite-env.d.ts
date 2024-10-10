// / <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MAPBOX_ACCESS_TOKEN: string;
    readonly VITE_OPENWEATHERMAP_APP_ID: string;
    // Add more environment variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  