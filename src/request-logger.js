import morgan from 'morgan'
import * as rfs from 'rotating-file-stream'
import path from 'path'
import { format } from 'date-fns'

const fileNameGenerator = ( name, time ) => {
    // const name = 'access.log'
    if (!time) return name
    return `${format(time, 'yyyy-MM-dd')}-${name}`
}

const logDirectory = path.resolve( __dirname, '..', 'logs' )

const accessLogStream = rfs.createStream( fileNameGenerator( 'access.log' ), {
    interval: '1d',
    path:  path.resolve( logDirectory, './access' ),
})

const errorLogStream = rfs.createStream( fileNameGenerator( 'error.log' ), {
    interval: '1d',
    path:  path.resolve( logDirectory, './error' ),
})

morgan.token( 'body', ( request ) => JSON.stringify( request.body ) )
morgan.token( 'error', ( request, response ) => request.error )

const customErrorFormat  = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" ":response-time ms" :status :res[content-length] ":referrer" ":user-agent" "error :error"'
const customAccessFormat  = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" ":response-time ms" :status :res[content-length] ":referrer" ":user-agent"'

//error logging
const errorLogger = morgan( customErrorFormat, {
    skip: ( request, response ) => ( response.statusCode < 400 ),
    stream: errorLogStream
})

//success logging
const accessLogger = morgan( customAccessFormat, {
    stream: accessLogStream
})

module.exports = { accessLogger, errorLogger }