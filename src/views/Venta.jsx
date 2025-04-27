import { useState, useEffect } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import GLOBE from 'vanta/dist/vanta.globe.min';

const myVenta = (myRef, vantaType) => {
  const [vantaEffect, setVantaEffect] = useState(null);

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
  }, [vantaEffect] || []);
};

export default myVenta;
