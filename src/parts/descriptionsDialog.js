import React from 'react'
import PropTypes from 'prop-types'

// ------------------------
// Material
// ------------------------
import {  Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Table, Typography } from '@material-ui/core/'

import descriptionData from "../assets/data/researchProjectDescriptions.json"

import DataGrid, {
    Column, 
    ColumnFixing,
    SearchPanel,
    Export
} from 'devextreme-react/data-grid'


const DescriptionsDialog = ({open, setOpen}) => {
    
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            maxWidth={'xl'}
            // fullScreen
            onClose={handleClose}
            aria-labelledby="dataset-descriptons-title"
            aria-describedby="dataset-descriptons-description"
        >
            <DialogTitle id="dataset-descriptons-title">
                {`Dataset Descriptions`}
            </DialogTitle>
            <DialogContent>
            
                <DataGrid
                    dataSource={descriptionData}
                    // defaultColumns={boreholeColumns}
                    allowColumnReordering={true}
                    showBorders={true}
                >
                    <Column caption="URI" dataField="uri" dataType="string" width={180}/>
                    <Column caption="Aviable Now" dataField="available" dataType="string" width={80} />
                    <Column caption="skospreflabel" dataField="skospreflabel" dataType="string" width={220}/>
                    <Column caption="OCD UI Short Names" dataField="OCD_short_names" dataType="string" width={220} />
                    <Column caption="Description" dataField="description" dataType="string" minWidth={280} />
                    
                    <Export 
                        enabled={true} 
                        // allowExportSelectedData={true} 
                    />

                    <SearchPanel 
                        visible={true}
                        width={240}
                        placeholder="Search..." />
                    
                </DataGrid>

            </DialogContent>
            
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

DescriptionsDialog.propTypes = {

}

export default DescriptionsDialog

