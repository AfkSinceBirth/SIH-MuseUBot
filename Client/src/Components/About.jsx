import React from "react";

export default function MuseUBot() {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                padding: "20px",
                maxWidth: "800px",
                margin: "0 auto",
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent background
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h1 style={{ color: "#2c3e50", textAlign: "center" }}>
                Welcome to MuseUBot!
            </h1>
            <p
                style={{
                    fontSize: "18px",
                    lineHeight: "1.6",
                    color: "#34495e",
                }}
            >
                Hello! I am MuseUBot, your friendly guide to booking museum
                tickets. Whether you're an art enthusiast, history buff, or just
                curious, I'm here to help you explore and plan your museum
                visits effortlessly.
            </p>
            <p
                style={{
                    fontSize: "18px",
                    lineHeight: "1.6",
                    color: "#34495e",
                }}
            >
                <strong>What I Can Do:</strong>
                <ul style={{ paddingLeft: "20px" }}>
                    <li>
                        Provide information on various museums and their
                        locations.
                    </li>
                    <li>List current exhibitions and events at each museum.</li>
                    <li>
                        Guide you through booking tickets for your desired
                        museum and event.
                    </li>
                    <li>
                        Answer any questions you may have about museum tickets
                        and events.
                    </li>
                </ul>
            </p>
            <p
                style={{
                    fontSize: "18px",
                    lineHeight: "1.6",
                    color: "#34495e",
                }}
            >
                <strong>How It Works:</strong>
                <ol style={{ paddingLeft: "20px" }}>
                    <li>
                        Start by saying "Hello" or "Hi" to initiate the
                        conversation.
                    </li>
                    <li>
                        Ask about available museums or events to see what’s on
                        offer.
                    </li>
                    <li>Select the museum and event you're interested in.</li>
                    <li>Choose the number of tickets you want to book.</li>
                    <li>Provide your email address to receive your tickets.</li>
                </ol>
            </p>
            <p
                style={{
                    fontSize: "18px",
                    lineHeight: "1.6",
                    color: "#34495e",
                }}
            >
                <strong>Why Use MuseUBot:</strong>
                <ul style={{ paddingLeft: "20px" }}>
                    <li>
                        Quick and easy access to museum information and ticket
                        booking.
                    </li>
                    <li>
                        Personalized assistance to ensure a smooth booking
                        experience.
                    </li>
                    <li>
                        Stay informed about the latest exhibitions and events.
                    </li>
                </ul>
            </p>
            <p
                style={{
                    fontSize: "18px",
                    lineHeight: "1.6",
                    color: "#34495e",
                }}
            >
                Let’s embark on a journey of discovery together! Feel free to
                ask me about any museum, exhibition, or ticket booking. I’m here
                to make your museum visits memorable and hassle-free.
            </p>
        </div>
    );
}
