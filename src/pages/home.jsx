import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginJwt, registerUser } from "../features/auth/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [passwordHash, setPasswordHash] = useState("");
    const [username, setName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const resultAction = await dispatch(loginJwt({ email, passwordHash })).unwrap();
                alert("Welcome " + resultAction.name);
                if (resultAction) {
                    navigate("/home");
                }
            } else {
                await dispatch(registerUser({ name: username, email, passwordHash })).unwrap();
                alert("Account created successfully! 👍 Please login 😎");
                setIsLogin(true);
                navigate("/");
            }
        } catch (err) {
            alert("Error: " + (err.message || err));
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light px-3">
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "480px" }}>
                <h1 className="text-center mb-4">
                    Welcome to <span className="text-primary">SmartGro</span> 🛒
                </h1>

                {isLogin ? (
                    <>
                        <h4 className="text-center mb-3">Login</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={passwordHash}
                                    onChange={(e) => setPasswordHash(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
                        </form>
                        <p className="text-center mt-3">
                            Don’t have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(false)}
                                className="btn btn-link p-0"
                            >
                                Sign up
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <h4 className="text-center mb-3">Create Account</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Full Name"
                                    value={username}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={passwordHash}
                                    onChange={(e) => setPasswordHash(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100">
                                Sign Up
                            </button>
                        </form>
                        <p className="text-center mt-3">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(true)}
                                className="btn btn-link p-0"
                            >
                                Login
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
