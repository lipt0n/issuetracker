import mongodb from 'mongodb'
import bcrypt from 'bcrypt'
let db: mongodb.Db

const dbname = process.env.MONGODB_URI
    ? process.env.MONGODB_URI.split('/').slice(-1)[0]
    : 'issuetracker'
const mongo_url: string = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost:27017'
// @ts-ignore
const MongoClientOptions: mongodb.MongoClientOptions = { useNewUrlParser: true }
const mongo = mongodb.MongoClient.connect(
    mongo_url,
    MongoClientOptions
)
mongo.then((client: mongodb.MongoClient) => {
    db = client.db(dbname)
    console.log('MONGODB connected')
    db.createCollection('users', (err, res) => {})
    db.createCollection('issues', (err, res) => {})
    for (const un of [1, 2, 3, 4]) {
        const u = db.collection('users').findOne({ username: 'user' + un })
        u.then(r => {
            if (!r) {
                // create test user
                bcrypt.hash('password', 10).then((hash: string) => {
                    db.collection('users').insert({
                        username: 'user' + un,
                        password: hash,
                    })
                })
            }
        })
    }
})
mongo.catch(e => {
    console.log('MONGODB connection error')
    console.log('-----------------ERROR:-----------')
    console.log(e)
    console.log('------------------------------')
    console.log('URL: ', mongo_url)
    console.log('DBNAME: ', dbname)

    process.exit(1)
})
export { db }
