export interface PokemonDetail {
  stats?: { name: string; value: number }[]
  evolutions?: Pokemon[]
  next?: Pokemon
  prev?: Pokemon
}

export default interface Pokemon {
  abilities: string[]
  detailPageURL: string
  weight: number
  weakness: string[]
  number: string
  height: number
  collectibles_slug: string
  featured: string
  slug: string
  name: string
  ThumbnailAltText: string
  ThumbnailImage: string
  id: number
  type: string[]
  detail?: PokemonDetail
}
