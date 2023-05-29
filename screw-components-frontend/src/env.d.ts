interface ImportMetaEnv {
    readonly VITE_ENV_FLAG: string;
    readonly VITE_API_HOST: string;
    readonly VITE_CDN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
