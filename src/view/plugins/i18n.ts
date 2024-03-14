import type { Locale } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { ZodIssueCode, ZodParsedType, z } from 'zod'
import { appRepo } from '::/repositories/app'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  messages,
})

function jsonStringifyReplacer(_: string, value: unknown): unknown {
  if (typeof value === 'bigint')
    return value.toString()

  return value
}

function joinValues<T extends unknown[]>(
  array: T,
  separator = ' | ',
): string {
  return array
    .map(val => (typeof val === 'string' ? `'${val}'` : val))
    .join(separator)
}

const key = 'Error'
interface i18nOptions {
  [key: string]: unknown
}

const customErrorMap: z.ZodErrorMap = (issue) => {
  const { t, te, d } = i18n.global

  let message: string = ''
  let options: i18nOptions = {}

  const translateLabel = (message: string, options: i18nOptions) => {
    if (te(`${key}.${message}WithPath`))
      return t(`${key}.${message}WithPath`, options)

    if (te(`${key}.${message}`))
      return t(`${key}.${message}`, options)

    if (te(message))
      return t(message, options)

    return message
  }

  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = 'invalid_type_received_undefined'
      }
      else {
        message = 'invalid_type'
        options = {
          expected: te(`${key}.types.${issue.expected}`)
            ? t(`${key}.types.${issue.expected}`)
            : issue.expected,
          received: te(`${key}.types.${issue.received}`)
            ? t(`${key}.types.${issue.received}`)
            : issue.received,
        }
      }
      break
    case ZodIssueCode.invalid_literal:
      message = 'invalid_literal'
      options = {
        expected: JSON.stringify(
          issue.expected,
          jsonStringifyReplacer,
        ),
      }
      break
    case ZodIssueCode.unrecognized_keys:
      message = 'unrecognized_keys'
      options = {
        keys: joinValues(issue.keys, ', '),
      }
      break
    case ZodIssueCode.invalid_union:
      message = 'invalid_union'
      break
    case ZodIssueCode.invalid_union_discriminator:
      message = 'invalid_union_discriminator'
      options = {
        options: joinValues(issue.options),
      }
      break
    case ZodIssueCode.invalid_enum_value:
      message = 'invalid_enum_value'
      options = {
        options: joinValues(issue.options),
        received: issue.received,
      }
      break
    case ZodIssueCode.invalid_arguments:
      message = 'invalid_arguments'
      break
    case ZodIssueCode.invalid_return_type:
      message = 'invalid_returnType'
      break
    case ZodIssueCode.invalid_date:
      message = 'invalid_date'
      break
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === 'object') {
        if ('startsWith' in issue.validation) {
          message = `invalid_string.startsWith`
          options = {
            startsWith: issue.validation.startsWith,
          }
        }
        else if ('endsWith' in issue.validation) {
          message = `invalid_string.endsWith`
          options = {
            endsWith: issue.validation.endsWith,
          }
        }
      }
      else {
        message = `invalid_string.${issue.validation}`
        options = {
          validation: t(`validations.${issue.validation}`),
        }
      }
      break
    case ZodIssueCode.too_small:
      message = `too_small.${issue.type}.${
        issue.exact
          ? 'exact'
          : issue.inclusive
          ? 'inclusive'
          : 'notInclusive'
      }`
      options = {
        minimum:
          issue.type === 'date'
            ? d(new Date(issue.minimum as string | number))
            : issue.minimum,
      }

      break
    case ZodIssueCode.too_big:
      message = `too_big.${issue.type}.${
        issue.exact
          ? 'exact'
          : issue.inclusive
          ? 'inclusive'
          : 'notInclusive'
      }`
      options = {
        maximum:
          issue.type === 'date'
            ? d(new Date(issue.maximum as string | number))
            : issue.maximum,
      }
      break
    case ZodIssueCode.custom:
      message = 'custom'
      if (issue.params?.i18n) {
        if (typeof issue.params.i18n === 'string') {
          message = issue.params.i18n
          break
        }
        if (
          typeof issue.params.i18n === 'object'
          && issue.params.i18n?.key
        ) {
          message = issue.params.i18n.key
          if (issue.params.i18n?.options)
            options = issue.params.i18n.options
        }
      }
      break
    case ZodIssueCode.invalid_intersection_types:
      message = 'invalid_intersection_types'
      break
    case ZodIssueCode.not_multiple_of:
      message = 'not_multiple_of'
      options = {
        multipleOf: issue.multipleOf,
      }
      break
    case ZodIssueCode.not_finite:
      message = 'not_finite'
      break
  }
  options.path = issue.path.join('.') || ''
  message = translateLabel(message, options)

  return { message }
}

z.setErrorMap(customErrorMap)

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../../locales/*.yml'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.yml$/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const loadedLanguages: string[] = []

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
  appRepo.updateAcceptLanguage(lang)
  return lang
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  if (i18n.global.locale.value === lang)
    return setI18nLanguage(lang)

  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang)

  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)

  return setI18nLanguage(lang)
}

export default i18n
