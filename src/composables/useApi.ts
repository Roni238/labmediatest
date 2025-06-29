import { ref } from 'vue'

interface RequestOptions<T = any> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: T
  headers?: Record<string, string>
}

interface ApiState<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  isSuccess: boolean
  status: number | null
}

export function useApi<T>() {
  const response = ref<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    status: null
  })

  const fetchData = async (url: string, options: RequestOptions = { method: 'GET' }) => {
    const config = { ...options }

    response.value = {
      ...response.value,
      isLoading: true,
      error: null,
      isSuccess: false
    }

    try {
      const fetchResponse = await fetch(url, {
        method: config.method,
        headers: config.headers || {},
        body: config.body ? JSON.stringify(config.body) : undefined,
      })

      if (!fetchResponse.ok) {
        throw new Error(`Ошибка: ${fetchResponse.status}`)
      }
      
      const responseData = await fetchResponse.json()

      response.value = {
        data: responseData || null,
        error: null,
        isLoading: false,
        isSuccess: fetchResponse.ok,
        status: fetchResponse.status
      }

      return response.value
    } catch (err) {
      response.value = {
        ...response.value,
        data: null,
        error: err instanceof Error ? err : new Error('Неизвестная ошибка'),
        isLoading: false,
        isSuccess: false
      }
      return response.value
    }
  }

  return {
    fetchData,
    response
  }
}