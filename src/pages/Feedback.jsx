import { useState } from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import styles from './Feedback.module.css';

export default function Feedback() {
  const [needsRefresh, setNeedsRefresh] = useState(false);

  return (
    <div className={styles.feedbackPage}>
      {/* Full-width container for the feedback list/table */}
      <div className={styles.feedbackListContainer}>
        <div className={styles.sectionTitle}>Feedback Ideas</div>
        <FeedbackList key={needsRefresh} />
      </div>
      {/* Centered feedback form card below */}
      <div className={styles.formCard}>
        <div className={styles.formTitle}>Submit Feedback</div>
        <FeedbackForm onFeedbackAdded={() => setNeedsRefresh(!needsRefresh)} />
      </div>
    </div>
  );
}
