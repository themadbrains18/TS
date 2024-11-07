import { useState } from 'react';

/**
 * Custom React hook to toggle a boolean value between true and false.
 * 
 * @param {boolean} initialValue - The initial value for the toggle state (default is `false`).
 */

const useToggle = (initialValue: boolean = false) => {
    const [value, setValue] = useState(initialValue);

    const toggle = () => setValue((prev) => !prev);

    return [value, toggle] as const;
};

export default useToggle;

