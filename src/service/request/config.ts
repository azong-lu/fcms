let BASE_URL = ''
const TIME_OUT = 2000

if (import.meta.env.DEV) {
  BASE_URL = ''
}
if (import.meta.env.PROD) {
  BASE_URL = ''
}

export { BASE_URL, TIME_OUT }
