import { createSlice } from '@reduxjs/toolkit'

interface PokemonState {
  loading: boolean
}

const initialState: PokemonState = { loading: false }

const pokemonSlice = createSlice({
  name: 'POKEMON',
  initialState,
  reducers: {
    showLoading: (state) => ({ ...state, loading: true }),
    hideLoading: (state) => ({ ...state, loading: false }),
  },
})

export const { showLoading, hideLoading } = pokemonSlice.actions

export default pokemonSlice.reducer
