import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import { RootState } from 'store/root-reducer'
import { useEffect, useState } from 'react'
import { fetchDetail } from 'store/pokemon'
import routes from 'router/routes'
import { capitalize } from 'lodash'

export const useCompareState = () => {
  const dispatch = useDispatch()
  const [win, setWin] = useState({ first: false, second: false })

  const history = useHistory()
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const { raw, rawSequence } = useSelector((state: RootState) => state.pokemon)
  const first = raw[(query.get('first') || '').toLowerCase()] || {}
  const second = raw[(query.get('second') || '').toLowerCase()] || {}

  useEffect(() => {
    if (first.name && !first.detail) dispatch(fetchDetail(first.name))
    if (second.name && !second.detail) dispatch(fetchDetail(second.name))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first.name, second.name])

  const calculateWin = () => {
    const typeSlice = (first.type || []).filter((t) =>
      (second.weakness || []).includes(capitalize(t)),
    )
    const weaknessSlice = (first.weakness || []).filter((t) =>
      (second.type || []).includes(t.toLowerCase()),
    )
    const typeSuperior = (typeSlice.length - weaknessSlice.length) * 0.5
    const firstStats = (first.detail?.stats || []).reduce(
      (prev, curr) => prev + curr.value,
      0,
    )
    const secondStats = (second.detail?.stats || []).reduce(
      (prev, curr) => prev + curr.value,
      0,
    )
    const avgStats = (firstStats + secondStats) / 2
    const statsSuperior =
      firstStats === 0 || secondStats === 0
        ? 0
        : (firstStats - secondStats) / avgStats
    const winner = typeSuperior + statsSuperior >= 0 ? 'first' : 'second'
    setWin({ ...win, [winner]: true })
  }

  useEffect(() => {
    if (first.detail && second.detail) {
      calculateWin()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first.detail, second.detail])

  const resetWin = () => {
    setWin({ first: false, second: false })
  }

  const addPokemonToCompare = (type: string, value: string) => {
    const params: any = {
      first: first.name,
      second: second.name,
      [type]: value,
    }
    if (!params.first) delete params.first
    if (!params.second) delete params.second
    const queryParams = Object.keys(params)
      .map((key: string) => `${key}=${params[key]}`)
      .join('&')
    resetWin()
    history.push(`${routes.compare}${queryParams ? `?${queryParams}` : ''}`)
  }

  return {
    first,
    second,
    addPokemonToCompare,
    loading: !rawSequence.length,
    win,
  }
}
