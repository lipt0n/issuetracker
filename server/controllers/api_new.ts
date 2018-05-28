import { db } from '../db'
const api_new = (req, res) => {
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
export { api_new }
