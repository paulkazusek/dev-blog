import express from 'express'
const router = express.Router()

router.get( '/featured-post-title1', ( request, response ) => {
    response.locals = {
        title: 'featured post title1 | Paul Kazusek',
        content: 'featured-post-title1'
    }
    response.render( 'pages/post' )
})

module.exports = router