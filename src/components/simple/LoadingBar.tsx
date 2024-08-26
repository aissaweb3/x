'use client'
import React, { useEffect, useState } from 'react';

const LoadingBar: React.FC = () => {
  const [loading, setLoading] = useState<number>(0); // Initial loading value

  useEffect(() => {
    const totalTime = 1 * 60 * 1000; // Total time in milliseconds (10 minutes)
    const interval = 1000; // Update interval in milliseconds (1 second)

    const increment = 100 / (totalTime / interval); // Amount to increment every second

    const loadingInterval = setInterval(() => {
      setLoading((prevLoading) => {
        const newLoading = prevLoading + increment; // Increment loading value
        return newLoading >= 100 ? 100 : newLoading; // Cap loading at 100%
      });
    }, interval);

    return () => {
      clearInterval(loadingInterval); // Cleanup the interval on component unmount
    };
  }, []);

  return (
    <div style={{ width: '100%', backgroundColor: '#ddd' }}>
      <div
        style={{
          width: `${loading}%`,
          height: '30px',
          backgroundColor: '#007BFF',
          transition: 'width 1s ease-in-out',
        }}
      ></div>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        {loading.toFixed(2)}%
      </p>
    </div>
  );
};

export default LoadingBar;
