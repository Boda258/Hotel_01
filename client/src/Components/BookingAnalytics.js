import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingAnalytics() {
    const [analytics, setAnalytics] = useState({ totalBookings: 0, averageBookingValue: 0 });

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/booking-analytics`);
                setAnalytics(response.data);
            } catch (error) {
                console.error("Error fetching booking analytics:", error);
            }
        }

        fetchAnalytics();
    }, []);

    return (
        <div className="mt-4">
            <h2>Booking Analytics</h2>
            <p>Total Bookings: {analytics.totalBookings}</p>
            <p>Average Booking Value: ${analytics.averageBookingValue.toFixed(2)}</p>
        </div>
    );
}

export default BookingAnalytics;
