//layout page

import "./globals.css";
import Link from "next/link";

export const metadata = {
    title: "Prowider Mini System",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <nav
                    style={{
                        background: "#020617",
                        padding: "16px 32px",
                        display: "flex",
                        gap: "20px",
                        borderBottom: "1px solid #1e293b",
                    }}
                >
                    <Link
                        href="/request-service"
                        style={{
                            color: "white",
                            textDecoration: "none",
                        }}
                    >
                        Request Service
                    </Link>

                    <Link
                        href="/dashboard"
                        style={{
                            color: "white",
                            textDecoration: "none",
                        }}
                    >
                        Dashboard
                    </Link>
                </nav>

                {children}
            </body>
        </html>
    );
}
