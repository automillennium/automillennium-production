export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ar'],
};

export function getLocale(request) {
  // You can implement more sophisticated locale detection here
  return i18n.defaultLocale;
}   