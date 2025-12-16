'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, TrendingUp, Users, Award, Coffee, Monitor, Factory, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { value: 3000, suffix: '건+', label: '정책자금 성공사례', icon: Award },
  { value: 95, suffix: '%', label: '자금조달 성공률', icon: TrendingUp },
  { value: 87, suffix: '%', label: '추가 자금조달 성공률', icon: Users },
];

const cases = [
  {
    icon: Coffee,
    title: '최대표 청년창업 카페',
    year: '2023년',
    description: '초기 운영자금 부족으로 자금난 발생',
    solution: '청년창업자금 및 정책자금 컨설팅 진행',
    result: '창업자금 1억 원 실행',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Factory,
    title: '이대표 제조업',
    year: '1998년 창업',
    description: '기존 정책자금 지원 한도 초과로 어려움',
    solution: '경영지원 전략 수립, 추가 정책자금 확보',
    result: '정책자금 3억 4,000만 원 실행',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Building2,
    title: '김대표 도소매업',
    year: '2021년 창업',
    description: '재무 및 세무관리, 법인구조조정 필요',
    solution: '컨설팅을 통해 2회 정책자금 실행',
    result: '총 8억 이상 정책자금 실행',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Monitor,
    title: '한대표 IT 스타트업',
    year: '2022년 창업',
    description: '기술개발 및 마케팅 비용 부담',
    solution: '기술보증기금 보증연계 정책자금 활용',
    result: '총 2억 원 창업자금 실행',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Factory,
    title: '정대표 제조업',
    year: '2019년 창업',
    description: '대표자 신용문제로 대출 제한',
    solution: '신용등급 향상 및 각종 인증 등록',
    result: '총 20억 정책자금 실행 (5회)',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Truck,
    title: '박대표 물류업',
    year: '2020년 창업',
    description: '물류센터 확장을 위한 대규모 자금 필요',
    solution: '중소벤처기업진흥공단 정책자금 연계',
    result: '총 5억 원 시설자금 실행',
    color: 'from-indigo-500 to-blue-500',
  },
];

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="whitespace-nowrap">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Success() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="success" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            SUCCESS STORIES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 md:mb-6">
            검증된 <span className="gradient-text">높은 성공률</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            압도적인 성공사례, 이젠 대표님 차례입니다
          </p>
        </motion.div>

        {/* Stats - 항상 3열 유지, 높이 동일 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-12 md:mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full text-center p-4 sm:p-6 md:p-8 border-0 shadow-lg shadow-primary/5 bg-white/80 backdrop-blur-sm overflow-hidden relative group">
                  <CardContent className="p-0 relative z-10 flex flex-col items-center justify-center h-full">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" />
                    </div>
                    <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-primary mb-1 md:mb-2">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium leading-tight">
                      {stat.label}
                    </p>
                  </CardContent>
                  {/* Decorative gradient */}
                  <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-20 h-20 md:w-40 md:h-40 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Success Cases - 통일된 카드 레이아웃 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6 md:mb-10">
            실제 성공 사례
          </h3>

          {/* 모바일: 1열, 태블릿: 2열, 데스크탑: 3열 - 6개로 모든 그리드에 딱 맞음 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {cases.map((caseItem, index) => (
              <CaseCard 
                key={caseItem.title} 
                caseItem={caseItem} 
                index={index} 
                isInView={isInView} 
                delay={0.5}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 통일된 케이스 카드 컴포넌트
function CaseCard({ caseItem, index, isInView, delay }) {
  const Icon = caseItem.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay + index * 0.1 }}
    >
      <Card className="h-full card-hover border-0 shadow-lg shadow-primary/5 bg-white overflow-hidden group">
        <CardContent className="p-4 sm:p-5 md:p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${caseItem.color} flex items-center justify-center`}>
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-foreground text-sm md:text-base truncate">{caseItem.title}</h4>
              <span className="text-xs md:text-sm text-muted-foreground">{caseItem.year}</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
            <div className="p-2 md:p-3 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">상황: </span>
              <span className="text-foreground">{caseItem.description}</span>
            </div>
            <div className="p-2 md:p-3 rounded-lg bg-primary/5">
              <span className="text-primary font-medium">솔루션: </span>
              <span className="text-foreground">{caseItem.solution}</span>
            </div>
          </div>

          {/* Result */}
          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border">
            <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">결과</span>
            <p className={`text-base md:text-lg font-bold bg-gradient-to-r ${caseItem.color} bg-clip-text text-transparent`}>
              {caseItem.result}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
