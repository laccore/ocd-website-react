import React, { useContext, useEffect, useState } from 'react'

// -------------------
// Material
// -------------------
import { Avatar, Chip, Box, Button, Divider, Fade, Link, List, ListItem, ListItemIcon, ListItemText, Modal, Typography } from '@material-ui/core/'
import { Alert } from '@material-ui/lab'

import AssignmentIcon from '@material-ui/icons/Assignment'
import DataUsageIcon from '@material-ui/icons/DataUsage'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'

// -------------------
// Styles
// -------------------
import { useStyles } from './appSearchResults.styles'


// -------------------
// Functions
// -------------------
import { isEmpty } from 'lodash'
// import { isEmpty } from 'lodash'
import { uniqueInArray, countOccurances, arrayIsEmpty } from '../functions/formatFunctions' 

// -------------------
// Context/hooks
// -------------------
import { SearchContext } from '../contexts/searchContext'
import { FilterContext } from '../contexts/filterContext'


export function AppSearchResults({checked=[], setChecked}) {

    const classes = useStyles()

    const [ searchState, searchDispatch ] = useContext(SearchContext)
    const [ filterState, filterDispatch ] = useContext(FilterContext)

    const [ results, setResults ] = useState()
    const [ filtered, setFiltered ] = useState()
    const [ open, setOpen ] = useState(false)
    const [ chosen, setChosen ] = useState(0)

    const handleOpen = (item) => {
        setOpen(true)

        let sNth = (results[item].s.value).split('/')
        let id = sNth.pop()
        let component = sNth.pop()
        
        let link = {
            "href": `/${component}/${id}`
        }
        results[item].link = link

        console.log(results[item])
        setChosen(item)
    }
    const handleClose = () => {
        setOpen(false)
        setChosen(0)
    }

    const assignFilters = (currentResults) => {
        let allDataTypes = currentResults.map(result => {
            // For DataType Filter: 
            let nth = (result.type.value).lastIndexOf('/')
            let current = (result.type.value).substring(nth + 1)
            return current
        })

        // let uniqueOptions = uniqueInArray(allDataTypes)
        let occurances = countOccurances(allDataTypes)

        console.log(allDataTypes, occurances)
        filterDispatch({ type: 'SET_FILTER_DATATYPE', dataType: occurances })
    }

    useEffect(() => {
        if(searchState.results){
            // console.log(searchState.results)
            setResults(searchState.results)
            setFiltered(searchState.results)
            
            assignFilters(searchState.results)
        }                    
    }, [searchState.results])


    useEffect(() => {
        
        
        // (async () => {
            if(results && results.length > 0){
                if(!arrayIsEmpty(checked)){
                    console.log(checked)
                    
                    let filteredResults = []
                    checked.map( item => {
                        let currentChecked = results.filter( result => ((result.type.value).toLowerCase()).includes((item.toLowerCase())) ) 
                        if(currentChecked && currentChecked.length > 0){
                            filteredResults.push(...currentChecked)
                        }
                    })
                    setFiltered(filteredResults)
                }
            } 
        // })()

    }, [checked])

    
    // const options = choices.filter(choice => input === '' || (choice.name).includes(input))


    return (
        // <Box className={classes.simpleListBox} py={4}>
        <>
            { (filtered) ? 
                (Array.isArray(filtered) && filtered.length !== 0) ?
                    <>
                        <List classes={{ root: classes.list}}>
                
                            { (filtered).map((listItem, i) => 
                                <ListItem key={`listItem-${i}`} className={ classes.listItem } button onClick={() => handleOpen(i)}>
                                     {/* component={ Link } to="/about" */}
                                    <ListItemIcon>
                                        { (((listItem.type.value).toLowerCase()).includes('researchproject')) ? <LibraryBooksIcon color={'primary'} /> : null }
                                        { (((listItem.type.value).toLowerCase()).includes('dataset')) ? <DataUsageIcon color={'primary'}/> : null }
                                        { (((listItem.type.value).toLowerCase()).includes('digitaldocument')) ? <AssignmentIcon color={'primary'} /> : null }
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={`${listItem.name.value}`} 
                                        secondary={`${(listItem.description.value).slice(0,60)}...`}
                                    />
                                </ListItem>
                            )}
                        
                        </List> 
                        <Box p={0} bgcolor={'grey.200'} display={'flex'}>
                            <Box p={2}>
                                <Typography variant="subtitle2" component="h6" gutterBottom>
                                    Total results: {results.length}
                                </Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem />
                            <Box p={2}>
                                <Typography variant="subtitle2" component="h6" gutterBottom>
                                    Showing: {filtered.length}
                                </Typography>
                            </Box>
                        </Box>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            classes={classes.modal}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <Fade in={open}>
                                <div className={classes.paperModal}>
                                    <div id="score">
                                        <Chip 
                                            variant="outlined" 
                                            color="primary" 
                                            label={ results[chosen].score.value } 
                                            avatar={<Avatar>S</Avatar>}
                                        />
                                    </div>
                                    <br/>
                                    <div id="name">
                                        <Typography className={classes.title} color="primary" gutterBottom variant="h5" component="h4">
                                            { results[chosen].name.value }
                                        </Typography>
                                    </div>
                                    <hr/>
                                    <div id="description">
                                        <Typography variant="subtitle2" component="h6">
                                            { results[chosen].description.value }
                                        </Typography>
                                    </div>
                                    <hr/>
                                    <div id="lit">
                                        <Typography variant="body1" component="p">
                                            { results[chosen].name.value }
                                        </Typography>
                                    </div>
                                    <br/>
                                    <div id="uri">
                                        { (results[chosen].link) ? 
                                            <Button 
                                                type={'link'} 
                                                fullWidth 
                                                href={ (results[chosen].link.href) ? results[chosen].link.href: '' } 
                                                variant="contained" 
                                                size="large"
                                                color="primary">
                                                {/* { results[chosen].s.type } */}
                                                More Info
                                            </Button>
                                        : null }
                                    </div>
                                    
                                </div>
                            </Fade>
                        </Modal>
                    </>
                    : 
                    <Box p={2}>
                        <Alert variant="outlined" severity="warning">
                        No results! Please filter your search again.
                        </Alert>
                    </Box>
                : null
            }

        </>
    )
}

export default AppSearchResults

