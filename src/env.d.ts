/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly MAX_SHIGGIES?: string;
  readonly CONVERTER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
