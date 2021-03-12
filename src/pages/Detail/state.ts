import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDetail } from 'store/pokemon'
import { RootState } from 'store/root-reducer'

export const useDetailState = () => {
  const dispatch = useDispatch()
  const { id }: any = useParams()
  const { raw, rawSequence, loadingDetail } = useSelector(
    (state: RootState) => state.pokemon,
  )

  const pokemon = raw[id.toLowerCase()] || {}

  useEffect(() => {
    if (pokemon.name && id) {
      dispatch(fetchDetail(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.name, id])

  return {
    pokemon,
    loading: !rawSequence.length,
    loadingDetail,
  }
}
