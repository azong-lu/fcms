let BASE_URL = ''
let TIME_OUT = 233

if (import.meta.env.DEV) {
  BASE_URL = ''
  TIME_OUT = 233
}
if (import.meta.env.PROD) {
  BASE_URL = ''
  TIME_OUT = 233
}

export { BASE_URL, TIME_OUT }
