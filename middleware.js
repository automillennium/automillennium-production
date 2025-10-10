import { NextResponse } from 'next/server';
import { i18n } from './src/lib/i18n';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request) {
  // Get accepted languages from browser
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect to appropriate locale if missing
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // For root path, redirect to locale
    if (pathname === '/') {
      return NextResponse.redirect(
        new URL(`/${locale}`, request.url)
      );
    }

    // For other paths without locale, add locale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};