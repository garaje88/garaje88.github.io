/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly PUBLIC_OPENAI_API_KEY: string;
    readonly PUBLIC_OPENAI_API_BASE_URL: string;
    readonly PUBLIC_OPENAI_API_ORGANIZATION: string;
    readonly PUBLIC_OPENAI_API_MODEL: string;
    readonly PUBLIC_FLAGSMITH_BASE_URL: string;
    readonly PUBLIC_FLAGSMITH_API_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }