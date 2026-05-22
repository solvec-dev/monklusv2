import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Monklus | Aannemersbedrijf Den Haag",
    description: "Professionele woningrenovatie, uitbouw, badkamers en onderhoud in regio Den Haag. Vakmanschap gebaseerd op vertrouwen.",
    keywords: ["aannemer", "Den Haag", "renovatie", "verbouwing", "badkamer", "uitbouw", "Monklus", "metselwerk", "dakbedekking", "schilderwerk"],
    icons: {
        icon: "./images/logo_monklus.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="nl" className="scroll-smooth">
            <body>{children}</body>
        </html>
    );
}
