import { ref } from 'vue'

export default function useYear() {
  const currentYear = new Date().getUTCFullYear()
  const nextYear = currentYear + 1
  const years = Array(nextYear - (nextYear - 20))
    .fill('')
    .map((_, idx) => nextYear - idx)
  const selected = ref(getYear() || years[0])

  function setYear(year) {
    window.sessionStorage.setItem('year', year)
  }

  function getYear() {
    return window.sessionStorage.getItem('year')
  }

  return {
    selected,
    currentYear,
    years,
    setYear,
    getYear
  }
}
