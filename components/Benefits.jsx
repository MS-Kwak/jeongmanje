'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Wallet,
  Percent,
  CalendarDays,
  FileCheck,
  Users,
  Shield,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: Wallet,
    title: '더 많은 한도',
    description:
      '시중은행보다 높은 대출 가능금액으로 사업 확장의 기회를 제공합니다.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Percent,
    title: '더 낮은 금리',
    description:
      '정부 지원으로 시중금리 대비 훨씬 낮은 금리로 금융비용을 절감합니다.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: CalendarDays,
    title: '더 여유로운 상환',
    description:
      '장기 상환 조건으로 안정적인 자금 운영이 가능합니다.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: FileCheck,
    title: '맞춤형 서류 준비',
    description:
      '복잡한 서류 작업, 전문가가 처음부터 끝까지 함께합니다.',
    color: 'from-orange-500 to-amber-500',
  },
];

const features = [
  {
    icon: Users,
    title: '10년 이상 경력의 전문가',
    description:
      '분야별 전문가들이 맞춤 솔루션으로 자금 승인까지 확실하게 도와드립니다.',
  },
  {
    icon: Shield,
    title: '100% 후불제',
    description:
      '성공 시에만 수수료가 발생합니다. 승인 실패 시 수수료 0원!',
  },
  {
    icon: TrendingUp,
    title: '95% 성공률',
    description:
      '수천 건의 실제 컨설팅 경험과 축적된 데이터 기반 대응력',
  },
  {
    icon: Clock,
    title: '최신 정책 반영',
    description:
      '매년 바뀌는 정책자금 기준과 일정을 사전 준비로 조기 마감 리스크 최소화',
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="benefits"
      className="py-24 md:py-32 section-gradient-down"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
          >
            WHY 정책자금?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6"
          >
            왜 <span className="gradient-text">정책자금</span>인가요?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            정부가 지원하는 정책자금은 일반 대출과 비교할 수 없는
            혜택을 제공합니다
          </motion.p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2 + index * 0.15,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full border-0 shadow-lg shadow-primary/5 bg-white/80 backdrop-blur-sm overflow-hidden group hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300">
                  <CardContent className="p-6 relative">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.4 + index * 0.15,
                        type: 'spring',
                        stiffness: 200
                      }}
                      className={`w-14 h-14 rounded-2xl bg-linear-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>

                    {/* Content */}
                    <motion.h3
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                      className="text-xl font-bold text-foreground mb-2"
                    >
                      {benefit.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.15 }}
                      className="text-muted-foreground text-sm leading-relaxed"
                    >
                      {benefit.description}
                    </motion.p>

                    {/* Decorative gradient */}
                    <div
                      className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-linear-to-br ${benefit.color} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl" />

          <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-2xl md:text-3xl font-bold text-foreground mb-4"
              >
                저희 컨설팅이{' '}
                <span className="text-primary">특별한 이유</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-muted-foreground"
              >
                검증된 전문성과 신뢰를 바탕으로 대표님의 자금 고민을
                해결합니다
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{
                      opacity: 0,
                      x: index % 2 === 0 ? -30 : 30,
                      y: 20,
                    }}
                    animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.9 + index * 0.1,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    whileHover={{ x: 5 }}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300"
                    >
                      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
