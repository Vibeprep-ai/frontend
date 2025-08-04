import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 4);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: '🧪',
            title: 'Mock Tests',
            description: 'Comprehensive mock tests designed to simulate real exam conditions',
            color: '#667eea'
        },
        {
            icon: '📊',
            title: 'Performance Analytics',
            description: 'Detailed insights into your performance with AI-powered recommendations',
            color: '#f093fb'
        },
        {
            icon: '👨‍🏫',
            title: 'Expert Guidance',
            description: 'Learn from experienced educators and subject matter experts',
            color: '#4facfe'
        },
        {
            icon: '📱',
            title: 'Mobile Learning',
            description: 'Study anytime, anywhere with our responsive platform',
            color: '#43e97b'
        }
    ];

    const stats = [
        { number: '10,000+', label: 'Students' },
        { number: '500+', label: 'Mock Tests' },
        { number: '95%', label: 'Success Rate' },
        { number: '24/7', label: 'Support' }
    ];

    const testimonials = [
        {
            name: 'Priya Sharma',
            exam: 'JEE Main 2024',
            quote: 'Vibeprep helped me crack JEE Main with a rank under 1000. The mock tests were exactly like the real exam!',
            avatar: 'PS'
        },
        {
            name: 'Arjun Patel',
            exam: 'NEET 2024',
            quote: 'The detailed analytics helped me identify my weak areas and improve systematically. Highly recommended!',
            avatar: 'AP'
        },
        {
            name: 'Sneha Reddy',
            exam: 'JEE Advanced 2024',
            quote: 'Amazing platform with great UI/UX. The study materials and tests are top-notch quality.',
            avatar: 'SR'
        }
    ];

    return (
        <div className="landing">
            {/* Header */}
            <header className={`landing-header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <div className="logo">
                        <span className="logo-icon">📚</span>
                        <span className="logo-text">Vibeprep</span>
                    </div>
                    <nav className="nav-menu">
                        <a href="#features">Features</a>
                        <a href="#about">About</a>
                        <a href="#testimonials">Reviews</a>
                        <a href="#contact">Contact</a>
                    </nav>
                    <div className="header-actions">
                        <button
                            className="login-btn"
                            onClick={() => navigate('/auth')}
                        >
                            Login
                        </button>
                        <button
                            className="signup-btn"
                            onClick={() => navigate('/auth')}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Master Your <span className="highlight">Exam Prep</span> Journey
                        </h1>
                        <p className="hero-subtitle">
                            Join thousands of students who've achieved their dreams with our comprehensive
                            test preparation platform. Get personalized study plans, expert guidance, and
                            AI-powered analytics.
                        </p>
                        <div className="hero-actions">
                            <button
                                className="cta-primary"
                                onClick={() => navigate('/auth')}
                            >
                                Start Free Trial
                            </button>
                            <button className="cta-secondary">
                                <span className="play-icon">▶</span>
                                Watch Demo
                            </button>
                        </div>
                        <div className="hero-stats">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-item">
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="floating-cards">
                            <div className="card card-1">
                                <div className="card-icon">📝</div>
                                <div className="card-text">Mock Tests</div>
                            </div>
                            <div className="card card-2">
                                <div className="card-icon">📊</div>
                                <div className="card-text">Analytics</div>
                            </div>
                            <div className="card card-3">
                                <div className="card-icon">🏆</div>
                                <div className="card-text">Success</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <div className="section-header">
                        <h2>Why Choose Vibeprep?</h2>
                        <p>Everything you need to ace your competitive exams</p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                                style={{ '--accent-color': feature.color }}
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>Prepare Smart, Not Hard</h2>
                            <p>
                                At Vibeprep, we believe in making exam preparation efficient and effective.
                                Our platform combines cutting-edge technology with proven teaching methodologies
                                to help you achieve your academic goals.
                            </p>
                            <div className="about-features">
                                <div className="about-feature">
                                    <span className="feature-check">✅</span>
                                    <span>Personalized Learning Paths</span>
                                </div>
                                <div className="about-feature">
                                    <span className="feature-check">✅</span>
                                    <span>Real-time Progress Tracking</span>
                                </div>
                                <div className="about-feature">
                                    <span className="feature-check">✅</span>
                                    <span>Expert-crafted Content</span>
                                </div>
                                <div className="about-feature">
                                    <span className="feature-check">✅</span>
                                    <span>24/7 Learning Support</span>
                                </div>
                            </div>
                            <button
                                className="learn-more-btn"
                                onClick={() => navigate('/auth')}
                            >
                                Start Your Journey
                            </button>
                        </div>
                        <div className="about-visual">
                            <div className="dashboard-preview">
                                <div className="preview-header">
                                    <div className="preview-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <div className="preview-content">
                                    <div className="preview-sidebar">
                                        <div className="sidebar-item active"></div>
                                        <div className="sidebar-item"></div>
                                        <div className="sidebar-item"></div>
                                        <div className="sidebar-item"></div>
                                    </div>
                                    <div className="preview-main">
                                        <div className="preview-cards">
                                            <div className="preview-card"></div>
                                            <div className="preview-card"></div>
                                        </div>
                                        <div className="preview-chart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="testimonials">
                <div className="container">
                    <div className="section-header">
                        <h2>What Our Students Say</h2>
                        <p>Success stories from our community</p>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-content">
                                    <p>"{testimonial.quote}"</p>
                                </div>
                                <div className="testimonial-author">
                                    <div className="author-avatar">{testimonial.avatar}</div>
                                    <div className="author-info">
                                        <h4>{testimonial.name}</h4>
                                        <span>{testimonial.exam}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Start Your Success Story?</h2>
                        <p>Join thousands of students who are already on their path to success</p>
                        <div className="cta-actions">
                            <button
                                className="cta-btn primary"
                                onClick={() => navigate('/auth')}
                            >
                                Get Started Free
                            </button>
                            <button className="cta-btn secondary">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <div className="footer-logo">
                                <span className="logo-icon">📚</span>
                                <span className="logo-text">Vibeprep</span>
                            </div>
                            <p>Empowering students to achieve their academic dreams through smart preparation.</p>
                        </div>
                        <div className="footer-section">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#testimonials">Reviews</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h3>Exams</h3>
                            <ul>
                                <li><a href="#">JEE Main</a></li>
                                <li><a href="#">JEE Advanced</a></li>
                                <li><a href="#">NEET</a></li>
                                <li><a href="#">CBSE Board</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h3>Support</h3>
                            <ul>
                                <li><a href="#">Help Center</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Contact Support</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 Vibeprep. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
