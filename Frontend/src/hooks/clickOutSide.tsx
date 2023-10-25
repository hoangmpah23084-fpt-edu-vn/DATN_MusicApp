import { useEffect, useRef } from 'react';

const useClickOutside = (handler:any) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event:any) => {  
        if (ref.current && !ref.current.contains(event.target)) {
          console.log(ref);
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export default useClickOutside;