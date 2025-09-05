/// <reference types="vite/client" />

// Declare module for importing .tsx files directly
declare module '*.tsx' {
  import React from 'react';
  const Component: React.ComponentType<any>;
  export default Component;
}

// Declare module for importing .jsx files directly
declare module '*.jsx' {
  import React from 'react';
  const Component: React.ComponentType<any>;
  export default Component;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_BUILD_SOURCEMAP: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
