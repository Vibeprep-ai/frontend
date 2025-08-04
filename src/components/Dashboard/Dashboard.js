import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading user data
        setTimeout(() => {
            const mockUser = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                class_name: 'Class 12',
                target_exam: 'JEE Main',
                phone_number: '+91 9876543210'
            };
            setUser(mockUser);
            setLoading(false);
        }, 1000);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        window.location.href = '/auth';
    };

    const stats = [
        { title: 'Tests Taken', value: '45', icon: '📝', color: '#667eea' },
        { title: 'Study Hours', value: '124', icon: '⏰', color: '#f093fb' },
        { title: 'Rank', value: '#342', icon: '🏆', color: '#4facfe' },
        { title: 'Accuracy', value: '87%', icon: '🎯', color: '#43e97b' }
    ];

    const recentTests = [
        { name: 'Physics Mock Test 1', score: '85/100', date: '2 days ago', status: 'completed' },
        { name: 'Chemistry Practice', score: '92/100', date: '5 days ago', status: 'completed' },
        { name: 'Mathematics Quiz', score: '78/100', date: '1 week ago', status: 'completed' },
        { name: 'Biology Test Series', score: 'Pending', date: 'Today', status: 'pending' }
    ];

    const upcomingTests = [
        { name: 'JEE Main Mock Test', date: 'Tomorrow', time: '10:00 AM' },
        { name: 'Physics Chapter Test', date: 'Dec 25', time: '2:00 PM' },
        { name: 'Full Syllabus Test', date: 'Dec 28', time: '9:00 AM' }
    ];

    const subjects = [
        { name: 'Physics', progress: 75, color: '#667eea' },
        { name: 'Chemistry', progress: 82, color: '#f093fb' },
        { name: 'Mathematics', progress: 68, color: '#4facfe' },
        { name: 'Biology', progress: 90, color: '#43e97b' }
    ];

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="logo-section">
                        <h1>📚 Vibeprep</h1>
                    </div>
                    <div className="user-section">
                        <div className="user-info">
                            <span className="user-name">Welcome, {user?.first_name}!</span>
                            <span className="user-class">{user?.class_name} • {user?.target_exam}</span>
                        </div>
                        <div className="user-avatar">
                            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                        </div>
                        <button className="logout-btn" onClick={handleLogout}>
                            🚪 Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="dashboard-nav">
                <div className="nav-tabs">
                    <button
                        className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        📊 Overview
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'tests' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tests')}
                    >
                        📝 Tests
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'progress' ? 'active' : ''}`}
                        onClick={() => setActiveTab('progress')}
                    >
                        📈 Progress
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        👤 Profile
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="dashboard-main">
                {activeTab === 'overview' && (
                    <div className="overview-content">
                        {/* Stats Cards */}
                        <section className="stats-section">
                            <h2>Your Statistics</h2>
                            <div className="stats-grid">
                                {stats.map((stat, index) => (
                                    <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
                                        <div className="stat-icon">{stat.icon}</div>
                                        <div className="stat-info">
                                            <h3>{stat.value}</h3>
                                            <p>{stat.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recent Activity */}
                        <div className="activity-grid">
                            <section className="recent-tests">
                                <h2>Recent Tests</h2>
                                <div className="test-list">
                                    {recentTests.map((test, index) => (
                                        <div key={index} className="test-item">
                                            <div className="test-info">
                                                <h4>{test.name}</h4>
                                                <p>{test.date}</p>
                                            </div>
                                            <div className={`test-score ${test.status}`}>
                                                {test.score}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="upcoming-tests">
                                <h2>Upcoming Tests</h2>
                                <div className="upcoming-list">
                                    {upcomingTests.map((test, index) => (
                                        <div key={index} className="upcoming-item">
                                            <div className="upcoming-info">
                                                <h4>{test.name}</h4>
                                                <p>{test.date} at {test.time}</p>
                                            </div>
                                            <button className="start-test-btn">Start</button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                )}

                {activeTab === 'tests' && (
                    <div className="tests-content">
                        <section className="test-categories">
                            <h2>Test Categories</h2>
                            <div className="category-grid">
                                <div className="category-card">
                                    <div className="category-icon">🧪</div>
                                    <h3>Mock Tests</h3>
                                    <p>Full-length practice tests</p>
                                    <button className="category-btn">View Tests</button>
                                </div>
                                <div className="category-card">
                                    <div className="category-icon">📚</div>
                                    <h3>Chapter Tests</h3>
                                    <p>Subject-wise chapter tests</p>
                                    <button className="category-btn">View Tests</button>
                                </div>
                                <div className="category-card">
                                    <div className="category-icon">⚡</div>
                                    <h3>Quick Quiz</h3>
                                    <p>Short practice quizzes</p>
                                    <button className="category-btn">View Tests</button>
                                </div>
                                <div className="category-card">
                                    <div className="category-icon">🎯</div>
                                    <h3>Previous Year</h3>
                                    <p>Previous year papers</p>
                                    <button className="category-btn">View Tests</button>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'progress' && (
                    <div className="progress-content">
                        <section className="subject-progress">
                            <h2>Subject-wise Progress</h2>
                            <div className="progress-list">
                                {subjects.map((subject, index) => (
                                    <div key={index} className="progress-item">
                                        <div className="progress-header">
                                            <h4>{subject.name}</h4>
                                            <span>{subject.progress}%</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="performance-chart">
                            <h2>Performance Trends</h2>
                            <div className="chart-placeholder">
                                <p>📊 Performance chart will be displayed here</p>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="profile-content">
                        <section className="profile-info">
                            <h2>Profile Information</h2>
                            <div className="profile-card">
                                <div className="profile-avatar-large">
                                    {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                                </div>
                                <div className="profile-details">
                                    <div className="detail-item">
                                        <label>Full Name</label>
                                        <span>{user?.first_name} {user?.last_name}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Email</label>
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Phone Number</label>
                                        <span>{user?.phone_number}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Class</label>
                                        <span>{user?.class_name}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Target Exam</label>
                                        <span>{user?.target_exam}</span>
                                    </div>
                                </div>
                                <button className="edit-profile-btn">Edit Profile</button>
                            </div>
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
