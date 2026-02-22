import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ size = 48, fullScreen = false }) => {
    const loaderEl = (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <Loader2
                size={size}
                color="var(--primary)"
                style={{
                    animation: 'spin 1s linear infinite'
                }}
            />
            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );

    if (fullScreen) {
        return (
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999
            }}>
                {loaderEl}
            </div>
        );
    }

    return loaderEl;
};

export default Loader;
