import React, { useState, memo } from 'react'
import clsx from 'clsx'

import {Box, Typography, IconButton } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

import MenuIcon from '@material-ui/icons/Menu'

import PropTypes from 'prop-types'


const useStyles = makeStyles(theme => ({
    
  }))


export const Toolbar = ({env, site, pages}) => {

    const classes = useStyles()

    const [drawer, setDrawer] = useState()
    
    const toggleDrawer = (type, value) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setDrawer(value)
    }

    return (
        <Toolbar className={classes.toolbar}> 
          
            {console.log(env, site, pages)}
            {/* ---- Brand ---- */}
            <Box p={2} className={''} justifyContent='left'>
                
            </Box>
            
            {/* ---- Primary Navigation ---- */}
            <Box className={classes.menubar} alignContent='center' flexGrow={1}  justifyContent='center'>
                
            
            </Box>

            {/* ---- Primary Navigation Menu Toggle ---- */}
            <Box className={classes.toolbarIcon}>
            <IconButton
                onClick={(drawer === false) ? toggleDrawer(true) : toggleDrawer(false) }
                edge='start'
                color='inherit'
                className={classes.iconButton}
                aria-label='open drawer'>
                <MenuIcon/>
            </IconButton>
            </Box>
          
      </Toolbar>
    
    )
}

Toolbar.propTypes = {

}

export const MemoToolbar = memo(Toolbar) 