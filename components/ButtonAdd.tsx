import Link from 'next/link'
import React from 'react'

const ButtonAdd = () => {
    return (
        <Link as={'/new'} href={`/?new=true`}>
            <a className={'buttonNew'}>+ ADD NEW ISSUE</a>
        </Link>
    )
}
export { ButtonAdd }
