import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PUBLIC_URL } from 'config/env'
import Home from 'pages/home'
import Detail from 'pages/detail'
import Compare from 'pages/compare'
import NotFound from 'pages/not-found'
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
        <Route exact path={routes.compare}>
          <Compare />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
