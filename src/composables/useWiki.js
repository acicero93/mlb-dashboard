import { ref } from 'vue'
import axios from 'axios'

const formatTitle = async (title) => {
  const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
    params: {
      origin: '*',
      action: 'opensearch',
      search: title,
      limit: '1',
      namespace: '0',
      format: 'json'
    }
  })
  return data[1][0]
}

export default function useWiki() {
  const isLoading = ref(false)
  const error = ref(null)

  const getWikiData = async (title) => {
    isLoading.value = true

    try {
      const formattedTitle = await formatTitle(title)
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          origin: '*',
          action: 'query',
          formatversion: 2,
          prop: 'pageimages|pageterms|extracts',
          titles: formattedTitle,
          pithumbsize: 600,
          exintro: true,
          explaintext: true,
          format: 'json'
        }
      })
      // if (error) throw error;
      if (data?.query?.pages?.length) {
        return data.query.pages[0]
      }
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    getWikiData,
    error,
    isLoading
  }
}
