import express from 'express'
import * as data from '../../data/posts.json'

const router = express.Router()
const posts = data.posts

router.get( '/post/featured-post-title1', (request, response) => {
    
    // const post = posts.filter(post => post.title == 'Featured Post Title 1')
    const post = posts[posts.findIndex(post => post.title === 'Featured Post Title 1')]
    
    // console.log( post )

    response.locals = {
        title: 'featured post title1 | Paul Kazusek',
        post: post,
        content: 'featured-post-title1'
    }
    response.render( 'pages/post' )
})

module.exports = router