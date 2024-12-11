import React, { useState } from 'react';
import BookingAnalytics from '../Components/BookingAnalytics';
import StaffManagement from '../Components/StaffManagement';
import ModerateReviews from '../Components/ModerateReviews';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('reviews');

    return (
        <div className="container mt-5">
            <h1>Admin Dashboard</h1>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} href="#reviews" onClick={() => setActiveTab('reviews')}>Moderate Reviews</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`} href="#analytics" onClick={() => setActiveTab('analytics')}>Booking Analytics</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'management' ? 'active' : ''}`} href="#management" onClick={() => setActiveTab('management')}>Staff Management</a>
                </li>
            </ul>

            <div className="tab-content">
                {activeTab === 'reviews' && <ModerateReviews />}
                {activeTab === 'analytics' && <BookingAnalytics />}
                {activeTab === 'management' && <StaffManagement />}
            </div>
        </div>
    );
}

export default AdminDashboard;
