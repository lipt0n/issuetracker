import Link from 'next/link'
import globalStyle from  "../pages/global.scss"

const ButtonAdd = () => {
    return <Link as={'/new'} href={`/?new=true`}>
            <a className={globalStyle.buttonNew}>+ ADD NEW ISSUE</a>
            </Link>
}
export {ButtonAdd}