import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Pokemon, { PokemonDetail } from 'models/Pokemon'
import { AppThunk } from 'store'
import pokemons from 'assets/data/pokemons.json'
import { POKEMON_ITEMS_PER_FETCH, SORTS } from 'config/constants'
import { getPokemonDetailApi } from 'api/pokemon'

interface Filter {
  search: string
  type?: string
  weakness?: string
  sort?: string
}

interface PokemonState {
  filter: Filter
  listData: { data: string[]; count: number }
  listDataView: string[]
  loading: boolean
  loadingDetail: boolean
  raw: { [key: string]: Pokemon }
  rawSequence: string[]
}

const initialState: PokemonState = {
  filter: { search: '' },
  listData: { data: [], count: 0 },
  listDataView: [],
  loading: false,
  loadingDetail: false,
  raw: {},
  rawSequence: [],
}

const pokemonSlice = createSlice({
  name: 'POKEMON',
  initialState,
  reducers: {
    getListStart: (state) => ({ ...state, loading: true }),
    getListSuccess: (state, { payload }: PayloadAction<PokemonState>) => ({
      ...state,
      ...payload,
      loading: false,
    }),
    getListFailed: (state) => ({ ...state, loading: false }),
    getListMoreSuccess: (state, { payload }: PayloadAction<Array<string>>) => ({
      ...state,
      listDataView: payload,
      loading: false,
    }),
    setFilter: (state, { payload }: PayloadAction<Filter>) => ({
      ...state,
      filter: {
        ...state.filter,
        ...payload,
      },
    }),
    getDetailStart: (state) => ({ ...state, loadingDetail: true }),
    getDetailFailed: (state) => ({ ...state, loadingDetail: false }),
    getDetailSuccess: (state, { payload }: PayloadAction<Pokemon>) => ({
      ...state,
      raw: {
        ...state.raw,
        [payload.name.toLowerCase()]: payload,
      },
      loadingDetail: false,
    }),
  },
})

export const {
  getListStart,
  getListSuccess,
  getListFailed,
  getListMoreSuccess,
  setFilter,
  getDetailStart,
  getDetailSuccess,
  getDetailFailed,
} = pokemonSlice.actions

export default pokemonSlice.reducer

export const fetchList = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(getListStart())
    const { pokemon } = getState()
    let { raw, rawSequence } = pokemon
    if (!rawSequence.length) {
      rawSequence = pokemons.map((pkmon) => {
        raw = {
          ...raw,
          [pkmon.name.toLowerCase()]: pkmon,
        }
        return pkmon.name
      })
      rawSequence = [...new Set(rawSequence)]
    }
    const dataSliced = rawSequence.slice(0, POKEMON_ITEMS_PER_FETCH)
    const payload: PokemonState = {
      ...pokemon,
      listData: { data: rawSequence, count: rawSequence.length },
      listDataView: dataSliced,
      raw,
      rawSequence,
    }
    dispatch(getListSuccess(payload))
  } catch (err) {
    dispatch(getListFailed())
  }
}

export const fetchMoreList = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(getListStart())
    const { pokemon } = getState()
    const { listData, listDataView } = pokemon
    const dataSliced = listData.data.slice(
      0,
      listDataView.length + POKEMON_ITEMS_PER_FETCH,
    )
    dispatch(getListMoreSuccess(dataSliced))
  } catch (err) {
    dispatch(getListFailed())
  }
}

export const fetchListFiltered = (filterParam: Filter): AppThunk => async (
  dispatch,
  getState,
) => {
  try {
    const { pokemon } = getState()
    const { raw, rawSequence, filter } = pokemon
    dispatch(getListStart())
    const { search, sort, type, weakness } = { ...filter, ...filterParam }
    const dataFiltered = rawSequence.filter((pokemonName) => {
      const pkmon = raw[pokemonName.toLowerCase()]
      const pkmonWeakness = (pkmon.weakness || []).map((w) => w.toLowerCase())
      return (
        pokemonName.toLowerCase().includes(search.toLowerCase()) &&
        (!type || (type && (pkmon.type || []).includes(type.toLowerCase()))) &&
        (!weakness ||
          (weakness && pkmonWeakness.includes(weakness.toLowerCase())))
      )
    })
    if (sort === SORTS.nameAsc.code) {
      dataFiltered.sort()
    } else if (sort === SORTS.nameDsc.code) {
      dataFiltered.sort((a, b) => (b > a ? 1 : -1))
    } else if (sort === SORTS.numberDsc.code) {
      dataFiltered.sort((a, b) => {
        const pokemonA = raw[a.toLowerCase()]
        const pokemonB = raw[b.toLowerCase()]
        return pokemonB.number > pokemonA.number ? 1 : -1
      })
    }
    const dataSliced = dataFiltered.slice(0, POKEMON_ITEMS_PER_FETCH)
    const payload: PokemonState = {
      ...pokemon,
      listData: { data: dataFiltered, count: dataFiltered.length },
      listDataView: dataSliced,
    }
    dispatch(getListSuccess(payload))
  } catch (err) {
    dispatch(getListFailed())
  }
}

export const fetchDetail = (pokemonName: string): AppThunk => async (
  dispatch,
  getState,
) => {
  try {
    const { pokemon } = getState()
    const { raw, rawSequence } = pokemon
    const pokemonData = raw[pokemonName.toLowerCase()] || {}
    if (pokemonData.detail) return
    dispatch(getDetailStart())
    const detail: PokemonDetail = await getPokemonDetailApi(pokemonName)
      .then((res) => {
        return {
          stats: res.stats.map((stat: any) => ({
            name: stat?.stat?.name || '',
            value: stat?.base_stat || 0,
          })),
        }
      })
      .catch(() => ({ stats: [] }))
    rawSequence.map((seq) => {
      const pokemonSeq = raw[seq.toLowerCase()] || {}
      if (pokemonSeq.id === pokemonData.id - 1) {
        detail.prev = pokemonSeq
      } else if (pokemonSeq.id === pokemonData.id + 1) {
        detail.next = pokemonSeq
      }
      return seq
    })
    dispatch(getDetailSuccess({ ...pokemonData, detail }))
  } catch (err) {
    dispatch(getDetailFailed())
  }
}
