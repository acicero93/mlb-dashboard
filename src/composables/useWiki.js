import { ref } from 'vue'
import axios from 'axios'

const formatTitles = async (title) => {
  const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
    params: {
      origin: '*',
      action: 'opensearch',
      search: title,
      limit: '3',
      namespace: '0',
      format: 'json'
    }
  })
  return data[1]
}

export default function useWiki() {
  const isLoading = ref(false)
  const error = ref(null)

  const getWikiArticle = async (title) => {
    isLoading.value = true

    try {
      const formattedTitles = await formatTitles(title)
      if (!formattedTitles || !formattedTitles.length) {
        throw new Error('Page not found on Wikipedia.')
      }

      const { data: content, error } = await getWikiContent(formattedTitles)
      const {
        data: { items: images }
      } = await getWikiImages(content.title)

      if (error) throw error
      if (content) {
        return {
          content,
          images
        }
      }
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  async function getWikiContent(titles, index = 0) {
    return await axios
      .get(`https://en.wikipedia.org/api/rest_v1/page/summary/${titles[index]}`, {
        params: {
          origin: '*'
        }
      })
      .then((res) => {
        if (res.data.type === 'disambiguation') {
          return getWikiContent(titles, ++index)
        }
        return res
      })
  }

  async function getWikiImages(title) {
    return await axios.get(`https://en.wikipedia.org/api/rest_v1/page/media-list/${title}`, {
      params: {
        origin: '*'
      }
    })
  }

  return {
    getWikiArticle,
    error,
    isLoading
  }
}
