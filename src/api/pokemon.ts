import { call } from './axios'
import { METHODS } from './methods'

export const getPokemonDetailApi = async (pokemonName: string) => {
  const response = await call(
    METHODS.GET,
    `pokemon/${pokemonName.toLowerCase()}`,
  )
  return response.data
}
