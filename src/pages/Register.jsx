import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'; // Create this CSS module

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await registerUser(form);
      setMessage(`Success! Welcome ${data.user.name}. Redirecting...`);
      localStorage.setItem('token', data.token);
      setTimeout(() => navigate('/login'), 1700); // Redirect after 1.7s
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.registerBackground}>
      <div className={styles.registerCard}>
        <div className={styles.cardHeader}>
          <span className={styles.icon} role="img" aria-label="user">📝</span>
          <h2 className={styles.title}>Register</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.formStack}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.input}
            disabled={submitting}
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            className={styles.input}
            disabled={submitting}
          />
          <input
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            type="password"
            className={styles.input}
            disabled={submitting}
          />
          <button type="submit" className={styles.registerButton} disabled={submitting}>
            {submitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
