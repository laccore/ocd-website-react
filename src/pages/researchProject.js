import React, {useEffect, useState, useContext } from "react"
import clsx from 'clsx'

import { MapContainer, TileLayer, Marker, tooltip } from "react-leaflet"
import { LatLngExpression } from "leaflet";


// ------------------------
// Material
// ------------------------
import {  Accordion, AccordionSummary, AccordionDetails, Box, Chip, Checkbox, Divider, Grid, FormControl, InputLabel, InputBase, List, ListItem, ListItemIcon, ListItemText, Select, Typography } from '@material-ui/core/'
import { Alert } from '@material-ui/lab'

// ------------------------
// Styles
// ------------------------
import { useStyles } from './res.styles.js'

// ------------------------
// Configuration
// ------------------------
import config from '../config'
import { checkFor, convertFromCamelCase } from '../functions/formatFunctions'
import { componentSearch } from '../functions/searchFunctions'
import { capitalize, isEmpty } from "lodash"
import { researchProjectSearch } from '../queries/searchQueries'

// ------------------------
// Context/Hooks
// ------------------------
import { SearchContext } from '../contexts/searchContext'
import { FilterContext } from '../contexts/filterContext'
import useFetchAPI from '../hooks/useFetchAPI'

// ------------------------
// Parts/Components
// ------------------------
import { AppSearchResults } from '../parts/appSearchResults'
import { AppBreadcrumbs } from '../parts/appBreadcrumbs'


export const ResearchProject = (props) => {
    
    const classes = useStyles()
    const [checked, setChecked] = useState([]) // for one filter (array of...)
    const [expanded, setExpanded] = useState(0);

    const [ searchState, searchDispatch ] = useContext(SearchContext)
    const [ filterState, filterDispatch ] = useContext(FilterContext)

    const [ fetchState, fetchData ] = useFetchAPI()
    
    const { page, env, match } = props
       
    const [ content, setContent ] = useState({});
  
    const defaultPosition: LatLngExpression = [48.864716, 2.349]; // Paris position

    useEffect(() => {
        if(!isEmpty(fetchState.data)){
            setContent(fetchState.data)
        }
    }, [fetchState])
    
    useEffect(() => {
        
        (async () => {
            if(match.params.id && !isEmpty(match.params.id)){
                
                let component = (page.path).split('/').filter(q => q != "")[0]
                let id = match.params.id
                let query = `${component}/${id}`

              const {url, body} = componentSearch(env.ocd, query)
              console.log(url, body)
              await fetchData(url, body)
            //   await fetchData(url, body)

            } else {
                setContent(null)
            }
        
        })()
    
    }, [])

    return(
        <>        
            <AppBreadcrumbs {...props} />
            <Box 
                bgcolor={'inherit'} 
                position={'relative'}
                p={0} 
                boxShadow={2} 
                borderRadius={4} 
                // className={clsx(classes.boxSearchResults)}
            >   
                { (content) ? 
                    <>
                        <Box p={4} justifyContent={'center'} alignItems={'center'} bgcolor={'grey.200'}>
                            <Typography variant={'h5'} component={'h2'}>
                                {content['name']}
                            </Typography>
                            <Box my={2}>
                                <Chip label={content['csdco:expedition']}  variant={'outlined'} />
                            </Box>
                            <Box p={0}>
                                <Typography variant={'body2'} component={'p'} style={{ lineHeight: '1.6' }}>
                                    {content['csdco:abstract']}
                                </Typography>
                            </Box>
                        </Box>
                        <Grid container>
                            <Grid xs={12} sm={6} item>

                            <MapContainer
                                className={classes.leafletContainer}
                                center={defaultPosition}
                                zoom={13}
                            >
                                {/* {places.map((place: Place) => ( */}
                                    {/* <Marker
                                        key={'test-place'}
                                        position={[content.location.geo[0]['https://schema.org/latitude'], content.location.geo[0]['https://schema.org/longitude']]} 
                                        eventHandlers={{ click: () => showPreview(place) }}
                                    >  */}
                                        {/* show place's title on hover the marker */}
                                        {/* <Tooltip>{place.title}</Tooltip>  */}
                                    {/* </Marker> */}
                                {/* ))} */}

                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </MapContainer>


                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <List component="ul" aria-label="main mailbox folders">
                                    { Object.entries(content).map(([key,val]) => {
                                        let desired = ['csdco:discipline','csdco:investigators','csdco:repository','csdco:lab','csdco:funding','csdco:status', 'csdco:outreach','csdco:startdate','csdco:technique','csdco:keywords','csdco:license']
                                        if(desired.includes(key) && !isEmpty(val)){

                                            return(
                                                <ListItem 
                                                    key={`list-item-${key}`} 
                                                    divider 
                                                    disableGutters
                                                    style={{ padding: '8px 16px' }}    
                                                >
                                                    <ListItemIcon 
                                                        title={`${key.replace('csdco:','')}`}
                                                        color={'secondary'}
                                                        
                                                        >
                                                        {capitalize((key.replace('csdco','')).slice(1,2))}
                                                    </ListItemIcon>
                                                    <ListItemText primary={
                                                        val
                                                    } />
                                                </ListItem>
                                            )
                                        }
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                    </>
                    
                : null }
            </Box>
        </>
    )
}
  
  export default ResearchProject