import React from 'react'
import Link from 'next/link'

const ButtonAdd = () => {
    return (
        <Link as={'/new'} href={`/?new=true`}>
            <a className={'buttonNew'}>+ ADD NEW ISSUE</a>
        </Link>
    )
}
export { ButtonAdd }
