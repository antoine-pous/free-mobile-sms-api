import {cleanEnv, str} from "envalid";

export interface Env {
  readonly FREE_MOBILE_API_USER: string
  readonly FREE_MOBILE_API_PASSWORD: string
}

export const env: Readonly<Env> = cleanEnv(process.env, {
  FREE_MOBILE_API_USER: str()
  , FREE_MOBILE_API_PASSWORD: str()
})