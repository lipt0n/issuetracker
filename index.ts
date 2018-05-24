import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import mongodb from 'mongodb'
import { promisify } from 'util'
import cors from 'cors'
import morgan from 'morgan'
import bcrypt from 'bcrypt'
import next from 'next'
import { parse } from 'url'
import getRoutes from './routes'
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 9000
const static_dir = path.resolve('./static')
const app = express()
export default app
let db: mongodb.Db
interface User {
    username: string
    _id: string
}

const nextapp = next({ dir: '.', dev })
const handle = nextapp.getRequestHandler()
const routes = getRoutes()
nextapp.prepare().then(() => {
    const app = express()

    app.use(
        cors({
            origin: ['*'],
            methods: ['GET', 'POST'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
        })
    )

    app.use(morgan('common'))
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(
        expressSession({
            secret: '3649db42b5c25f90e79c96b9bb2454daae172731',
            resave: true,
            saveUninitialized: true,
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())

    const dbname = process.env.MONGODB_URI?process.env.MONGODB_URI.split('/').slice(-1)[0]:'issuetracker'
    const mongo_url: string = process.env.MONGODB_URI
        ? process.env.MONGODB_URI
        : 'mongodb://localhost:27017'
    // @ts-ignore
    const MongoClientOptions: mongodb.MongoClientOptions = { useNewUrlParser: true }
    const mongo = mongodb.MongoClient.connect(mongo_url, MongoClientOptions)
    mongo.then((client: mongodb.MongoClient) => {
        db = client.db(dbname)
        console.log('MONGODB connected')
        db.createCollection('users', (err, res) => {})
        db.createCollection('issues', (err, res) => {})
        for (const un of [1,2,3,4]){
        const u = db.collection('users').findOne({ username: 'user'+un })
        u.then(r => {
            if (!r) {
                // create test user
                bcrypt.hash('password', 10).then((hash: string) => {
                    db.collection('users').insert({
                        username: 'user'+un,
                        password: hash,
                    })
                })
            }
        })
        }

        passport.use(
            new LocalStrategy(async (username: string, password: string, done: any) => {
                const user = await db.collection('users').findOne({ username: username })
                if (!user) return done(null, false, { message: 'Incorrect username or password.' })
                const compared = bcrypt.compare(password, user.password)
                compared
                    .then(isPasswordCorrect => {
                        if (isPasswordCorrect)
                            return done(null, {
                                username: user.username,
                                _id: user._id,
                            })
                        else
                            return done(null, false, { message: 'Incorrect username or password.' })
                    })
                    .catch(e => {
                        return done(null, false, { message: 'Incorrect username or password.' })
                    })
            })
        )
        passport.serializeUser(function(user: User, done) {
            done(null, user._id)
        })

        passport.deserializeUser(async (_id: string, done) => {
            const user: User = await db.collection('users').findOne(
                {
                    _id: new mongodb.ObjectId(_id),
                },
                {
                    // @ts-ignore
                    password: 0,
                }
            )
            if (!user) done('error', {})
            else
                done(null, {
                    _id: user._id,
                    username: user.username,
                })
        })
        app.post('/api/login', passport.authenticate('local'), (req, res) => {
            res.type('json').send({ status: 'ok' })
        })
        app.get('/api/issues', (req, res) => {
            if (!req.user) {
                res
                    .status(401)
                    .type('json')
                    .send({ status: 'Unauthorized' })
            } else
                db
                    .collection('issues')
                    .find()
                    .sort({ date: -1 })
                    .toArray(function(err, result) {
                        if (err) res.status(500).send({ error: 'something blew up' })
                        else {
                            res.type('json')
                            res.send(result)
                        }
                    })
        })
        app.post('/api/new', (req, res) => {
            if (!req.user) res.status(401).send('Unauthorized')
            else {
                const { title, description } = req.body
                if (!title || !description || !db) {
                    res.status(500).send({ error: 'something blew up' })
                } else {
                    const re = /[A-Za-z0-9\.\,\!\-\=\+\{\}\(\)\[\] ]/g
                    const sanitizedTitle = title
                        .match(re)
                        .join('')
                        .trim()
                    const sanitizedDescription = description
                        .match(re)
                        .join('')
                        .trim()
                    db.collection('issues').insertOne(
                        {
                            title:
                                sanitizedTitle.length <= 150
                                    ? sanitizedTitle
                                    : sanitizedTitle.substring(0, 150) + '...',
                            description:
                                sanitizedDescription.length <= 1500
                                    ? sanitizedDescription
                                    : sanitizedDescription.substring(0, 1500) + '...',
                            date: new Date(),
                            status: 'open',
                            user: req.user,
                        },
                        function(err, response) {
                            if (err) res.status(500).send({ error: 'something blew up' })
                            else {
                                res.type('json').send({ status: 'ok' })
                            }
                        }
                    )
                }
            }
        })
        app.post('/api/changestatus', async (req, res) => {
            if (!req.user) res.status(401).send('Unauthorized')
            else {
                const { _id } = req.body
                if (!_id || !db) {
                    res.status(500).send({ error: 'something blew up' })
                } else {
                    const id = new mongodb.ObjectId(_id)
                    const issue = await db.collection('issues').findOne({
                        _id: id,
                    })
                    const status = issue.status === 'open' ? 'pending' : 'closed'
                    await db.collection('issues').update(
                        {
                            _id: id,
                        },
                        {
                            $set: { status },
                        }
                    )
                    return res.type('json').send({ status: 'ok' })
                }
            }
        })
        app.get('*', (req, res) => {
            if (!db) res.status(500).send({ error: 'warming up' })
            const parsedUrl = parse(req.url, true)
            const { pathname, query = {} } = parsedUrl
            const route = routes[pathname]
            if (route) {
                if (pathname === '/') {
                    if (!req.user) return res.redirect('/login')
                    res['issues'] = db
                        .collection('issues')
                        .find()
                        .sort({ date: -1 })
                    //                .limit(10)
                    return nextapp.render(req, res, route.page, query)
                } else return nextapp.render(req, res, route.page, query)
            }
            return handle(req, res)
        })
        app.listen(port, () => {
            console.log('Server started on port ', port)
        })
    })
    mongo.catch(e => {
        console.log('MONGODB connection error')
        console.log('-----------------ERROR:-----------')
        console.log(e)
        console.log('------------------------------')
        console.log('URL: ',mongo_url)
        console.log('DBNAME: ', dbname)
        
        process.exit(1)
    })
})
