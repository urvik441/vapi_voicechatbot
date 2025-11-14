import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";
import "./custom.css";

const VoiceBot = ({ assistantId, assistantDetails }) => {
    const [botState, setBotState] = useState("idle"); // idle, listening, responding
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [isCallActive, setIsCallActive] = useState(false);
    const [vapi, setVapi] = useState(null);
    const [webCallDuration, setWebCallDuration] = useState(0);
    const [name, setName] = useState("");
    const timerRef = useRef(null);

    const functions = [
        { id: 1, name: "Account Management", icon: "👤", gradient: "gradient-1" },
        { id: 2, name: "Device Management", icon: "📱", gradient: "gradient-2" },
        { id: 3, name: "Network Scanning", icon: "🌐", gradient: "gradient-3" },
        { id: 4, name: "Information Retrieval", icon: "📊", gradient: "gradient-4" },
        { id: 5, name: "Log Analysis", icon: "📝", gradient: "gradient-5" },
    ];

    // 🎯 Core function (copied logic from your version)
    const handleWebCall = (action) => {
        if (action === "start") {
            if (!isCallActive) {
                const newVapi = new Vapi("6928fa8c-9f81-4bca-b37c-e2d69ead3dfc");
                newVapi.start("ef5d27c5-93ff-4095-8263-61578b650a38");
                setName(assistantDetails?.name);
                setVapi(newVapi);
                setIsCallActive(true);
                setBotState("listening");
                console.log("Call started");

                timerRef.current = setInterval(() => {
                    setWebCallDuration((prevDuration) => prevDuration + 1);
                }, 1000);

                // Optional listeners for live updates
                newVapi.on("conversation.transcript", (event) => {
                    console.log("User:", event.transcript);
                    setBotState("listening");
                });

                newVapi.on("conversation.response", (event) => {
                    console.log("Assistant:", event.response);
                    setBotState("responding");
                });

                newVapi.on("conversation.end", () => {
                    console.log("Assistant call ended");
                    handleWebCall("stop");
                });
            }
        } else if (action === "stop") {
            if (isCallActive && vapi) {
                vapi.stop();
                setVapi(null);
                setIsCallActive(false);
                setBotState("idle");
                console.log("Call stopped");

                clearInterval(timerRef.current);
                setWebCallDuration(0);
            }
        }
    };

    // 🎤 On robot icon click → start or stop assistant call
    const handleCoreClick = () => {
        if (!isCallActive) {
            handleWebCall("start");
        } else {
            handleWebCall("stop");
        }
    };

    const handleFunctionClick = (func) => {
        setSelectedFunction(func.id);
        if (botState === "idle") {
            setBotState("listening");
            setTimeout(() => {
                setBotState("responding");
                setTimeout(() => {
                    setBotState("idle");
                    setSelectedFunction(null);
                }, 2000);
            }, 1500);
        }
    };

    return (
        <div className="voice-bot-container">
            {/* Animated background effects */}
            <div className="bg-grid"></div>
            <div className="bg-orbs">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            {/* Main content */}
            <div className="main-content">
                <div className="greeting-section">
                    <h1 className="greeting-title">
                        <span className="greeting-text">How may I help you today?</span>
                    </h1>
                    <div className="title-underline"></div>
                </div>

                {/* Voice Bot Core */}
                <div className="core-container" onClick={handleCoreClick}>
                    <div className="core-wrapper">
                        {/* Outer glow effects */}
                        {botState !== "idle" && (
                            <>
                                <div
                                    className={`core-glow glow-1 ${botState === "listening" ? "listening" : "responding"
                                        }`}
                                ></div>
                                <div
                                    className={`core-glow glow-2 ${botState === "responding" ? "active" : ""
                                        }`}
                                ></div>
                            </>
                        )}

                        {/* Main core */}
                        <div className={`core-main ${botState}`}>
                            <div className="core-hologram"></div>
                            <div className={`core-ring ring-1 ${botState}`}></div>
                            <div className={`core-ring ring-2 ${botState}`}></div>
                            <div className={`core-ring ring-3 ${botState}`}></div>

                            {botState === "listening" && (
                                <div className="sound-waves">
                                    {[...Array(7)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="wave-bar"
                                            style={{ animationDelay: `${i * 0.1}s` }}
                                        ></div>
                                    ))}
                                </div>
                            )}

                            {botState === "responding" && (
                                <div className="hexagon-spinner">
                                    <div className="hexagon"></div>
                                    <div className="hexagon hexagon-2"></div>
                                </div>
                            )}

                            {botState === "idle" && (
                                <div className="bot-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="white">
                                        <rect
                                            x="6"
                                            y="8"
                                            width="12"
                                            height="11"
                                            rx="2"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <line
                                            x1="12"
                                            y1="8"
                                            x2="12"
                                            y2="5"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <circle cx="12" cy="4" r="1" fill="white" />
                                        <circle cx="9.5" cy="12" r="1.5" fill="white" />
                                        <circle cx="14.5" cy="12" r="1.5" fill="white" />
                                        <path
                                            d="M9 15.5 Q12 17 15 15.5"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            fill="none"
                                        />
                                        <line
                                            x1="6"
                                            y1="12"
                                            x2="3"
                                            y2="14"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <line
                                            x1="18"
                                            y1="12"
                                            x2="21"
                                            y2="14"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            )}

                            {/* Particles */}
                            <div className="particles">
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`particle particle-${i + 1} ${botState}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status indicator */}
                <div className="status-section">
                    <div className={`status-indicator ${botState}`}>
                        <span className="status-dot"></span>
                        <span className="status-text">
                            {botState === "idle" && "READY"}
                            {botState === "listening" && "LISTENING..."}
                            {botState === "responding" && "RESPONDING..."}
                        </span>
                    </div>
                </div>

                {/* Function cards */}
                <div className="functions-grid">
                    {functions.map((func) => (
                        <button
                            key={func.id}
                            onClick={() => handleFunctionClick(func)}
                            disabled={botState !== "idle"}
                            className={`function-card ${func.gradient} ${selectedFunction === func.id ? "selected" : ""
                                }`}
                        >
                            <div className="card-shine"></div>
                            <div className="card-content">
                                <span className="card-icon">{func.icon}</span>
                                <span className="card-label">{func.name}</span>
                            </div>
                            <div className="card-border"></div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VoiceBot;
