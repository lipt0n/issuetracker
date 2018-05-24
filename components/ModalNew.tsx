import  Router  from 'next/router'
import style from  "./ModalNew.scss"
import New from '../pages/new'
export default class extends React.Component {
    dismiss = (e) => {
        if (this._shim === e.target) {
            Router.push('/')
        
        }
    }
    render = () => {
    return <div ref={el => (this._shim = el)} className={style.shim} onClick={this.dismiss}>
                <div  className={style.content}>
                    <New/>
                </div>
            </div>
}
}