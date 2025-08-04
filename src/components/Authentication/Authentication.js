import React, { useState } from 'react';
import './Authentication.css';

const Authentication = () => {
    const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'otp'
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        class_name: '',
        target_exam: '',
        otp: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const API_BASE_URL = 'http://localhost:8000'; // Adjust to your backend URL

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 5000);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone_number: formData.phone_number,
                    password: formData.password,
                    class_name: formData.class_name,
                    target_exam: formData.target_exam
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showMessage(data.message, 'success');
                setCurrentView('otp');
            } else {
                showMessage(data.detail || 'Signup failed', 'error');
            }
        } catch (error) {
            showMessage('Network error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user_id', data.user_id);
                showMessage('Login successful!', 'success');
                // Redirect to dashboard or home page
                window.location.href = '/dashboard';
            } else {
                if (data.detail.includes('Email not verified') || data.detail.includes('Account not verified')) {
                    showMessage(data.detail, 'error');
                    setCurrentView('otp');
                } else {
                    showMessage(data.detail || 'Login failed', 'error');
                }
            }
        } catch (error) {
            showMessage('Network error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleOTPVerification = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    otp: formData.otp
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Email verified successfully!', 'success');
                setCurrentView('login');
            } else {
                showMessage(data.detail || 'OTP verification failed', 'error');
            }
        } catch (error) {
            showMessage('Network error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/auth/resend-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showMessage(data.message, 'success');
            } else {
                showMessage(data.detail || 'Failed to resend OTP', 'error');
            }
        } catch (error) {
            showMessage('Network error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    const renderLoginForm = () => (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back to Vibeprep</h2>
                <p>Sign in to continue your learning journey</p>

                {message && <div className={`message ${messageType}`}>{message}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="switch-auth">
                    Don't have an account?
                    <span onClick={() => setCurrentView('signup')}> Sign Up</span>
                </p>
            </div>
        </div>
    );

    const renderSignupForm = () => (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Join Vibeprep</h2>
                <p>Create your account to start preparing</p>

                {message && <div className={`message ${messageType}`}>{message}</div>}

                <form onSubmit={handleSignup}>
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="tel"
                            name="phone_number"
                            placeholder="Phone Number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <select
                            name="class_name"
                            value={formData.class_name}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Class</option>
                            <option value="Class 9">Class 9</option>
                            <option value="Class 10">Class 10</option>
                            <option value="Class 11">Class 11</option>
                            <option value="Class 12">Class 12</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <select
                            name="target_exam"
                            value={formData.target_exam}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Target Exam</option>
                            <option value="JEE Main">JEE Main</option>
                            <option value="JEE Advanced">JEE Advanced</option>
                            <option value="NEET">NEET</option>
                            <option value="CBSE Board">CBSE Board</option>
                            <option value="State Board">State Board</option>
                        </select>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="switch-auth">
                    Already have an account?
                    <span onClick={() => setCurrentView('login')}> Sign In</span>
                </p>
            </div>
        </div>
    );

    const renderOTPForm = () => (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Verify Your Email</h2>
                <p>We've sent a 6-digit code to {formData.email}</p>

                {message && <div className={`message ${messageType}`}>{message}</div>}

                <form onSubmit={handleOTPVerification}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="otp"
                            placeholder="Enter 6-digit OTP"
                            value={formData.otp}
                            onChange={handleInputChange}
                            maxLength="6"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>

                <div className="otp-actions">
                    <p>Didn't receive the code?</p>
                    <button
                        type="button"
                        className="resend-button"
                        onClick={handleResendOTP}
                        disabled={loading}
                    >
                        Resend OTP
                    </button>
                </div>

                <p className="switch-auth">
                    Wrong email?
                    <span onClick={() => setCurrentView('signup')}> Go back</span>
                </p>
            </div>
        </div>
    );

    return (
        <div className="authentication">
            {currentView === 'login' && renderLoginForm()}
            {currentView === 'signup' && renderSignupForm()}
            {currentView === 'otp' && renderOTPForm()}
        </div>
    );
};

export default Authentication;
