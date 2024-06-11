import { useState, useEffect } from 'react';

const useTime = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const getCurrentTimeInGMT6 = () => {
            const date = new Date();
            const utcHours = date.getUTCHours();
            const utcMinutes = date.getUTCMinutes();
            const gmt6Hours = (utcHours + 6) % 24;
            const isAM = gmt6Hours < 12;
            const formattedHours = String(isAM ? gmt6Hours : gmt6Hours - 12).padStart(2, '0');
            const formattedMinutes = String(utcMinutes).padStart(2, '0');
            const amPm = isAM ? 'AM' : 'PM';
            const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;
            setTime(formattedTime);
        };

        getCurrentTimeInGMT6();

        const intervalId = setInterval(getCurrentTimeInGMT6, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return time;
};

export default useTime;




// import { useState, useEffect } from 'react';

// const useTime = () => {
//     const [time, setTime] = useState('');

//     useEffect(() => {
//         const getCurrentTimeInGMT6 = () => {
//             const date = new Date();
//             const utcHours = date.getUTCHours();
//             const utcMinutes = date.getUTCMinutes();
//             const gmt6Hours = (utcHours + 6) % 24;
//             const formattedTime = `${String(gmt6Hours).padStart(2, '0')}:${String(utcMinutes).padStart(2, '0')}`;
//             setTime(formattedTime);
//         };

//         getCurrentTimeInGMT6();

//         const intervalId = setInterval(getCurrentTimeInGMT6, 60000);

//         return () => clearInterval(intervalId);
//     }, []);

//     return time;
// };

// export default useTime;