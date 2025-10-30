import { useState } from "react";
import { postFeedback } from "../services/api";
import { isLoggedIn } from "../utils/auth";
import styles from "./FeedbackForm.module.css"; // Make sure this file exists

export default function FeedbackForm({ onFeedbackAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Always get latest token
    if (!isLoggedIn()) {
      setMessage("Please login to submit feedback.");
      return;
    }
    try {
      const feedback = await postFeedback({ title, description }, token);
      setMessage("Feedback submitted successfully!");
      setTitle("");
      setDescription("");
      if (onFeedbackAdded) onFeedbackAdded(feedback);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to submit feedback.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formStack}>
      <input
        className={styles.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className={styles.textarea}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <button type="submit" className={styles.submitBtn}>
        Submit
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
}
