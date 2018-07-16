# winston-transport-http-stream

[![npm](https://img.shields.io/npm/l/winston-transport-http-stream.svg)]()
[![npm](https://img.shields.io/npm/dt/winston-transport-http-stream.svg)](https://www.npmjs.com/package/winston-transport-http-stream)

[![npm version](https://badge.fury.io/js/winston-transport-http-stream.svg)](https://badge.fury.io/js/winston-transport-http-stream)
[![Build Status](https://travis-ci.org/matsp/winston-transport-http-stream.svg?branch=master)](https://travis-ci.org/matsp/winston-transport-http-stream) 
[![Greenkeeper badge](https://badges.greenkeeper.io/matsp/winston-transport-http-stream.svg)](https://greenkeeper.io/)

## Installation

```bash
npm install winston-transport-http-stream
```

or

```bash
yarn add winston-transport-http-stream
```

## Usage

### Example

The `options` object is directly passed to node's http library but you can add also the `url` property that
will be parsed and automatically set the relevant options for http.
You can see all options in the official docs [here](https://nodejs.org/api/http.html#http_http_request_options_callback).

```javascript
const winston = require('winston')
const HttpStreamTransport = require('winston-transport-http-stream')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new HttpStreamTransport({
      url: 'https://yourdomain.com/log'
    })
  ]
})

logger.info('hello')
```
