const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
  zh: () => import('./dictionaries/zh.json').then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();