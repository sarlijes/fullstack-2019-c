const config = require('./utils/config')
const app = require('./app')
const http = require('http')
const server = http.createServer(app)

// const logger = require('./utils/logger')

// server.listen(config.PORT, () => {
//   logger.info(`Server running on port configured in .env-file [PORT: ${config.PORT}]`)
//   console.log(`Server is running on [PORT: ${config.PORT}]`)
// })

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})