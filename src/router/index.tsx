import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PUBLIC_URL } from 'config/env'
import Home from 'pages/Home'
import Detail from 'pages/Detail'
import routes from './routes'

const AppRouter = () => {
  return (
    <Router basename={PUBLIC_URL}>
      <Switch>
        <Route exact path={routes.home}>
          <Home />
        </Route>
        <Route exact path={routes.detail}>
          <Detail />
        </Route>
        <Route>Not Found</Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
