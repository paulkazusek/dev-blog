import express from 'express'
const router = express.Router()

router.get( '/', ( request, response, next ) => {
    response.locals = {
        title: 'Welcome',
        message: 'welcome',
    }
    response.render( 'pages/index' )
})

module.exports = router