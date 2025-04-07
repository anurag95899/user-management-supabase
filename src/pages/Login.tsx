import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validateEmail"; //Import the email validator

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Email format validation
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setMessage("Password cannot be empty.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful!");
      console.log("User:", data.user);
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #83a4d4, #b6fbff)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 25, color: "#333" }}>🔐 Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 15,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 20,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: 12,
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          Login
        </button>

        {message && (
          <p
            style={{
              marginTop: 15,
              color: message === "Login successful!" ? "green" : "red",
              fontSize: 14,
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: 25 }}>
          Don't have an account?{" "}
          <Link to="/sign-up" style={{ color: "#007bff", fontWeight: "bold" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
