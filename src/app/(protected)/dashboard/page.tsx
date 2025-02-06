'use client';

import { useEffect } from 'react';
import { adminStore } from '@/stores';

export default function AnalyticsDashboard() {
    const { data, isLoading, error, fetchAnalytics } = adminStore();

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return null;

    return (
        <div>
            <h1>Analytics Dashboard</h1>
            <div>
                <h2>Overview</h2>
                <p>Total Users: {data.totalUsers}</p>
                <p>Total LTV: ${data.totalLTV.toFixed(2)}</p>
                <p>Total Items Sold: {data.totalSold}</p>
                <p>New Users This Month: {data.totalUsersSignUpThisMonth}</p>
            </div>
        </div>
    );
}
