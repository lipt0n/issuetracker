import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import { passport } from './passport'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import { db } from './db'
import { add_routes } from './add_routes'
const port = process.env.PORT || 9000

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

app.listen(port, () => {
    console.log('Server started on port ', port)
})
add_routes(app)

export { app }
