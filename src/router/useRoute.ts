import { useHistory } from 'react-router-dom'
import routes from './routes'

interface RouteState {
  goBack: () => void
  goToDetail: (id: string) => void
  goToHome: () => void
  goToCompare: (first?: string) => void
}

const useRoute = (): RouteState => {
  const history = useHistory()
  const goToHome = () => {
    history.push(routes.home)
  }
  const goToDetail = (id: string) => {
    history.push(routes.detail.replace(':id', id.toLowerCase()))
  }
  const goToCompare = (first?: string) => {
    history.push(`${routes.compare}${first ? `?first=${first}` : ''}`)
  }
  const goBack = () => {
    history.goBack()
  }
  return {
    goBack,
    goToDetail,
    goToHome,
    goToCompare,
  }
}

export default useRoute
