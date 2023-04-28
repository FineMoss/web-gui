import express from 'express'

const app = express()
const port = 8008

// serve the client site resources
app.use('/', express.static('client'))
app.use('/three', express.static('node_modules/three/build'))
app.use('/stats', express.static('node_modules/three/examples/jsm/libs'))
app.use('/controls', express.static('node_modules/three/examples/jsm/controls'))

// route client to index.html
app.get('/', (req, res) => {
//   res.send('Hello World!')
    res.sendFile('../client/index.html')
})

// start listening on port
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

// make a clean exit on ctl-C
process.on('SIGINT', function(){
    console.log('\n...gracefully killing server...\n')
    process.exit()
})