export interface ProductResponse {
  data: ProductMain[]
  meta: Meta
}

export interface ProductMain {
  id: number
  attributes: Product
}

export interface Product {
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  description?: string
  brand: string
  price: string
  type: string
  color: string
  Slug: string
  Stock:number
  title: string
  image: Image
}

export interface Image {
  data: Data
}

export interface Data {
  id: number
  attributes: Attributes2
}

export interface Attributes2 {
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
}

export interface Formats {
  thumbnail: Thumbnail
}

export interface Thumbnail {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface ProductDetailResponse {
  data: ProductMain
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export async function getProduct() {
  const { locale } = useI18n()
  const pagesize = 50
  const res = await useApi<ProductResponse>(`/products?&pagination[pageSize]=${pagesize}`, {
    method: 'GET',
    params: {
      populate: '*',
      locale: locale.value,

    },
  })
  return res
}

