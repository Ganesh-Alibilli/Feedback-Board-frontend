import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await loginUser(form);
      setMessage(`Welcome back, ${data.user.name}!`);
      localStorage.setItem("token", data.token);
      navigate("/feedback");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <span className={styles.icon} role="img" aria-label="lock">
            🔐
          </span>
          <h2 className={styles.title}>Login</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.formStack}>
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
          <div className={styles.passwordWrapper}>
            <input
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              type={showPassword ? "text" : "password"}
              className={styles.input}
              style={{ paddingRight: "2.6rem" }}
              disabled={submitting}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword((val) => !val)}
              tabIndex={0}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#0097b2"
                    strokeWidth="2"
                    d="M2 12S5.5 6 12 6s10 6 10 6-3.5 6-10 6S2 12 2 12z"
                  />
                  <ellipse
                    stroke="#0097b2"
                    strokeWidth="2"
                    cx="12"
                    cy="12"
                    rx="3"
                    ry="3"
                  />
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#9fa3b0"
                    strokeWidth="2"
                    d="M3 3l18 18M2 12s3.5-6 10-6c2.6 0 4.8.7 6.6 1.8L21 12m-9 6c-2.6 0-4.8-.7-6.6-1.8M12 12c.5-.5 1.3-1.2 2-1.6M12 12c-.5.5-1.3 1.2-2 1.6"
                  />
                </svg>
              )}
            </span>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
