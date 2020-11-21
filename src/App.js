import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import routes from './routes/routes.js'
import AppRoute from './routes/app-route'
import Layout from './components/layout'
import Loader from './components/loader.js'

const baseUrl = '/:locale(tr|en|nl)?'

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Switch>
            {routes.map(({ path, isPrivate, component, exact }) => (
              <AppRoute
                exact={exact}
                key={path}
                path={baseUrl + path}
                component={component}
                isPrivate={isPrivate}
              />
            ))}
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App
