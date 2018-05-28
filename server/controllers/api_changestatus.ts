import {db} from '../db'
import mongodb from 'mongodb'

const api_changestatus = async (req, res) => {

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
export {api_changestatus}