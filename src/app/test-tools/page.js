"use client";

import { useState } from "react";
import styles from "./TestTools.module.css";

export default function TestTools() {
    const [message, setMessage] = useState("");

    async function resetQuota() {
        const response = await fetch("/api/webhook", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                eventId: "quota-reset-1",
            }),
        });

        const data = await response.json();

        setMessage(data.message);
    }

    async function generateLeads() {
        const response = await fetch("/api/generate-leads", {
            method: "POST",
        });

        const data = await response.json();

        setMessage(data.message);
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Testing Tools</h1>

                <button onClick={resetQuota}>Reset Provider Quotas</button>

                <button onClick={generateLeads}>Generate 10 Leads</button>

                {message && <div className={styles.message}>{message}</div>}
            </div>
        </div>
    );
}
