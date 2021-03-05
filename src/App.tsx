import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from 'store/pokemon'
import { RootState } from 'store/root-reducer'

const App = () => {
  const dispatch = useDispatch()
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
    </div>
  )
}

export default App
