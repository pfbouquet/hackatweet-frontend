import styles from '../styles/Trend.module.css'

function Kick(props){

    return (
        <>
            <div className={styles.eachTrend}>
                <h3 className={styles.h3}>{props.name}</h3>
                <h4 className={styles.h4}>{props.kicks} kicks</h4>
            </div>
        </>
    )

}

export default Kick;