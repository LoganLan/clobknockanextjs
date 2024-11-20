"use client";

import React from 'react';
import Heading from "@/app/components/Heading";
import Footer from "@/app/components/Footer";

export default function Home() {
    return (
        <div style={{ backgroundColor: 'Gray', minHeight: '100vh' }}>
            {/* Light gray background */}
            <Heading />

            {/* Main Content */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '10vh',
                    transform: 'translateX(-10px)',
                }}
            >
                <h1 style={{ margin: 0, fontSize: '30px' }}>Clobknocka</h1>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '10vh',
                    transform: 'translateX(-10px)',
                }}
            >
                <h1 style={{ margin: 0, fontSize: '22px' }}>
                    A Database for Magic the Gathering
                </h1>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '10vh',
                    transform: 'translateX(-10px)',
                }}
            >
                <h1 style={{ margin: 0, fontSize: '22px' }}>
                    From finding cards to deck building,
                </h1>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '10vh',
                    transform: 'translateX(-10px)',
                }}
            >
                <h1
                    className="hover-rainbow"
                    style={{ margin: 0, fontSize: '22px' }}
                >
                    We have all your Magic the Gathering needs
                </h1>
            </div>

            {/* Animated Circle Text */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '10vh',
                    transform: 'translateX(-10px)',
                }}
            >
                
            </div>

            {/* Footer */}
            <Footer />

            {/* Custom animations */}
            <style jsx>{`
                @keyframes rainbow {
                    0% {
                        color: #ffffff;
                    } /* White */
                    12.5% {
                        color: #6e9aff;
                    } /* Cornflower_Blue */
                    25% {
                        color: #989898;
                    } /* battleship-grey */
                    37.5% {
                        color: #ed1515;
                    } /* Red(CMYK) */
                    50% {
                        color: #22ff1f;
                    } /* Green */
                    62.5% {
                        color: #dcdcdc;
                    } /* platinum */
                    75% {
                        color: #1f40ff;
                    } /* Palatinate_Blue */
                    87.5% {
                        color: #525252;
                    } /* Davys-Gray */
                    90% {
                        color: #c80d0d;
                    } /* Engineering_Orange */
                    100% {
                        color: #008b06;
                    } /* India_Green */
                }

                .hover-rainbow:hover {
                    animation: rainbow 5s infinite; /* Apply the animation */
                }

                // .circle-hover {
                //     display: inline-block;
                //     font-size: 24px;
                //     font-weight: bold;
                //     position: relative;
                //     cursor: pointer;
                //     animation: rotateText 2s linear infinite;
                //     animation-play-state: paused; /* Animation is paused by default */
                // }

                // .circle-hover:hover {
                //     animation-play-state: running; /* Animation runs when hovered */
                // }

                // @keyframes rotateText {
                //     0% {
                //         transform: rotate(0deg) translateX(3px) rotate(0deg);
                //     }
                //     100% {
                //         transform: rotate(360deg) translateX(3px) rotate(-360deg);
                //     }
                // }
            `}</style>
        </div>
    );
}
