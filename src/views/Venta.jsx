import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three'; // Import Three.js
import NET from 'vanta/dist/vanta.net.min';
import GLOBE from 'vanta/dist/vanta.globe.min';

const Vanta = ({ myRef, vantaType }) => {
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!myRef.current) return; // ref가 유효한지 확인

    let currentEffect;

    const initializeVanta = () => {
      const options = {
        el: myRef.current,
        THREE: THREE, // 명시적으로 THREE 전달
        color: 0xabadcd,
        backgroundColor: 0x212124,
        // 필요에 따라 다른 옵션 추가
      };

      try {
        if (vantaType === 'NET') {
          currentEffect = NET(options);
        } else {
          currentEffect = GLOBE({
            ...options,
            backgroundColor: 0x1a1a1a, // GLOBE에 맞는 backgroundColor
          });
        }
        setVantaEffect(currentEffect);
      } catch (error) {
        console.error('Vanta.js 초기화 오류:', error);
      }
    };

    initializeVanta();

    return () => {
      if (currentEffect && currentEffect.destroy) {
        try {
          currentEffect.destroy();
        } catch (error) {
          console.error('Vanta.js 정리 오류:', error);
        }
      }
    };
  }, [myRef, vantaType]);

  return null; // 아무것도 렌더링하지 않음
};

export default Vanta;
