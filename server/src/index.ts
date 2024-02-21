import app from './app'

const PORT = 3001
const PLATFORM = process.platform

app.listen(PORT, () => {
    console.log('Server ready')
    console.log('Port:', PORT)
    console.log('Platform:', PLATFORM)
})