/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly MAX_SHIGGIES?: string;
  readonly CONVERTER: string;
  readonly REPORT_URL: string;

  readonly SHARED_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
