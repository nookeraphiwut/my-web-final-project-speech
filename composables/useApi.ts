import { type UseFetchOptions, useFetch, useLazyFetch } from 'nuxt/app'
import type { NitroFetchRequest } from 'nitropack'

export function useApi<T>(
  request: NitroFetchRequest,
  opts?:
    | UseFetchOptions<
        T extends void ? unknown : T,
        (res: T extends void ? unknown : T) => T extends void ? unknown : T
      >
    | undefined,
  lazy = false,
) {
  const config = useRuntimeConfig()
  const myFetch = lazy ? useLazyFetch : useFetch
  const fetch = myFetch<T>(request, {
    ...(opts as any),
    onRequest: ({ options }) => {
      options.baseURL = `http://localhost:1337/api`

    },
  })
  return fetch
}
