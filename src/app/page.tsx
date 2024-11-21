"use client";

import React, { useState, useEffect } from "react";
import Heading from "@/app/components/Heading";
import Footer from "@/app/components/Footer";

export default function Home() {
    const [typedText, setTypedText] = useState("");
    const [wordIndex, setWordIndex] = useState(0); // Keep track of the current word
    const [charIndex, setCharIndex] = useState(0); // Keep track of the current character
    const words = [
        "Clobknocka",
        "A Database for Magic the Gathering",
        "From finding cards to deck building",
        "We have all your Magic the Gathering needs",
    ];

    useEffect(() => {
        if (wordIndex < words.length) {
            if (charIndex < words[wordIndex].length) {
                const typingTimeout = setTimeout(() => {
                    setTypedText((prev) => prev + words[wordIndex][charIndex]);
                    setCharIndex(charIndex + 1);
                }, 100); // Controls the typing speed

                return () => clearTimeout(typingTimeout); // Cleanup the timeout to avoid memory leaks
            } else {
                const resetTimeout = setTimeout(() => {
                    setTypedText(""); // Clear the text before moving to the next word
                    setCharIndex(0); // Reset the character index
                    setWordIndex(wordIndex + 1); // Move to the next word
                }, 1000); // Pause before clearing and typing the next word

                return () => clearTimeout(resetTimeout); // Cleanup the timeout
            }
        }
    }, [charIndex, wordIndex]); // Watch both charIndex and wordIndex to trigger typing

    return (
        <div style={{ backgroundColor: "Gray", minHeight: "100vh" }}>
            <Heading />

            {/* Main Content */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh",
                    transform: "translateX(-10px)",
                }}
            >
                <h1 style={{ margin: 0, fontSize: "30px" }}>{typedText}</h1>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh",
                    transform: "translateX(-10px)",
                }}
            >
                <h1 style={{ margin: 0, fontSize: "22px" }}>
                    A Database for Magic the Gathering
                </h1>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh",
                    transform: "translateX(-10px)",
                }}
            >
                <h1 style={{ margin: 0, fontSize: "22px" }}>
                    From finding cards to deck building,
                </h1>
            </div>

            {/* Test Animation Section */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh",
                    transform: "translateX(-10px)",
                }}
            >
                <h1 className="hover-rainbow" style={{ margin: 0, fontSize: "22px" }}>
                    We have all your Magic the Gathering needs
                </h1>
            </div>

            
            <Footer />

            {/* Custom animations */}
            <style jsx>{`
                @keyframes rainbow {
                    0% {
                        color: #ffffff;
                    }
                    12.5% {
                        color: #6e9aff;
                    }
                    25% {
                        color: #989898;
                    }
                    37.5% {
                        color: #ed1515;
                    }
                    50% {
                        color: #22ff1f;
                    }
                    62.5% {
                        color: #dcdcdc;
                    }
                    75% {
                        color: #1f40ff;
                    }
                    87.5% {
                        color: #525252;
                    }
                    90% {
                        color: #c80d0d;
                    }
                    100% {
                        color: #008b06;
                    }
                }

                @keyframes moveText {
                    0% {
                        transform: translate(0, 0);
                    }
                    20% {
                        transform: translateY(-20px);
                    }
                    40% {
                        transform: translateX(20px);
                    }
                    60% {
                        transform: translateY(20px);
                    }
                    80% {
                        transform: translateX(-20px);
                    }
                    100% {
                        transform: translate(0, 0);
                    }
                }

                @keyframes moveInCircle {
                    0% {
                        transform: rotate(0deg) translate(10px) rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg) translate(10px) rotate(-360deg);
                    }
                }

                .hover-rainbow:hover {
                    animation: rainbow 5s infinite;
                }

                .hover-animation:hover {
                    animation: moveText 1s ease-in-out;
                    animation-fill-mode: forwards;
                }

                .hover-circle:hover {
                    animation: moveInCircle 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
