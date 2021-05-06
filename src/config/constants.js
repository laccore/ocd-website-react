const constants = {

    // ENVIRONMENT VARIABLES
    ENV: (process.env.REACT_APP_ENV) ? process.env.REACT_APP_ENV : 'development',
    API: (process.env.REACT_APP_API) 
        ? process.env.REACT_APP_API 
        : 'const API = "https://graph.opencoredata.org/blazegraph/namespace/ocd/sparql',
        
    VERSION: (process.env.REACT_APP_VERSION) ? process.env.REACT_APP_VERSION : '1.0',
    SITENAME: (process.env.REACT_APP_SITENAME) ? process.env.REACT_APP_SITENAME : 'Open Core Data',
    DOMAIN: (process.env.REACT_APP_DOMAIN) ? process.env.REACT_APP_DOMAIN : '',
    SHORTNAME: (process.env.REACT_APP_SHORTNAME) ? process.env.REACT_APP_SHORTNAME : 'ocd',
}

export default constants