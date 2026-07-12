/**
 * Docs-site i18n surface.
 * Package-level i18n provider/config live in the library; this folder only
 * hosts the docs chrome locale cookie + dictionary helpers.
 */
export { dict, t, categoryLabel, type DictShape } from "./dict";
export {
  LOCALE_COOKIE,
  DEFAULT_LOCALE,
  normalizeLocale,
  type Locale,
} from "./locale";
export { getServerLocale } from "./get-server-locale";
