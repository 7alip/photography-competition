import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'

import routes from './routes/routes.js'
import AppRoute from './routes/app-route'
import Layout from './components/layout'

const baseUrl = '/:locale(tr|en|nl)?'

function App() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Layout>
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
        </Layout>
      </Suspense>
    </Router>
  )
}

export default App
