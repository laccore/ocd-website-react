import React, { useState } from 'react'
import clsx from 'clsx'

import { useStyles } from './app.styles'
import {Box, Typography } from '@material-ui/core/'

// ----------
// Parts:
// ----------
import { Toolbar } from '../parts/toolbar'
import { MemoMenuWebDrawer } from '../parts/menuWebDrawer'

// ----------
// Components:
// ----------
import Footer from '../layout/footer'
import Header from '../layout/header'
// import SearchHome from '../SearchHome'

// ----------
// Routing:
// ----------
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import { Router } from '@reach/router' //add navigate
// import { createBrowserHistory } from 'history'
// const customHistory = createBrowserHistory()

// ----------
// Contexts:
// ----------
import { Lost } from '../pages/lost'
import { ErrorsProvider } from '../contexts/errorsContext'
import { LoadingProvider } from '../contexts/loadingContext'

// ----------
// Functions:
// ----------
// ... 

export const App = ({env, pages, site}) => {

  const classes = useStyles()

  const [drawer, setDrawer] = useState({
    web: false
  })

  const toggleDrawer = (type, value) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawer({
      ...drawer,
      [type]: value
    })
  }

  return ( 
    <Router> 
      <ErrorsProvider>
      <LoadingProvider>
      <Box className={classes.root} flexDirection='column'>
        
        {/* ---- App Primary Toolbar ---- */}
        <Toolbar env={env} site={site} drawer={drawer} toggleDrawer={toggleDrawer} pages={pages} />
        
        {/* ---- App Drawers ---- */}
        <MemoMenuWebDrawer drawer={drawer} toggleDrawer={toggleDrawer} pages={pages} />
        
        <Box width='100%' className={clsx(classes.bodyBox)}> 
          
          <Box py={4} textAlign={'center'} width={'100%'} className={clsx(`bg-dark`, classes.appHeader)} >
            <Typography
              variant={'h3'}
              component={'h1'}
              fontWeight={'bold'}
              className={clsx(classes.appHeaderTypo)}
              >
              {env.appName}
            </Typography>
          </Box>

          <Box p={2} textAlign='center' bgcolor='black.full' color='white.main'>
            {/* ...header */}
          </Box>

          {/* ---- Pages ---- */}
          <Box p={0} my={2} className={clsx(`container-xl`, classes.pageBox)}>
            <Switch>
              
              { pages.map( page => 
                <Route 
                  key={page.name} 
                  env={env} 
                  path={`${page.path}`}  
                  render={(props) => 
                    <page.component {...props} {...classes} page={page} env={env} drawer={drawer} toggleDrawer={toggleDrawer} />
                  }
                />
              )}
              
              {/* <Redirect from='/' to='/home' /> */}
              <Route component={Lost} /> 
            </Switch>
          </Box>
          
          <Box p={2} textAlign='center' bgcolor='black.full' color='white.main'>
            {/* ...footer */}
          </Box>
        </Box>

      </Box>
        

      </LoadingProvider>
      </ErrorsProvider>
    </Router> 
  )
}

export default App 