import {db} from '../db'
const api_issues = (req, res) => {
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
    }
export {api_issues}