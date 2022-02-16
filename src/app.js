import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import path from 'path'

import indexRouter from './routes/index'
import postsRoute from './routes/posts';

const app = express()
app.set( 'port', 3000 )

app.use( expressLayouts )
app.set( 'views', path.join( __dirname, './views' ) )
app.set( 'layout', './layouts/layout' )
app.set( 'view engine', 'ejs' )

app.use( express.static( path.join( __dirname, '/public' ) ) )
app.use( '/css', express.static( path.join( __dirname, '../node_modules/bootstrap/dist/css' ) ) )
app.use( '/js', express.static( path.join( __dirname, '../node_modules/bootstrap/dist/js' ) ) )

app.use( '/', indexRouter )
app.use( '/', postsRoute )

app.listen( 3000, () => {
    console.log( 'Express server listening on port ' + app.get( 'port' ) )
})
