import { useEffect, useState } from 'react';

type EventProps = {
  key: string;
  preventDefault: Function;
};

const useKeyPress = (targetKey: string, preventsDefault: Boolean = false) => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  const downHandler = (event: EventProps) => {
    if (event.key === targetKey) {
      setKeyPressed(true);
      if (preventsDefault) {
        event.preventDefault();
      }
    }
  };

  // If released key is our target key then set to false
  const upHandler = (event: EventProps) => {
    if (event.key === targetKey) {
      setKeyPressed(false);
      if (preventsDefault) {
        event.preventDefault();
      }
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
    // eslint-disable-next-line
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
};

export default useKeyPress;
