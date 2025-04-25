import React, { useContext, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TransitionContext from '../context/TransitionContext';

export default function Layers() {
  const main = useRef();
  const { completed } = useContext(TransitionContext);
  const scrollTween = useRef();
  const snapTriggers = useRef([]);
  const { contextSafe } = useGSAP(
    () => {
      if (!completed) return;
      let panels = gsap.utils.toArray('.panel'),
        scrollStarts = [0],
        snapScroll = (value) => value; // for converting a pixel-based scroll value to the closest panel scroll position

      // create a ScrollTrigger for each panel that's only concerned about figuring out when its top hits the top of the viewport. We'll use the "start" of that ScrollTrigger to figure out snapping positions.
      panels.forEach((panel, i) => {
        snapTriggers.current[i] = ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
        });
      });

      // once all the triggers have calculated their start/end, create the snap function that'll accept an overall progress value for the overall page, and then return the closest panel snapping spot based on the direction of scroll
      ScrollTrigger.addEventListener('refresh', () => {
        scrollStarts = snapTriggers.current.map((trigger) => trigger.start); // build an Array with just the starting positions where each panel hits the top of the viewport
        snapScroll = ScrollTrigger.snapDirectional(scrollStarts); // get a function that we can feed a pixel-based scroll value to and a direction, and then it'll spit back the closest snap position (in pixels)
      });

      ScrollTrigger.observe({
        type: 'wheel,touch',
        onChangeY(self) {
          if (!scrollTween.current) {
            // find the closest snapping spot based on the direction of scroll
            let scroll = snapScroll(
              self.scrollY() + self.deltaY,
              self.deltaY > 0 ? 1 : -1
            );
            goToSection(scrollStarts.indexOf(scroll)); // scroll to the index of the associated panel
          }
        },
      });

      ScrollTrigger.refresh();
    },
    {
      dependencies: [completed],
      scope: main,
      revertOnUpdate: true,
    }
  );

  let links = gsap.utils.toArray('#parallax__nav ul li a');

  links.forEach((link) => {
    let element = document.querySelector(link.getAttribute('href'));
    let linkST = ScrollTrigger.create({
      trigger: element,
      start: 'top top',
    });

    ScrollTrigger.create({
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => setActive(link),
    });

    link.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to(window, { duration: 1, scrollTo: linkST.start, overwrite: 'auto' });
    });
  });

  const goToSection = contextSafe((i) => {
    console.log('scroll to', i);
    scrollTween.current = gsap.to(window, {
      scrollTo: { y: snapTriggers.current[i].start, autoKill: false },
      duration: 1,
      onComplete: () => (scrollTween.current = null),
      overwrite: true,
    });
  });

  return (
    <main ref={main}>
      <section className="panel gray">
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
          <div className="scroll-down">
            Scroll down<div className="arrow"></div>
          </div>
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
            여러 보험사를 비교해서
            <br />
            <span>최적에 보장</span>을
            <br />
            <span>합리적인 보험료</span>로
            <br />
            설계해드립니다.
          </p>
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
          <button className="kakaoButton"></button>
        </div>
      </section>
      <section id="section3" className="panel dark">
        <div>
          <h1>고객 후기</h1>
          <span>문*지님</span>
          <p>
            "기존에 20만원 납부하던걸 15만원으로 줄였는데,
            <br />
            받는 보장이 더 많아졌어요!"
          </p>
          <span>이*혁님</span>
          <p>
            "제 몸 상황에 맞는 보험을
            <br />
            여러개 추천해주시니 믿음스러웠어요!"
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
        <h1>
          아래의 폼을 작성해주시면 정만제가
          <br />
          연락드리도록 하겠습니다.
        </h1>
      </section>
    </main>
  );
}
