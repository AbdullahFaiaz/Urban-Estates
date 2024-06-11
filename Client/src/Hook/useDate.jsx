import { useState, useEffect } from 'react';

const useDate = () => {
    const [date, setDate] = useState('');

    useEffect(() => {
        const getCurrentDateInGMT6 = () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            setDate(formattedDate);
        };

        getCurrentDateInGMT6();

        const intervalId = setInterval(getCurrentDateInGMT6, 86400000); // Update once per day

        return () => clearInterval(intervalId);
    }, []);

    return date;
};

export default useDate;
