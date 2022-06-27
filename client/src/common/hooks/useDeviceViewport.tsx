import { useEffect, useState } from 'react';
import { DeviceViewport } from '@/types/interfaces';

const useDeviceViewport = (): DeviceViewport => {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);

  const setScreenSize = () => {
    setDeviceWidth(window.innerWidth);
    setDeviceHeight(window.innerHeight);
  };

  useEffect(() => {
    setScreenSize();
  }, []);

  return { deviceWidth: deviceWidth + 'px', deviceHeight: deviceHeight + 'px' };
};

export default useDeviceViewport;
