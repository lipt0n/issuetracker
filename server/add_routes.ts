import {db} from './db'
import {passport} from './passport'
import {api_issues} from './controllers/api_issues'
import {api_new} from './controllers/api_new'
import {api_changestatus} from './controllers/api_changestatus'

const add_routes = (app)=>{
    app.all('*', (req,res,next)=>{
        if (!db) return res.status(500).send({ error: 'warming up' })
        if(['/', '/api/issues', '/api/new', '/api/changestatus'].includes(req.url) && !req.user ){
            return  res.redirect('/login')
        }
        next()

    })
    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        res.type('json').send({ status: 'ok' })
    })
    app.get('/api/issues', api_issues)
    app.post('/api/new', api_new)
    app.post('/api/changestatus', api_changestatus)
}
export {add_routes}