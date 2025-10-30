import { useEffect, useState } from "react";
import { getAllFeedbacks, postVote } from "../services/api";
import StatusFilter from "./StatusFilter";
import { isLoggedIn } from "../utils/auth";
import styles from "../pages/Feedback.module.css";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [status, setStatus] = useState("All");

  const fetchFeedbacks = async () => {
    const data = await getAllFeedbacks();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const filtered =
    status === "All"
      ? feedbacks
      : feedbacks.filter((fb) => fb.status === status);

  const handleVote = async (id) => {
    const token = localStorage.getItem("token");
    if (!isLoggedIn()) {
      alert("Please login to vote");
      return;
    }
    try {
      await postVote(id, token);
      fetchFeedbacks();
    } catch (error) {
      alert(error.response?.data?.message || "Could not vote");
    }
  };

  return (
    <div className={styles.feedbackListContainer}>
      {/* Tabs with bottom spacing */}
      <div className={styles.statusTabs}>
        <StatusFilter selected={status} onChange={setStatus} />
      </div>
      <div className={styles.feedbackTableWrapper}>
        <table className={styles.feedbackTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Votes</th>
              <th>Upvote</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: '#589' }}>
                  No feedback found for this status.
                </td>
              </tr>
            ) : (
              filtered.map((fb) => (
                <tr key={fb._id} className={styles.feedbackCard}>
                  <td className={styles.ideaTitle}>{fb.title}</td>
                  <td className={styles.ideaDesc}>{fb.description}</td>
                  <td>
                    <span className={`${styles.ideaMeta} ${styles[fb.status.replace(/\s/g, '').toLowerCase()]}`}>
                      {fb.status}
                    </span>
                  </td>
                  <td>{fb.votes}</td>
                  <td>
                    <button className={styles.voteBtn} onClick={() => handleVote(fb._id)}>
                      Upvote
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
