'use client'
import { useState } from 'react';

const Toggle = () => {
  const [enabled, setEnabled] = useState(false);

  /**
   * Function to toggle the enabled state value
   */
  const handleToggle = () => {
    setEnabled(!enabled);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={enabled} 
        onChange={handleToggle} 
        className="sr-only peer" 
      />
      <div className="w-10 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700 peer-checked:bg-gray-900"></div>
      <div className="absolute left-[2px] w-5 h-5 bg-white  rounded-full transition-all peer-checked:translate-x-4"></div>
    </label>
  );
};

export default Toggle;
