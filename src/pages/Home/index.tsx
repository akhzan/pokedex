import { useDispatch, useSelector } from 'react-redux'
import useRoute from 'router/useRoute'
import { hideLoading, showLoading } from 'store/pokemon'
import { RootState } from 'store/root-reducer'

const Home = () => {
  const dispatch = useDispatch()
  const { goToDetail } = useRoute()
  const { loading } = useSelector((state: RootState) => state.pokemon)
  return (
    <div>
      <header className="mt-4">Fresh</header>
      <button type="button" onClick={() => dispatch(showLoading())}>
        True
      </button>
      <button type="button" onClick={() => dispatch(hideLoading())}>
        False
      </button>
      <div>{loading.toString()}</div>
      <button
        className="mt-8"
        type="button"
        onClick={() => goToDetail('dummy')}
      >
        Go To Detail
      </button>
    </div>
  )
}

export default Home
