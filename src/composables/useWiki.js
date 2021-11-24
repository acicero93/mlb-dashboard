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

  const getWikiArticle = async (title) => {
    isLoading.value = true

    try {
      const formattedTitle = await formatTitle(title)
      const { data: content } = await getWikiContent(formattedTitle)
      const {
        data: { items: images }
      } = await getWikiImages(formattedTitle)
      console.log('content', content)
      console.log('images', images)
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

  async function getWikiContent(title) {
    return await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`, {
      params: {
        origin: '*'
      }
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
