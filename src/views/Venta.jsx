import { useState, useEffect } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import GLOBE from 'vanta/dist/vanta.globe.min';
import useIsMobile from '../util/useIsMobile';

const myVenta = (myRef, vantaType) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  // 모바일인지 확인하는 커스텀 훅
  const isMobile = useIsMobile();

  if (!isMobile) {
    useEffect(() => {
      if (!vantaEffect) {
        if (vantaType === 'NET') {
          setVantaEffect(
            NET({
              el: myRef.current,
              // THREE: THREE, // use a custom THREE when initializing
              color: 0xabadcd,
              backgroundColor: 0x212124,
            })
          );
        } else {
          setVantaEffect(
            GLOBE({
              el: myRef.current,
              // THREE: THREE, // use a custom THREE when initializing
              color: 0xabadcd,
              backgroundColor: 0x1a1a1a,
            })
          );
        }
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }, [vantaEffect]);
  }
};

export default myVenta;
