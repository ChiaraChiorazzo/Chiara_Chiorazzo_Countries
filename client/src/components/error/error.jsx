
import styles from './error.module.css';
import{Link} from 'react-router-dom'

const Error = () => {
  return (
    <div className={styles.errorContainer}>
      <div>
        <h1>Sorry!</h1>
        <p>The page you're looking for could not be found &#x1F916; </p>
      </div>
        <div>
        <Link to="/"><button className={styles.button}>Landing</button></Link>
        <Link to="/home"><button className={styles.button}>Countries</button></Link>
        <Link to="/createActivity"><button className={styles.button}>createActivity</button></Link>
        </div>
    </div>
  );
};

export default Error;
