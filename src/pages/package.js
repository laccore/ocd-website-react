import React, { useEffect, useState, useContext } from "react"
import clsx from 'clsx'

// ------------------------
// Material
// ------------------------
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Checkbox, Grid, FormControl, IconButton, InputLabel, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, Select, Typography, Chip } from '@material-ui/core/'
import { Alert } from '@material-ui/lab'
import GetAppIcon from '@material-ui/icons/GetApp'

// ------------------------
// Styles
// ------------------------
import { useStyles } from './home.styles.js'

// ------------------------
// Configuration
// ------------------------
import config from '../config'
import { arrayIsEmpty, checkFor, convertFromCamelCase, isObjEmpty } from '../functions/formatFunctions'
import { componentSearch } from '../functions/searchFunctions'
import { capitalize, isEmpty } from "lodash"

// ------------------------
// Context/hooks
// ------------------------
import { SearchContext } from '../contexts/searchContext'
import { FilterContext } from '../contexts/filterContext'
import useFetchAPI from '../hooks/useFetchAPI'

// ------------------------
// Parts/Components
// ------------------------
import { AppBreadcrumbs } from '../parts/appBreadcrumbs'

const dataTypes = ['project', 'dataset', 'file']

export const Package = (props) => {

    const classes = useStyles()
    const [checked, setChecked] = useState([]) // for one filter (array of...)
    const [expanded, setExpanded] = useState(0);

    const [searchState, searchDispatch] = useContext(SearchContext)
    const [filterState, filterDispatch] = useContext(FilterContext)

    const [fetchState, fetchData] = useFetchAPI()

    const { page, env, match } = props

    const [content, setContent] = useState({});

    const handleDownload = (content, url) => {
        var packageUrl = window.location.href;
        packageUrl = packageUrl.replace("/pkg/", "/id/csdco/pkg/") + ".zip";

        const downloadLink = document.createElement('a');
        downloadLink.href = packageUrl;
        downloadLink.download = content.name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    const handleFileDownload = (content) => {
        // console.log(content);

        const downloadLink = document.createElement('a');
        downloadLink.href = content.path;
        downloadLink.download = content.name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    useEffect(() => {
        if (!isEmpty(fetchState.data)) {
            setContent(fetchState.data)
        }
    }, [fetchState])

    useEffect(() => {

        (async () => {
            if (match.params.id && !isEmpty(match.params.id)) {

                let component = (page.path).split('/').filter(q => q != "")[0]
                let id = match.params.id
                let query = `${component}/${id}`

                const { url, body } = componentSearch(env.ocd, query)
                await fetchData(url, body)
                //   await fetchData(url, body)

            } else {
                setContent(null)
            }

        })()

    }, [])

    return (
        <>
            <AppBreadcrumbs {...props} name={content['name']} />
            <Box
                bgcolor={'inherit'}
                position={'relative'}
                p={0}
                boxShadow={2}
                borderRadius={4}
            // className={clsx(classes.boxSearchResults)}
            >
                {(content && !isObjEmpty(content)) ?
                    <>
                        <Box p={4} justifyContent={'center'} alignItems={'center'} bgcolor={'grey.200'}>
                            <Typography variant={'h5'} component={'h2'}>
                                {content['name']}
                            </Typography>
                            <Box py={1}>
                                <Typography variant={'body2'} component={'p'} style={{ lineHeight: '1.6' }}>
                                    {content['description']}
                                </Typography>
                            </Box>
                            <Box my={1}>
                                <Button
                                    color={'primary'}
                                    variant={'contained'}
                                    // download={content.name.value}
                                    // component={'a'}
                                    onClick={() => { handleDownload(content) }}
                                >
                                    Download All
                                </Button>

                            </Box>
                        </Box>

                        <Box >
                            <List component="ul" aria-label="download list">
                                {(!arrayIsEmpty(content.resources)) ?
                                    Object.entries(content.resources).map(([key, val]) => {
                                        // console.log(key, val)
                                        return (
                                            <ListItem
                                                key={`list-item-${val.name}`}
                                                divider
                                            // disableGutters
                                            // style={{ padding: '8px 16px' }}    
                                            >
                                                <Chip
                                                    variant={'outlined'}
                                                    color={'primary'}
                                                    label={val.mediatype}
                                                    style={{ margin: '8px 16px' }}
                                                >

                                                </Chip>
                                                <ListItemText primary={
                                                    val.description
                                                } />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="download"
                                                        color='primary'
                                                        size='medium'
                                                        download={val.path}
                                                        onClick={() => { handleFileDownload(val) }}
                                                    >
                                                        <GetAppIcon color={'primary'} />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )
                                    }) : null
                                }
                            </List>
                        </Box>
                    </>

                    :
                    <Alert severity={'error'}>
                        'No package available for this identifier.'
                    </Alert>
                }
            </Box>
        </>
    )
}

export default Package