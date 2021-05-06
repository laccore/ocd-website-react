import React from 'react'

// ---------------
// Pages - Icons: 
// ---------------
import { MainLogo } from '../assets/styles/custom-svgs'

// ---------------
// Filter - GIFs:
// ---------------
import OutsourceIconPNG from '../assets/icons/ocd-icon-outsource.png'
import AggregateIconPNG from '../assets/icons/ocd-icon-aggregate.png'
import CDFIconPNG from '../assets/icons/ocd-icon-cdf.png'

// ---------------
// Logos:
// ---------------
// import Logo from '../assets/logo/ocd-logo.png'
// import FullLogo from '../assets/logo/ocd-full-logo.png'
// import Favicon from '../assets/favicon/ocd-favicon.png'
// import Background from '../assets/images/ocd-website-header.jpg'

// ---------------
// Pages:
// ---------------
import { Home } from '../pages/home' 
import { About } from '../pages/about'

// ----------------
// Configuration:
// ----------------
import endpoints from './endpoints'
import C from './constants'
import config from './'
import { isEmpty } from '../functions/functions'

// ------------------
// Components:
// ------------------
const componentHome = (props) => <Home {...props }/>
const componentAbout = (props) => <About {...props }/>

const primaryParent = 1

export const SITE = { 
    logo: MainLogo,
    // favicon: Favicon,
    // fullLogo: FullLogo,
    // background: Background
}
    
export const PAGES = [
    { 
        name: "home",
        title: "Home",
        path:"/",
        parameters: "",
        parent: primaryParent,
        disabled: false,
        // icon: FilterIcon,
        component: componentHome,
    },
    { 
        name: "about",
        title: "About",
        path:"/about",
        parameters: "",
        parent: primaryParent,
        disabled: false,
        // icon: FilterIcon,
        component: componentAbout,
    }
]

export const FILTERS = [
    // { 
    //     name:"sampleCollection",
    //     authority:"sampleCollection",
    //     // avatar: samplingTechniquesAvatar, 
    //     title: "Collections",
    //     media: collectionPNG,
    //     bgColor: "eigth",
    //     color: "black",
    //     display: "filter", // 'initial' to single out 
    //     endpoint: endpoints.astro.vocabularies.collection,
    //     parent: "",
    //     children: "",
    //     schema: {
    //         sampleData: "sample.sampleCollection.collectionTypeCode"
    //     },
    //     order: 1,
    //     dispatch: C.SET_SAMPLE_COLLECTION,
    //     reset: C.RESET_SAMPLE_COLLECTION
    // }
]
