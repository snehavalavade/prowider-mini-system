"use client";

import { useState } from "react";
import styles from "./RequestService.module.css";

export default function RequestService() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        city: "",
        description: "",
        serviceType: "SERVICE_1",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            setMessage(data.message || data.error);

            if (response.ok) {
                setForm({
                    name: "",
                    phone: "",
                    city: "",
                    description: "",
                    serviceType: "SERVICE_1",
                });
            }
        } catch (error) {
            setMessage("Error creating lead");
        }

        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Request Service</h1>

                <p className={styles.subtitle}>
                    Submit your enquiry and get matched with providers
                </p>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Name</label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value,
                            })
                        }
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Phone Number</label>

                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                phone: e.target.value,
                            })
                        }
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>City</label>

                    <input
                        type="text"
                        placeholder="Enter city"
                        value={form.city}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                city: e.target.value,
                            })
                        }
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Service Type</label>

                    <select
                        value={form.serviceType}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                serviceType: e.target.value,
                            })
                        }
                        className={styles.select}
                    >
                        <option value="SERVICE_1">Service 1</option>

                        <option value="SERVICE_2">Service 2</option>

                        <option value="SERVICE_3">Service 3</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Description</label>

                    <textarea
                        placeholder="Describe your requirement"
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value,
                            })
                        }
                        className={styles.textarea}
                        required
                    />
                </div>

                {message && <div className={styles.message}>{message}</div>}
                <button
                    type="submit"
                    disabled={loading}
                    className={styles.button}
                >
                    {loading ? "Submitting..." : "Submit Request"}
                </button>
            </form>
        </div>
    );
}
