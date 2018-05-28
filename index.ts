import mongodb from 'mongodb'
import next from 'next'
import { parse } from 'url'
const dev = process.env.NODE_ENV !== 'production'
import {app} from './server/app'
import {db} from './server/db'
interface User {
    username: string
    _id: string
}

const nextapp = next({ dir: '.', dev })
const handle = nextapp.getRequestHandler()
nextapp
.prepare()
.then(() => {
    app.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true)
        const { pathname, query = {} } = parsedUrl
            if (pathname === '/') {
                res['issues'] = db
                    .collection('issues')
                    .find()
                    .sort({ date: -1 })
                return nextapp.render(req, res, '/', query)
            } 
        return handle(req, res)
    })
    
    
})
