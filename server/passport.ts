import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import mongodb from 'mongodb'

import bcrypt from 'bcrypt'
import {db} from './db'
interface User {
    username: string
    _id: string
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
export {passport}