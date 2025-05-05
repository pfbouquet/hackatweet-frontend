import styles from '../styles/Trend.module.css'
import { useDispatch } from 'react-redux'
import { clickTrend } from '../reducers/trend'
import { useRouter } from "next/router";

function Kick(props){

    const dispatch=useDispatch()
    const router = useRouter();


    return (
        <>
            <div className={styles.eachTrend} onClick={()=> {
                dispatch(clickTrend(props.name))
                router.push("/hashtag");
            }}>
               <div className={styles.trendBloc}> 
                <h3 className={styles.h3}>{props.name}</h3>
                <h4 className={styles.h4}>{props.kicks} kicks</h4>
                </div>
            
            </div>
        </>
    )

}

export default Kick;