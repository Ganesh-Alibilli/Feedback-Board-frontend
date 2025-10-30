import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <span role="img" aria-label="Feedback">💡</span> Feedback Board
      </div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/feedback" className={styles.link}>Feedback</Link>
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/register" className={styles.link}>Register</Link>
      </div>
    </nav>
  );
}
