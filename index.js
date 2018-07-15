const Transport = require('winston-transport')

const postData = (options, data) => {
  return new Promise((resolve, reject) => {
    const lib = options.hostname.startsWith('https') ? require('https') : require('http')
    const request = lib.request(options, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`Request failed with status code ${response.statusCode}`))
      }
      const body = []
      response.on('data', chunk => body.push(chunk))
      response.on('end', () => resolve(body.join('')))
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
    if (!options.hostname) throw new Error('HttpStreamTransport: Missing hostname')
  }

  log (info, callback) {
    setImmediate(() => {
      this.emit('logged', info)
    })

    // posting data to endpoint
    // this.on('data', (chunk) => {
      postData(this.options, info)
        .then()
        .catch(error => new Error(error.message))
    // })

    callback()
  }
}
