import { useEffect } from 'react';

/**
 * Custom React hook that triggers a callback when a user clicks outside a specified element.
 * 
 * @param {React.RefObject<HTMLElement>} ref - A reference to the target DOM element that you want to monitor for outside clicks.
 * @param {(event: MouseEvent | TouchEvent) => void} handler - The callback function to be executed when the click occurs outside the referenced element.
 * 
 * This hook adds event listeners for both mouse and touch events (`mousedown` and `touchstart`), and executes the provided 
 * `handler` function when the user clicks outside of the element specified by the `ref`.
 * 
 * The hook performs the following:
 * - Listens for `mousedown` and `touchstart` events on the document.
 * - Checks if the click target is outside the referenced element using `ref.current.contains(event.target)`.
 * - If the click happens outside, it calls the `handler` function.
 * - Cleans up the event listeners when the component unmounts or `ref` or `handler` changes.
 * 
 * This hook is useful for cases where you need to close dropdowns, modals, or tooltips when the user clicks outside.
 */


const useOnClickOutside = (ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or its descendants
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;




