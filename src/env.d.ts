/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly MAX_SHIGGIES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
