import { useState, useEffect } from 'react';

const useWindowControl = () => {
  const [windowRef, setWindowRef] = useState(null);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [lastKnownUrl, setLastKnownUrl] = useState('');

  // 창 열기
  const openWindow = (url, name = '_blank', features = '') => {
    const newWindow = window.open(url, name, features);
    setWindowRef(newWindow);
    setIsWindowOpen(true);
    setLastKnownUrl(url);
    return newWindow;
  };

  // 창 닫기
  const closeWindow = () => {
    if (windowRef && !windowRef.closed) {
      windowRef.close();
      setIsWindowOpen(false);
    }
  };

  // URL 변경 시도
  const navigateTo = (url) => {
    if (windowRef && !windowRef.closed) {
      try {
        windowRef.location.href = url;
        setLastKnownUrl(url);
        return true;
      } catch (error) {
        console.error('URL 변경 실패:', error);
        return false;
      }
    }
    return false;
  };

  // 창 상태 모니터링
  useEffect(() => {
    let interval;

    if (windowRef) {
      interval = setInterval(() => {
        try {
          if (windowRef.closed) {
            setIsWindowOpen(false);
            clearInterval(interval);
          } else {
            // 같은 출처일 경우에만 URL 접근 시도
            try {
              const currentUrl = windowRef.location.href;
              if (currentUrl !== lastKnownUrl) {
                setLastKnownUrl(currentUrl);
              }
            } catch (e) {
              // 다른 출처로 이동한 경우 에러가 발생하지만 무시
            }
          }
        } catch (e) {
          // 창 참조에 문제가 있는 경우
          setIsWindowOpen(false);
          clearInterval(interval);
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [windowRef, lastKnownUrl]);

  return {
    windowRef,
    isWindowOpen,
    lastKnownUrl,
    openWindow,
    closeWindow,
    navigateTo,
  };
};

export default useWindowControl;
