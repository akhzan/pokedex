import { useHistory } from 'react-router-dom'
import routes from './routes'

interface RouteState {
  goBack: () => void
  goToDetail: (id: string) => void
  goToHome: () => void
}

const useRoute = (): RouteState => {
  const history = useHistory()
  const goToHome = () => {
    history.push(routes.home)
  }
  const goToDetail = (id: string) => {
    history.push(routes.detail.replace(':id', id))
  }
  const goBack = () => {
    history.goBack()
  }
  return {
    goBack,
    goToDetail,
    goToHome,
  }
}

export default useRoute
