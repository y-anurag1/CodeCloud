import React, { useState, useEffect } from 'react';

interface TimerProps {
    isVisible: boolean;
}

const Timer: React.FC<TimerProps> = ({ isVisible }) => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);
    
    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    
    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };
    
    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
    };
    
    if (!isVisible) return null;
    
    return (
        <div className="flex items-center space-x-2 bg-[#252525] p-2 rounded-lg">
            <div className="text-white font-mono text-lg">
                {formatTime(time)}
            </div>
            <button
                onClick={handleStartStop}
                className={`px-3 py-1 rounded ${
                    isRunning 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-green-500 hover:bg-green-600'
                } text-white text-sm transition-colors`}
            >
                {isRunning ? 'Stop' : 'Start'}
            </button>
            <button
                onClick={handleReset}
                className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 text-white text-sm transition-colors"
            >
                Reset
            </button>
        </div>
    );
};

export default Timer; 