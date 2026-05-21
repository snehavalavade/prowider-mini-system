"use client";

import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
    const [providers, setProviders] = useState([]);

    const [loading, setLoading] = useState(true);

    async function fetchDashboard() {
        try {
            const response = await fetch("/api/dashboard");

            const data = await response.json();

            setProviders(data);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchDashboard();

        const interval = setInterval(() => {
            fetchDashboard();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Provider Dashboard</h1>

            {loading ? (
                <div className={styles.loading}>Loading dashboard...</div>
            ) : (
                <div className={styles.grid}>
                    {providers.map((provider) => (
                        <div key={provider.id} className={styles.card}>
                            <div className={styles.providerHeader}>
                                <h2 className={styles.providerName}>
                                    {provider.name}
                                </h2>

                                <span className={styles.providerBadge}>
                                    #{provider.providerNumber}
                                </span>
                            </div>

                            <div className={styles.stats}>
                                <div className={styles.statBox}>
                                    <div className={styles.statValue}>
                                        {provider.leadsReceived}
                                    </div>

                                    <div className={styles.statLabel}>
                                        Leads
                                    </div>
                                </div>

                                <div className={styles.statBox}>
                                    <div className={styles.statValue}>
                                        {provider.monthlyQuota -
                                            provider.leadsReceived}
                                    </div>

                                    <div className={styles.statLabel}>
                                        Remaining
                                    </div>
                                </div>
                            </div>

                            <h3 className={styles.sectionTitle}>
                                Assigned Leads
                            </h3>

                            <div className={styles.leadsContainer}>
                                {provider.assignments.length === 0 ? (
                                    <p className={styles.emptyText}>
                                        No leads assigned
                                    </p>
                                ) : (
                                    provider.assignments.map((assignment) => (
                                        <div
                                            key={assignment.id}
                                            className={styles.leadCard}
                                        >
                                            <div className={styles.leadName}>
                                                {assignment.lead.name}
                                            </div>

                                            <div className={styles.leadPhone}>
                                                {assignment.lead.phone}
                                            </div>

                                            <div
                                                className={styles.serviceBadge}
                                            >
                                                {assignment.lead.serviceType}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
