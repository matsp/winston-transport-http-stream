const HttpStreamTransport = require('../index.js')

test('class should export log fn', () => {
  const instance = new HttpStreamTransport({
    url: 'http://127.0.0.1/log'
  })
  expect(instance).toHaveProperty('log')
})
