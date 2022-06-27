import { useEffect, useState } from 'react';
import { DeviceViewport } from '@/types/interfaces';

const useDeviceViewport = (): DeviceViewport => {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth + 'px');
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight + 'px');
  const RESPONSIVE_WIDTH = 768;

  const setScreenSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width > RESPONSIVE_WIDTH) {
      console.log(true);
      setDeviceWidth(26 + 'rem');
    } else {
      setDeviceWidth(width + 'px');
    }

    setDeviceHeight(height + 'px');
  };

  useEffect(() => {
    setScreenSize();
  }, []);

  return { deviceWidth: deviceWidth, deviceHeight: deviceHeight };
};

export default useDeviceViewport;
