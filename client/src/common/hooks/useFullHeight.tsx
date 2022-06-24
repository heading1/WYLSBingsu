import { useEffect, useState } from 'react';

const useFullHeight = (): string => {
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);

  const setScreenSize = () => {
    setDeviceHeight(window.innerHeight);
  };

  useEffect(() => {
    setScreenSize();
  }, []);

  return deviceHeight + 'px';
};

export default useFullHeight;
