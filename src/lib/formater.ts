/**
 * @requires polyfill Intl.DateTimeFormat, Intl.DateTimeFormat.~timeZone.<locale>
 */

import { getLocale } from '::/entities/app'

function numberFormat(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(getLocale(), options).format(value)
}

function numberFormatToParts(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(getLocale(), options).formatToParts(value)
}

function percentFormat(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(getLocale(), {
    style: 'percent',
    ...options,
  }).format(value)
}

function currencyFormat(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: 'CNY',
    ...options,
  }).format(value)
}

function currencyFormatToParts(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: 'CNY',
    ...options,
  }).formatToParts(value)
}

const dateOptions: Intl.DateTimeFormatOptions = {
  dateStyle: 'short',
}

function dateFormat(value: Date, options: Intl.DateTimeFormatOptions = dateOptions) {
  return new Intl.DateTimeFormat(getLocale(), options).format(value)
}

function dateFormatToParts(value: Date, options: Intl.DateTimeFormatOptions = dateOptions) {
  return new Intl.DateTimeFormat(getLocale(), options).formatToParts(value)
}

function dateRangeFormat(value: [Date, Date], options: Intl.DateTimeFormatOptions = dateOptions) {
  return new Intl.DateTimeFormat(getLocale(), options).formatRange(value[0], value[1])
}

function dateRangeFormatToParts(value: [Date, Date], options: Intl.DateTimeFormatOptions = dateOptions) {
  return new Intl.DateTimeFormat(getLocale(), options).formatRangeToParts(value[0], value[1])
}

const timeOptions: Intl.DateTimeFormatOptions = {
  hour12: false,
  timeStyle: 'medium',
}

function dateTimeFormat(value: Date, options: Intl.DateTimeFormatOptions = { ...dateOptions, ...timeOptions }) {
  return new Intl.DateTimeFormat(getLocale(), options).format(value)
}

function dateTimeFormatToParts(value: Date, options: Intl.DateTimeFormatOptions = { ...dateOptions, ...timeOptions }) {
  return new Intl.DateTimeFormat(getLocale(), options).formatToParts(value)
}

function dateTimeFormatRange(value: [Date, Date], options: Intl.DateTimeFormatOptions = { ...dateOptions, ...timeOptions }) {
  return new Intl.DateTimeFormat(getLocale(), options).formatRange(value[0], value[1])
}

function dateTimeRangeFormatToParts(value: [Date, Date], options: Intl.DateTimeFormatOptions = { ...dateOptions, ...timeOptions }) {
  return new Intl.DateTimeFormat(getLocale(), options).formatRangeToParts(value[0], value[1])
}

function timeFormat(value: Date, options: Intl.DateTimeFormatOptions = timeOptions) {
  return new Intl.DateTimeFormat(getLocale(), options).format(value)
}

function timeFormatToParts(value: Date, options: Intl.DateTimeFormatOptions = timeOptions) {
  return new Intl.DateTimeFormat(getLocale(), options).formatToParts(value)
}

function relativeTimeFormat(value: number, unit: Intl.RelativeTimeFormatUnit = 'second', options?: Intl.RelativeTimeFormatOptions) {
  return new Intl.RelativeTimeFormat(getLocale(), {
    style: 'short',
    ...options,
  }).format(value, unit)
}

function relativeTimeFormatToParts(value: number, unit: Intl.RelativeTimeFormatUnit = 'second', options?: Intl.RelativeTimeFormatOptions) {
  return new Intl.RelativeTimeFormat(getLocale(), {
    style: 'short',
    ...options,
  }).formatToParts(value, unit)
}

export {
  numberFormat,
  numberFormatToParts,
  percentFormat,
  currencyFormat,
  currencyFormatToParts,
  dateFormat,
  dateFormatToParts,
  dateRangeFormat,
  dateRangeFormatToParts,
  dateTimeFormat,
  dateTimeFormatToParts,
  dateTimeFormatRange,
  dateTimeRangeFormatToParts,
  timeFormat,
  timeFormatToParts,
  relativeTimeFormat,
  relativeTimeFormatToParts,
}
