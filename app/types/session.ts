export type SameSiteOption = 'lax' | 'strict' | 'none' | boolean;

export  interface Cookie {
  name: string;
  options: CookieOptions;
  duration: number;
}
export interface CookieOptions {
  secure?: boolean;
  httpOnly?: boolean;
  path?: string;
  sameSite?: SameSiteOption;
}