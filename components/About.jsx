'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

const problems = [
  '복잡한 서류, 어디서부터 손대야 할지 모르겠어요',
  '매출이 작아도 받을 수 있을까요?',
  '우리 업종도 정책자금 대상이 될까요?',
  '매번 신청하려고 하면 조기 마감이네요',
  '혼자 해보다가 승인 거절됐어요',
  '어느 기관에, 언제 신청해야 하는지도 모르겠어요',
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              정책자금이란?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              아직도 <span className="text-primary">정책자금</span>
              <br />못 받으셨나요?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              매년{' '}
              <span className="text-foreground font-semibold">
                20조 원
              </span>{' '}
              이상 쏟아지는 정책자금과 지원금, 대표님의 몫은 어디에
              있습니까?
            </p>

            {/* Comparison */}
            <div className="bg-linear-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">
                    자본 10억 기업 vs 1억 기업
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    단순히 자금 규모만의 차이가 아닙니다.
                    <br />
                    <span className="text-primary font-medium">
                      지원받을 수 있는 정책자금을 아느냐, 모르느냐
                    </span>
                    의 차이입니다.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <span>
                아직도 개인 자금으로만 사업을 운영 중이신가요?
              </span>
            </motion.div>
          </motion.div>

          {/* Right Content - Problems */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-xl shadow-primary/10 p-8 border border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-primary" />
                </span>
                이런 고민, 대표님도 있으신가요?
              </h3>

              <div className="space-y-4">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.1,
                    }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-primary/5 transition-colors group"
                  >
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">
                      {problem}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 p-4 rounded-xl bg-linear-to-r from-primary to-accent text-white text-center"
              >
                <p className="font-semibold">
                  하나라도 해당된다면,
                  <br />
                  <span className="text-lg">
                    전문 컨설팅이 답을 드릴 차례입니다.
                  </span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
