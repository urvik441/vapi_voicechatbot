import React, { useState, useEffect } from 'react';
import './custom.css';

const VoiceBot = () => {
    const [botState, setBotState] = useState('idle'); // idle, listening, responding
    const [selectedFunction, setSelectedFunction] = useState(null);

    const functions = [
        { id: 1, name: 'Account Management', icon: '👤', gradient: 'gradient-1' },
        { id: 2, name: 'Device Management', icon: '📱', gradient: 'gradient-2' },
        { id: 3, name: 'Network Scanning', icon: '🌐', gradient: 'gradient-3' },
        { id: 4, name: 'Information Retrieval', icon: '📊', gradient: 'gradient-4' },
        { id: 5, name: 'Log Analysis', icon: '📝', gradient: 'gradient-5' }
    ];


    const handleFunctionClick = (func) => {
        setSelectedFunction(func.id);
        setBotState('listening');

        setTimeout(() => {
            setBotState('responding');
            setTimeout(() => {
                setBotState('idle');
                setSelectedFunction(null);
            }, 2000);
        }, 1500);
    };

    const handleCoreClick = () => {
        if (botState === 'idle') {
            setBotState('listening');
            setTimeout(() => {
                setBotState('responding');
                setTimeout(() => setBotState('idle'), 2000);
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
                {/* Greeting section */}
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
                        {botState !== 'idle' && (
                            <>
                                <div className={`core-glow glow-1 ${botState === 'listening' ? 'listening' : 'responding'}`}></div>
                                <div className={`core-glow glow-2 ${botState === 'responding' ? 'active' : ''}`}></div>
                            </>
                        )}

                        {/* Main core */}
                        <div className={`core-main ${botState}`}>
                            {/* Holographic effect */}
                            <div className="core-hologram"></div>

                            {/* Animated rings */}
                            <div className={`core-ring ring-1 ${botState}`}></div>
                            <div className={`core-ring ring-2 ${botState}`}></div>
                            <div className={`core-ring ring-3 ${botState}`}></div>

                            {/* Sound wave bars - listening state */}
                            {botState === 'listening' && (
                                <div className="sound-waves">
                                    {[...Array(7)].map((_, i) => (
                                        <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                    ))}
                                </div>
                            )}

                            {/* Rotating hexagon - responding state */}
                            {botState === 'responding' && (
                                <div className="hexagon-spinner">
                                    <div className="hexagon"></div>
                                    <div className="hexagon hexagon-2"></div>
                                </div>
                            )}

                            {/* Robot bot icon - idle state */}
                            {botState === 'idle' && (
                                <div className="bot-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="white">
                                        {/* Robot head */}
                                        <rect x="6" y="8" width="12" height="11" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        {/* Antenna */}
                                        <line x1="12" y1="8" x2="12" y2="5" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="12" cy="4" r="1" fill="white" />
                                        {/* Eyes */}
                                        <circle cx="9.5" cy="12" r="1.5" fill="white" className="bot-eye left-eye" />
                                        <circle cx="14.5" cy="12" r="1.5" fill="white" className="bot-eye right-eye" />
                                        {/* Mouth */}
                                        <path d="M9 15.5 Q12 17 15 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" className="bot-mouth" />
                                        {/* Arms */}
                                        <line x1="6" y1="12" x2="3" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" className="bot-arm left-arm" />
                                        <line x1="18" y1="12" x2="21" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" className="bot-arm right-arm" />
                                    </svg>
                                </div>
                            )}

                            {/* Particle effects */}
                            <div className="particles">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className={`particle particle-${i + 1} ${botState}`}></div>
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
                            {botState === 'idle' && 'READY'}
                            {botState === 'listening' && 'LISTENING...'}
                            {botState === 'responding' && 'PROCESSING...'}
                        </span>
                    </div>
                </div>

                {/* Function cards */}
                <div className="functions-grid">
                    {functions.map((func) => (
                        <button
                            key={func.id}
                            onClick={() => handleFunctionClick(func)}
                            disabled={botState !== 'idle'}
                            className={`function-card ${func.gradient} ${selectedFunction === func.id ? 'selected' : ''}`}
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