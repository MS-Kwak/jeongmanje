'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
  { icon: TrendingUp, value: '95%', label: '자금조달 성공률' },
  { icon: Shield, value: '100%', label: '후불제 운영' },
  { icon: Clock, value: '10년+', label: '업계 경력' },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col min-h-[calc(100dvh-42px)] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Floating Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-[10%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-linear-to-br from-primary/20 to-accent/20 blur-2xl"
      />
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']),
        }}
        className="absolute top-1/3 right-[15%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-linear-to-br from-accent/15 to-primary/15 blur-3xl"
      />
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], ['0%', '70%']),
        }}
        className="absolute bottom-1/4 left-[20%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-linear-to-br from-primary/10 to-transparent blur-2xl"
      />

      {/* Content - flex-1로 남은 공간 채우기 */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 md:pt-24 pb-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col justify-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 md:mb-6 mx-auto"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            2025년 정책자금 신청 접수 중
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4 md:mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="block text-foreground"
            >
              매년 쏟아지는
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
              }}
              className="gradient-text inline-block"
            >
              20조 원
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="block text-foreground"
            >
              정책자금
            </motion.span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8"
          >
            대표님의 사업에{' '}
            <span className="text-primary font-semibold">
              딱 맞는 자금
            </span>
            을 찾아드립니다
            <br className="hidden sm:block" />
            <span className="text-foreground font-medium">
              성공 시에만 비용 발생하는 100% 후불제
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-10"
          >
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden group text-sm md:text-base px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto"
            >
              <Link href="#contact">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  무료 상담 신청하기
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-sm md:text-base px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto"
            >
              <Link href="#benefits">자세히 알아보기</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto w-full"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.9 + index * 0.1,
                    duration: 0.5,
                  }}
                  className="text-center p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-lg shadow-primary/5"
                >
                  <Icon className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary mx-auto mb-1 md:mb-2" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - 하단에 고정 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 flex justify-center pb-4 md:pb-6"
      >
        <Link
          href="#about"
          className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-primary transition-colors"
        >
          <span className="text-xs hidden md:block">SCROLL DOWN</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
