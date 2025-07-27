import React, { useContext, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from 'react-device-detect';
import TransitionContext from '../context/TransitionContext';
import Vanta from './Venta'; // VantaEffect 컴포넌트 임포트
// import useWindowControl from '../util/useWindowControl';
import profileImg from '../assets/photo-mattbomer.jpeg';

// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;
const KAKAO_ADMIN_KEY = import.meta.env.VITE_KAKAO_ADMIN_KEY;
const KAKAO_PUBLIC_KEY = '_xgxkEFn';

const Layers = () => {
  const main = useRef();
  const { completed } = useContext(TransitionContext);
  const scrollTween = useRef();
  const snapTriggers = useRef([]);

  useEffect(() => {
    // 카카오 스크립트가 로드된 경우
    if (Kakao) {
      // 인증이 안되어있는 경우 인증한다.
      if (!Kakao.isInitialized()) {
        // init 해주기 전에 clean up 을 해준다.
        Kakao.cleanup();
        // 카카오에서 제공받은 Admin key를 넣어줌 -> .env파일에서 호출시킴
        Kakao.init(KAKAO_ADMIN_KEY);
        Kakao.isInitialized();
      }
    }
  }, []);

  const onClickChatChannel = () => {
    Kakao.Channel.chat({
      channelPublicId: KAKAO_PUBLIC_KEY, // 추가하려는 채널 Public ID 입력
    });
  };

  // venta net 백그라운드
  const netRef = useRef(null);
  const globeRef = useRef(null);

  return (
    <main ref={main}>
      <section
        id="section0"
        ref={netRef}
        className={`panel gray ${isMobile ? 'panel_mobile' : ''}`}
      >
        <Vanta myRef={netRef} vantaType="NET" />{' '}
        {/* Vanta 컴포넌트 렌더링 */}
        <div>
          <h1>
            미래를 위한 보험은
            <br />
            필수로 준비를 하셔야됩니다
          </h1>
          <p>
            건강보험공단에 재정난으로 인해서
            <br />
            급여로 지원을 해주고있던 의료비가
            <br />
            비급여로 많이 변경되고있습니다.
          </p>
        </div>
        <div className="scroll-down">
          Scroll down<div className="arrow"></div>
        </div>
      </section>
      <section id="section1" className="panel dark">
        <div>
          <h1>왜 정만제냐?</h1>
          <p>
            <span>32개의 보험회사</span>를
            <br />
            전부 다 취급할 수있는
            <br />
            <span>GA 법인대리점</span>에 근무중입니다.
            <br />
            <br />
            여러 보험사를
            <br />
            비교해서
            <br />
            <span>최적에 보장</span>을
            <br />
            <span>합리적인 보험료</span>로
            <br />
            설계해드립니다.
          </p>
          <div className="ideaImg"></div>
        </div>
      </section>
      <section id="section2" className="panel gray">
        <div>
          <h1>카카오 상담 신청하기</h1>
          <p>
            카카오채널을 통해
            <br />
            소상공인과 정책자금 관련 업무를
            <br />
            직접 상담해 드립니다.
          </p>
          <button
            onClick={onClickChatChannel}
            className="kakaoButton"
          ></button>
        </div>
      </section>
      <section
        ref={globeRef}
        id="section3"
        className={`panel dark ${isMobile ? 'panel_mobile' : ''}`}
      >
        <Vanta myRef={globeRef} vantaType="GLOBE" />{' '}
        {/* Vanta 컴포넌트 렌더링 */}
        <div>
          <h1>고객 후기</h1>
          <span>문*지님</span>
          <p>
            "기존에 20만원 납부하던걸
            <br />
            15만원으로 줄였는데,
            <br />
            받는 보장이 더 많아졌어요!"
          </p>
          <span>이*혁님</span>
          <p>
            "제 몸 상황에 맞는 보험을
            <br />
            여러개 추천해주시니
            <br />
            믿음직스러웠어요!"
          </p>
          <span>이*건님</span>
          <p>
            "저랑 상담해주시려고
            <br />
            경기도에서 전라도까지 와주셨어요!
            <br />
            열정이 대단해요."
          </p>
        </div>
      </section>
      <section id="section4" className="panel gray">
        <div>
          <div className="profileImg">
            <img src={profileImg} />
          </div>
          <h1>
            아래 버튼을 클릭하여
            <br />
            상담 신청을 해주시면
            <br />
            정만제가 연락드리겠습니다.
          </h1>
          <div>
            <button
              className="naverFormButton"
              onClick={() =>
                openWindow('https://naver.me/5neyNriu', '_blank')
              }
            >
              상담 신청하기
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Layers;
