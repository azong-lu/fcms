const Tokenkey = 'local token'
const TokenPrefix = 'Bearer '

function hasToken() {
  return !!localStorage.getItem(Tokenkey)
}
function getToken() {
  return localStorage.getItem(Tokenkey)
}
function setToken(token: string) {
  localStorage.setItem(Tokenkey, token)
}

function removeToken() {
  localStorage.removeItem(TokenPrefix)
}

export { TokenPrefix, hasToken, getToken, setToken, removeToken }
