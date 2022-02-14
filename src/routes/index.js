import express from 'express'
import * as data from '../data/posts.json'

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

router.get('/blog', (request, response, next) => {
    const page = request.query.page != undefined ? request.query.page : 1
    const limit = request.query.limit != undefined ? request.query.limit : 5
    const category = request.query.category
    const tags = request.query.tags != undefined ? request.query.tags.split(',').sort() : []

    let posts = data.posts

    if (category != undefined) {
        posts = posts.filter((post) => post.category === category)
    }

    if (Array.isArray(tags) && tags.length > 0) {
        let temp = []
        posts.forEach((post) => {
            let intersection = post.tags.filter((tag) => tags.includes(tag)).sort()
            if (
                tags.length === intersection.length &&
                tags.every((value, index) => value === intersection[index])
            ) {
                temp.push(post)
            }
        })
        posts = temp
    }

    const pagination = {}
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    if (startIndex > 0) {
        pagination.previous = {
            page: parseInt(page) - 1,
        }
    }

    if (endIndex < posts.length) {
        pagination.next = {
            page: parseInt(page) + 1,
        }
    }

    pagination.limit = limit
    pagination.currentPage = parseInt(page)
    pagination.pageCount = parseInt(Math.ceil(posts.length / limit))

    const shareArticles = posts.slice(startIndex, endIndex)

    console.log(shareArticles)

    response.locals = {
        title: 'Posts | Paul Kazusek',
        articles: shareArticles,
        pagination: pagination,
    }

    response.render('pages/blog')
})

module.exports = router