export {};
declare global {
  interface Fn<T = any> {
    (...arg: T[]): T;
  }

  type Nullable<T> = T | null;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>;

  type ComponentRef<T> = InstanceType<T>;

  type LocaleType = "zh-CN" | "en";

  type AxiosHeaders =
    | "application/json"
    | "application/x-www-form-urlencoded"
    | "multipart/form-data";

  type AxiosMethod = "get" | "post" | "delete" | "put" | "GET" | "POST" | "DELETE" | "PUT";

  type AxiosResponseType = "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";

  interface AxiosConfig {
    params?: any;
    data?: any;
    url?: string;
    method?: AxiosMethod;
    headersType?: string;
    responseType?: AxiosResponseType;
  }

  interface IResponse<T = any> {
    code: string;
    data: T extends any ? T : T & any;
  }

  interface PageParam {
    pageSize?: number;
    pageNo?: number;
  }

  interface Tree {
    id: number;
    name: string;
    children?: Tree[] | any[];
  }

  interface ViteEnv {
    VITE_USER_NODE_ENV: "development" | "production" | "test";
    VITE_GLOB_APP_TITLE: string;
    VITE_PORT: number;
    VITE_OPEN: boolean;
    VITE_REPORT: boolean;
    VITE_BUILD_COMPRESS: "gzip" | "brotli" | "gzip,brotli" | "none";
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_PWA: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_API_URL: string;
    VITE_PROXY: [string, string][];
  }
  /* Menu */
  declare namespace Menu {
    interface MenuOptions {
      path: string;
      name: string;
      component?: string | (() => Promise<unknown>);
      redirect?: string;
      meta: MetaProps;
      children?: MenuOptions[];
    }
    interface MetaProps {
      icon: string;
      title: string;
      activeMenu?: string;
      isLink?: string;
      isHide: boolean;
      isFull: boolean;
      isAffix: boolean;
      isKeepAlive: boolean;
    }
  }
  type ObjToKeyValArray<T> = {
    [K in keyof T]: [K, T[K]];
  }[keyof T];
}
/* Menu */
declare namespace Menu {
  interface MenuOptions {
    path: string;
    name: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: MetaProps;
    children?: MenuOptions[];
  }
  interface MetaProps {
    icon: string;
    title: string;
    activeMenu?: string;
    isLink?: string;
    isHide: boolean;
    isFull: boolean;
    isAffix: boolean;
    isKeepAlive: boolean;
  }
}

/* FileType */
declare namespace File {
  type ImageMimeType =
    | "image/apng"
    | "image/bmp"
    | "image/gif"
    | "image/jpeg"
    | "image/pjpeg"
    | "image/png"
    | "image/svg+xml"
    | "image/tiff"
    | "image/webp"
    | "image/x-icon";

  type ExcelMimeType =
    | "application/vnd.ms-excel"
    | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
}

/* Vite */
// declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
  VITE_USER_NODE_ENV: "development" | "production" | "test";
  VITE_GLOB_APP_TITLE: string;
  VITE_PORT: number;
  VITE_OPEN: boolean;
  VITE_REPORT: boolean;
  VITE_BUILD_COMPRESS: "gzip" | "brotli" | "gzip,brotli" | "none";
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_API_URL: string;
  VITE_PROXY: [string, string][];
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}

/* __APP_INFO__ */
// declare const __APP_INFO__: {
//   pkg: {
//     name: string;
//     version: string;
//     dependencies: Recordable<string>;
//     devDependencies: Recordable<string>;
//   };
//   lastBuildTime: string;
// };

/* Generic Tools */
type ObjToKeyValUnion<T> = {
  [K in keyof T]: { key: K; value: T[K] };
}[keyof T];

type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];
