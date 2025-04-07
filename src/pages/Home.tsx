import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { trackSession } from "../utils/sessionTracker";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user has an active session
  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkSession();

    // Listen for auth state changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Session Event:", event, session);
        trackSession(event, session); // Track login/logout sessions

        if (event === "SIGNED_IN") {
          setIsLoggedIn(true);
        }

        if (event === "SIGNED_OUT") {
          setIsLoggedIn(false);
          navigate("/login");
        }
      }
    );

    // Cleanup listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome To User Management 👋</h1>

        {!isLoggedIn ? (
          <div className="btn-group">
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/sign-up" className="btn">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="btn-group">
            <Link to="/forgot-password" className="btn">
              Forgot Password
            </Link>
            <Link to="/reset-password" className="btn">
              Reset Password
            </Link>
            <button onClick={handleLogout} className="btn logout">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}