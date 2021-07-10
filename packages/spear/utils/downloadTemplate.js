const download = require('download')
const { GITHUB } = require('../scripts/constants')

function normalizeURL(repo) {
  return `https://${GITHUB.host}/${repo}/archive/refs/heads/master.zip`
}

function downloadTemplate(repo, callback) {
  const url = normalizeURL(repo)

  download(url, { extract: true }).then(data => {
    callback(null, data)
  }).catch(err => {
    callback(err)
  })
}

module.exports = downloadTemplate
