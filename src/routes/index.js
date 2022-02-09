import express from 'express'
const router = express.Router()

router.get( '/', ( request, response, next ) => {
    response.locals = {
        title: 'Paul Kazusek'
    }
    response.render( 'pages/index' )
})

router.get( '/me', ( request, response, next ) => {
    response.locals = {
        title: 'About me | Paul Kazusek'
    }
    response.render( 'pages/about' )
})

router.get( '/blog', ( request, response, next ) => {
    response.locals = {
        title: 'Articles | Paul Kazusek'
    }
    response.render( 'pages/blog' )
})

module.exports = router