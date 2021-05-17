const C = require('./constants')
const { ENV, GRAPH, OCD, VERSION, DOMAIN, SITENAME, SHORTNAME } = C.default

module.exports = {
  development: {
    siteName: `${SITENAME}-${ENV}`,
    shortName: `${SHORTNAME}-${ENV}`,
    domain: `${DOMAIN}`,
    version: `${ENV}-${VERSION}`,
    graph: `${GRAPH}`,
    ocd: `${OCD}`
  }
}