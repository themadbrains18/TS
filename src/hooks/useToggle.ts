import { useState } from 'react';

const useToggle = (initialValue: boolean = false) => {
    const [value, setValue] = useState(initialValue);

    const toggle = () => setValue((prev) => !prev);

    return [value, toggle] as const;
};

export default useToggle;

// use like this :==
// const [isToggled, toggle] = useToggle();
