const C = require('./constants')
const { ENV, API, VERSION, DOMAIN, SITENAME, SHORTNAME } = C.default

module.exports = {
  development: {
    siteName: `${SITENAME}-${ENV}`,
    shortName: `${SHORTNAME}-${ENV}`,
    domain: `${DOMAIN}`,
    version: `${ENV}-${VERSION}`,
    api: `${API}`
  }
}