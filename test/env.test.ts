import {env} from "../src/env";

describe('Test env', () => {
  it('Expect "FREE_MOBILE_API_USER" env var to be string', () => {
    expect(typeof env.FREE_MOBILE_API_USER === "string").toBe(true)
  })

  it('Expect "FREE_MOBILE_API_PASSWORD" env var to be string', () => {
    expect(typeof env.FREE_MOBILE_API_PASSWORD === "string").toBe(true)
  })

  it('Expect "FREE_MOBILE_API_USER" env var value to be "test"', () => {
    expect(env.FREE_MOBILE_API_USER === "test").toBe(true)
  })

  it('Expect "FREE_MOBILE_API_PASSWORD" env var value to be "test"', () => {
    expect(env.FREE_MOBILE_API_PASSWORD === "test").toBe(true)
  })
})