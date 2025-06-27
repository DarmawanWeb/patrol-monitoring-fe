export interface CookieOptions {
  days?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  const {
    days = 7,
    path = "/",
    domain,
    secure = true,
    sameSite = "Strict",
  } = options;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  let cookieString = `${name}=${encodeURIComponent(
    value
  )};expires=${expires.toUTCString()};path=${path}`;

  if (domain) {
    cookieString += `;domain=${domain}`;
  }

  if (secure) {
    cookieString += ";Secure";
  }

  cookieString += `;SameSite=${sameSite}`;
  document.cookie = cookieString;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }
  return null;
};

export const deleteCookie = (
  name: string,
  path: string = "/",
  domain?: string
): void => {
  let cookieString = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`;

  if (domain) {
    cookieString += `;domain=${domain}`;
  }

  document.cookie = cookieString;
};

export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};

export const getAllCookies = (): Record<string, string> => {
  const cookies: Record<string, string> = {};
  const cookieArray = document.cookie.split(";");

  cookieArray.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });

  return cookies;
};

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
} as const;

export const setAccessToken = (token: string): void => {
  setCookie(COOKIE_NAMES.ACCESS_TOKEN, token, {
    days: 1 / 24, // 1 hour
    secure: true,
    sameSite: "Strict",
  });
};

export const setRefreshToken = (token: string): void => {
  setCookie(COOKIE_NAMES.REFRESH_TOKEN, token, {
    days: 30, // 30 days
    secure: true,
    sameSite: "Strict",
  });
};

export const getAccessToken = (): string | null => {
  return getCookie(COOKIE_NAMES.ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
  return getCookie(COOKIE_NAMES.REFRESH_TOKEN);
};

export const getUserData = (): any | null => {
  const userData = getCookie(COOKIE_NAMES.USER_DATA);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data from cookie:", error);
      return null;
    }
  }
  return null;
};

export const setAuthData = (
  accessToken: string,
  refreshToken: string
): void => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

export const clearAuthData = (): void => {
  deleteCookie(COOKIE_NAMES.ACCESS_TOKEN);
  deleteCookie(COOKIE_NAMES.REFRESH_TOKEN);
  deleteCookie(COOKIE_NAMES.USER_DATA);
};

export const isAuthenticated = (): boolean => {
  return hasCookie(COOKIE_NAMES.ACCESS_TOKEN);
};

export const getAuthHeader = (): string | null => {
  const token = getAccessToken();
  return token ? `Bearer ${token}` : null;
};
