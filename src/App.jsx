import Navbar from './components/Navbar';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.hero}>
        {/* Cute feedback illustration (SVG or emoji) */}
        <div className={styles.illustration}>
          <svg width="82" height="82" viewBox="0 0 82 82" fill="none">
            <circle cx="41" cy="41" r="36" fill="#c7f1ff" />
            <path d="M31,50 Q41,65 51,50" stroke="#1c80cf" strokeWidth="3" fill="none" />
            <circle cx="33" cy="37" r="4" fill="#fff"/>
            <circle cx="49" cy="37" r="4" fill="#fff"/>
            <circle cx="33" cy="37" r="2" fill="#2257a0"/>
            <circle cx="49" cy="37" r="2" fill="#2257a0"/>
            <ellipse cx="41" cy="50" rx="8" ry="3" fill="#fff" opacity="0.5"/>
          </svg>
        </div>
        <h1 className={styles.title}>Developer Feedback Board</h1>
        <p className={styles.description}>
          Help shape the future! <b>Share your ideas, upvote suggestions,</b> and follow project progress.<br />
          Make your voice heard and be part of a collaborative journey to build better software.
        </p>
        <a href="/feedback" className={styles.ctaButton}>🚀 Start Exploring Feedback</a>
      </div>
    </div>
  );
}

export default App;
