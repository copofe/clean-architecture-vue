export type Language = NavigatorLanguage['language']

export type Token = string | null

export type Permission = string

export interface AppInfo {
  version: string
}

export interface AppSetting {
  enabled: boolean
}
