import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { Typewriter } from 'react-simple-typewriter';
import TransitionContext from '../context/TransitionContext';
import Vanta from './Venta';
import logo from '../assets/logo.png';
import image0 from '../assets/image0.jpg';
import image1 from '../assets/image1.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// MUI icons 임포트
import PersonIcon from '@mui/icons-material/Person'; // 노무
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // 회계
import DescriptionIcon from '@mui/icons-material/Description'; // 세무
import GavelIcon from '@mui/icons-material/Gavel'; // 법무
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; // 사고대차
import BuildIcon from '@mui/icons-material/Build'; // 손해사정
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // 마케팅
import SecurityIcon from '@mui/icons-material/Security'; // 보험

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

// 추가: 제휴사 로고 이미지 import
import partner1 from '../assets/partner1.png';
import partner2 from '../assets/partner2.png';
import partner3 from '../assets/partner3.png';
import partner4 from '../assets/partner4.png';
import partner5 from '../assets/partner5.png';

// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;
const KAKAO_ADMIN_KEY = import.meta.env.VITE_KAKAO_ADMIN_KEY;
const KAKAO_PUBLIC_KEY = '_xgxkEFn';

gsap.registerPlugin(ScrollTrigger);

const Layers = () => {
  const main = useRef();
  const section0Ref = useRef(); // section0에 대한 ref 생성
  const section01Ref = useRef(); // section1에 대한 ref 생성
  const section2Ref = useRef(); // section2에 대한 ref 생성
  const { completed } = useContext(TransitionContext);
  const scrollTween = useRef();
  const snapTriggers = useRef([]);
  const [hasTyped, setHasTyped] = useState(false); // 타이핑 효과 실행 여부 상태
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 예시: 화면 너비가 768px 이하일 때 모바일로 간주
    };

    // 컴포넌트가 마운트될 때 초기 값 설정
    handleResize();

    // 화면 크기가 변경될 때마다 handleResize 함수 실행
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const typewriterComponent = useMemo(
    () => (
      <Typewriter
        words={['전문가와 연결되는 가장 빠른 길!']}
        loop={1}
        cursor
        cursorStyle="|"
        typeSpeed={100}
        deleteSpeed={50}
        delaySpeed={1500}
        onLoopDone={() => setHasTyped(true)} // 타이핑이 완료되면 상태 업데이트
      />
    ),
    []
  );

  // hasTyped와 isMobile 값을 콘솔에 출력하여 확인
  console.log('hasTyped:', hasTyped, 'isMobile:', isMobile);

  const openWindow = (url, target) => {
    const newWindow = window.open(url, target);
    if (newWindow) {
      newWindow.focus();
    } else {
      console.error(
        '팝업 차단이 활성화되어 있습니다. 팝업을 허용해주세요.'
      );
    }
  };

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
  const globeRef = useRef(null);

  useGSAP(
    () => {
      // section0에 대한 ScrollTrigger 설정
      gsap.to('.section0-content', {
        yPercent: -30, // 스크롤 거리에 따라 위로 30% 이동
        scrollTrigger: {
          trigger: section0Ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1, // 부드러운 스크롤 효과
          markers: true, // 개발용 마커 (선택 사항)
          invalidateOnRefresh: true, // 새로고침 시 초기화
        },
      });
      gsap.to('.section01-content', {
        yPercent: -75, // Adjust as needed
        scrollTrigger: {
          trigger: section01Ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1, // 부드러운 스크롤 효과
          markers: true, // 개발용 마커 (선택 사항)
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // section2에 대한 애니메이션
      gsap.fromTo(
        '#section2 .inner-content', // section2 내부의 콘텐츠를 선택
        { opacity: 0 }, // 초기 상태: 투명도 0
        {
          opacity: 1, // 최종 상태: 투명도 1
          duration: 1, // 애니메이션 시간
          ease: 'power3.out', // 부드러운 애니메이션 효과
          scrollTrigger: {
            trigger: '#section2', // section2가 트리거
            start: '50% center', // section2의 top이 뷰포트의 center에 닿을 때 시작
            end: 'bottom center', // section2의 bottom이 뷰포트의 center에 닿을 때 종료
            scrub: true, // 스크롤에 따라 애니메이션
            markers: true, // 마커 표시 (개발용)
            invalidateOnRefresh: true,
          },
        }
      );

      // section2에 대한 ScrollTrigger 설정
      ScrollTrigger.create({
        trigger: section2Ref.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        scrub: 1,
        markers: true,
      });
    },
    { scope: main }
  );

  return (
    <main ref={main}>
      <section
        ref={section0Ref} // section0에 ref 연결
        id="section0"
        className="panel dark"
      >
        <div className="section0-content">
          <img className="logo" src={logo} alt="정만제 로고" />
          <h1>
            {!hasTyped && !isMobile ? (
              typewriterComponent
            ) : (
              <>
                전문가와 연결되는
                <br />
                가장 빠른 길!
              </>
            )}
          </h1>
          {!isMobile ? (
            <p>
              노무·회계·세무·손해사정·법무·사고대차·마케팅
              <br />
              분야의 전문가들과의 연결을 도와드립니다.
              <br />
              <em>
                ※ 일부 서비스는 외부 제휴 전문가/업체를 통해
                연결됩니다.
              </em>
            </p>
          ) : (
            <p>
              노무·회계·세무·손해사정
              <br />
              법무·사고대차·마케팅
              <br />
              분야의 전문가들과의
              <br />
              연결을 도와드립니다.
              <br />
              <em>
                ※ 일부 서비스는 외부 제휴 전문가/업체를 통해
                연결됩니다.
              </em>
            </p>
          )}
        </div>
        <div className="scroll-down">
          Scroll down
          <div className="arrow"></div>
        </div>
      </section>
      <section
        ref={section01Ref}
        id="section01"
        className="panel panel_mobile"
      >
        <div className="section01-content">
          <div className="section-img">
            <img src={image0} alt="Description of image0" />
          </div>
          <div className="section01-text">
            <span className="desc">
              <PersonIcon />
              <strong>노무 자문</strong>
            </span>
            <div>
              제휴 노무사와 연결하여,
              <br />
              인사관리 및 노동 관련 자문을
              <br />
              받으실 수 있습니다.
            </div>
          </div>
          <div className="section01-text">
            <span className="desc">
              <AccountBalanceIcon />
              <strong>회계 지원</strong>
            </span>
            <div>
              검증된 회계사/세무사 사무소와 연계해
              <br />
              회계관리 지원을 도와드립니다.
            </div>
          </div>
          <div className="section01-text">
            <span className="desc">
              <DescriptionIcon />
              <strong>세무 소개</strong>
            </span>
            <div>
              종합소득세, 부가세 신고 등
              <br />
              세무 관련 전문가는
              <br />
              제휴처를 통해 소개해드립니다.
            </div>
          </div>
          <div className="section01-text">
            <span className="desc">
              <GavelIcon />
              <strong>법무 연결</strong>
            </span>
            <div>
              사건에 따라 적합한
              <br />
              법무법인/변호사와 연결해드립니다.
            </div>
          </div>
          <div className="section01-text">
            <span className="desc">
              <DirectionsCarIcon />
              <strong>사고대차(렌트카)</strong>
            </span>
            <div>
              사고 발생 시, 제휴 렌터카 업체와
              <br />
              빠르게 연결해드립니다.
            </div>
          </div>
          <div className="section01-text">
            <span className="desc">
              <BuildIcon />
              <strong>손해사정</strong>
            </span>
            <div>
              보험사와의 원활한 손해 보상을 위해
              <br />
              전문가 네트워크를 제공합니다.
            </div>
          </div>
          <div className="section01-text">
            <span className="desc">
              <TrendingUpIcon />
              <strong>마케팅 협력</strong>
            </span>
            <div>
              브랜딩, 광고 대행 등
              <br />
              마케팅 분야 전문 업체와 협력해드립니다.
            </div>
          </div>
          <div className="section01-text">
            <span className="desc">
              <SecurityIcon />
              <strong>보험 설계</strong>
            </span>
            <div>
              (직접 제공) 다양한 보험상품을
              <br />
              상담/설계해드립니다.
            </div>
          </div>
          {/* 제휴사 로고 Carousel */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="partner-swiper"
          >
            <SwiperSlide>
              <img src={partner1} alt="Partner 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={partner2} alt="Partner 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={partner3} alt="Partner 3" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={partner4} alt="Partner 4" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={partner5} alt="Partner 5" />
            </SwiperSlide>
          </Swiper>
          <div className="disclaimer">
            ※ 본 페이지에서 제공하는 일부 서비스는 당사가 직접
            수행하지 않으며, 전문 분야에 따라 외부 제휴
            전문가/업체와의 연계를 통해 진행됩니다.
            <br />※ 연결된 전문가와의 계약 및 법적 책임은 각 당사자
            간에 있으며, 당사는 중개 역할만 수행합니다.
          </div>
        </div>
      </section>
      <section
        ref={section2Ref} // section2에 ref 연결
        id="section2"
        className="panel dark2"
      >
        <div className="section-img section-img2">
          <img src={image1} />
        </div>
        <div className="inner-content">
          <h1>카카오 상담 신청하기</h1>
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
        <Vanta myRef={globeRef} vantaType="GLOBE" />
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
          <img className="logo" src={logo} alt="정만제 로고" />
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
