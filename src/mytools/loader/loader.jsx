import React from 'react';

const Preloader = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-transparent">
            <img src="https://i.ibb.co/8nWq2JTs/sample-0-4.jpg" alt="Loading..." className="animate-spin w-20 h-20" />
        </div>
    );
};

export default Preloader;
