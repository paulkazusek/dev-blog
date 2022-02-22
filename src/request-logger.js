import morgen from 'morgan';
import * as rfs from 'rotating-file-stream'
import path from 'path'
import { format } from 'date-fns'

const fileNameGenerator = ( time ) => {
    const name = 'access.log'
    if (!time) return name
    return `${format(time, 'yyyy-MM-dd')}-${name}`
}

const logDirectory = path.resolve( __dirname, '..', 'logs' )

const options = {
    interval: '1d',
    path: logDirectory,
}

// create a rotating write stream
const accessLogStream = rfs.createStream( fileNameGenerator, options )

const requestLogger = morgen('combined', {
    stream: accessLogStream
})

module.exports = requestLogger