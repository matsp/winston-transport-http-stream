const URL = require('url')
const Transport = require('winston-transport')

const postData = (options, data) => {
  return new Promise((resolve, reject) => {
    const lib = options.protocol.startsWith('https') ? require('https') : require('http')
    const request = lib.request(options, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`Request failed with status code ${response.statusCode}`))
      }
    })
    request.on('error', error => reject(new Error(error.message)))
    request.write(JSON.stringify(data))
    request.end()
  })
}

module.exports = class HttpStreamTransport extends Transport {
  constructor (options = {}) {
    super(options)
    this.options = options
    if (!options.url) throw new Error('HttpStreamTransport: Missing URL')
    const parsedURL = URL.parse(options.url)
    this.options.hostname = parsedURL.hostname
    this.options.path = parsedURL.pathname
    this.options.protocol = parsedURL.protocol
    this.options.method = 'POST'
  }

  log (info, callback) {
    setImmediate(() => {
      this.emit('logged', info)
    })
    postData(this.options, info)
      .then(callback())
      .catch(error => console.error(`HttpTransportStream: ${error.message}`))
  }
}
