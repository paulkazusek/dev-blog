import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import path from 'path'

import indexRouter from './routes/index'

const app = express()
app.set( 'port', 3000 )

app.use( expressLayouts )
app.set( 'views', path.join( __dirname, './views' ) )
app.set( 'layout', './layouts/layout' )
app.set( 'view engine', 'ejs' )

app.use( '/', indexRouter )

app.listen( 3000, () => {
    console.log( 'Express server listening on port ' + app.get( 'port' ) )
})
