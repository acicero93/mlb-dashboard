import { ref } from 'vue'

export default function useYear() {
  const currentYear = new Date().getUTCFullYear()
  const years = Array(currentYear - (currentYear - 20))
    .fill('')
    .map((_, idx) => currentYear - idx)
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
