import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Box, Breadcrumbs, Link } from '@material-ui/core'

export const AppBreadcrumbs = (props) => {

    const {page, match} = props
    const handleClick = (event) => {
        event.preventDefault()
    }
    
    let current
    console.log(props)

    return (
        <>
            {console.log(props)}
            <Box p={2} bgcolor={'grey.300'} boxShadow={1}>
                <Breadcrumbs aria-label="breadcrumbs">
                    <Link color="inherit"  disabled onClick={handleClick}>
                        {page.title}
                    </Link>
                    {(match.params.id) ?
                        <Link color="inherit"  disabled onClick={handleClick}>
                            {match.params.id}
                        </Link>
                    : null }
                </Breadcrumbs>
            </Box>
        </>
    )
}

AppBreadcrumbs.propTypes = {

}

// export const memoAppBreadcrumbs = memo(AppBreadcrumbs)
