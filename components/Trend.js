import styles from '../styles/Trend.module.css'
import { useDispatch } from 'react-redux'
import { clickTrend } from '../reducers/trend'

function Kick(props){

    const dispatch=useDispatch()

    return (
        <>
            <div className={styles.eachTrend} onClick={()=> dispatch(clickTrend(props.name))}>
                <h3 className={styles.h3}>{props.name}</h3>
                <h4 className={styles.h4}>{props.kicks} kicks</h4>
            </div>
        </>
    )

}

export default Kick;