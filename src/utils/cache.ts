class Cache {
  setItem(key: string, value: any) {
    const val = JSON.stringify(value)
    localStorage.setItem(key, val)
  }
  getItem(key: string) {
    const val = localStorage.getItem(key)
    if (val) {
      try {
        return JSON.parse(val)
      } catch (error) {
        return false
      }
    }
  }
  removeItem(key: string) {
    localStorage.removeItem(key)
  }
  clear() {
    localStorage.clear()
  }
}

export default new Cache()
