import React from 'react'
import { render } from 'react-dom'

// ---------------
// CSS:
// ---------------
import 'bootstrap/dist/css/bootstrap.min.css'
// import './assets/styles/custom.scss'

// ---------------
// Material UI:
// ---------------
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './assets/styles/theme'

// ---------------
// Config:
// --------------- 
import config from './config'
import C from './config/constants'
import { PAGES, SITE } from './config/routes'

// --------------- 
// Components
// --------------- 
import App from './components/app'

// --------------- 
// Context/Hooks
// --------------- 
import { SearchProvider } from './contexts/searchContext'

render(
    <SearchProvider>
    <ThemeProvider theme={theme}>
        <CssBaseline />      
        
        <App env={config[C.ENV]} pages={PAGES} site={SITE} />
    </ThemeProvider>
    </SearchProvider>,
    document.querySelector('#root')
)
