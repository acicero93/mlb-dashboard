import { ref } from 'vue'

const now = new Date().getUTCFullYear() + 1
const years = Array(now - (now - 20))
  .fill('')
  .map((_, idx) => now - idx)

export default function useYear() {
  const selected = ref(getYear() || years[0])

  function setYear(year) {
    window.sessionStorage.setItem('year', year)
  }

  function getYear() {
    return window.sessionStorage.getItem('year')
  }

  return {
    selected,
    years,
    setYear,
    getYear
  }
}
