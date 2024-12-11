import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StaffManagement() {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        async function fetchStaff() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/staff`);
                setStaff(response.data);
            } catch (error) {
                console.error("Error fetching staff data:", error);
            }
        }

        fetchStaff();
    }, []);

    return (
        <div className="mt-4">
            <h2>Staff Management</h2>
            {staff.length > 0 ? (
                <ul>
                    {staff.map(member => (
                        <li key={member.id}>{member.name} - {member.role}</li>
                    ))}
                </ul>
            ) : (
                <p>No staff data available.</p>
            )}
        </div>
    );
}

export default StaffManagement;
