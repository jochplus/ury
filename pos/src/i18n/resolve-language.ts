import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './config';

/**
 * Resolves the active language using the following priority:
 * 1. frappe.boot.lang (Frappe site config / user preference)
 * 2. localStorage key 'ury_language'
 * 3. DEFAULT_LANGUAGE ('en')
 */
export function resolveLanguage(): string {
  // 1. Frappe boot object
  const frappeLang = supported((window as any)?.frappe?.boot?.lang);
  if (frappeLang) {
    return frappeLang;
  }

  // 2. Local storage override
  const storedLang = supported(localStorage.getItem('ury_language'));
  if (storedLang) {
    return storedLang;
  }

  return DEFAULT_LANGUAGE;
}

/**
 * The language itself, or its base when only the base is bundled:
 * Frappe users can be set to a regional code such as "pt-PT" or "pt-BR".
 */
function supported(lang: string | null | undefined): string | undefined {
  if (!lang) return undefined;
  if (SUPPORTED_LANGUAGES[lang]) return lang;
  const base = lang.split(/[-_]/)[0].toLowerCase();
  return SUPPORTED_LANGUAGES[base] ? base : undefined;
}
