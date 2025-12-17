'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Zap,
  Phone,
  Gift,
  Clock,
  AlertTriangle,
  MessageCircle,
  Sparkles,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const highlights = [
  {
    icon: AlertTriangle,
    text: '매월 예산 한계로 조기 마감 가능',
    color: 'text-rose-400',
  },
  {
    icon: Phone,
    text: '신청 후 하루 안에 전문가 연결',
    color: 'text-cyan-300',
  },
  {
    icon: Gift,
    text: '상담료 무료 | 분석비 무료',
    color: 'text-emerald-300',
  },
];

export default function Urgency() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="urgency"
      ref={ref}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/95 to-accent" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/2 -left-1/4 w-full h-full bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-white/10 rounded-full blur-3xl"
        />
      </div>

      {/* Decorative icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-[10%] text-white/10"
        >
          <Zap className="w-20 h-20 md:w-32 md:h-32" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-20 right-[10%] text-white/10"
        >
          <Clock className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>지금 바로 시작하세요</span>
          </motion.div>

          {/* Main headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            지원금 마감되기 전에,
            <br />
            <span className="text-cyan-300">
              오늘 바로 움직이세요!
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            정부지원금, 혼자 하지 마세요.{' '}
            <span className="text-white font-semibold">
              전문가와 함께
            </span>
            하면{' '}
            <span className="text-cyan-300 font-bold">성공률</span>이
            달라집니다!
          </p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-10"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                  }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full"
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    {item.text}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Success fee badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-block mb-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-30" />
              <div className="relative bg-white opacity-80 px-6 py-3 rounded-2xl">
                <p className="text-slate-800 font-bold text-lg md:text-xl flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  100% 후불제! 성공 시에만 수수료 발생!!
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-lg font-bold border-2 border-white/50 text-white bg-white/10 hover:bg-white/20 hover:border-white hover:scale-105 transition-all duration-300"
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              자금 무료 상담 받기
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-lg font-bold border-2 border-white/50 text-white bg-white/10 hover:bg-white/20 hover:border-white hover:scale-105 transition-all duration-300"
              asChild
            >
              <a href="tel:02-6953-5082">
                <Phone className="mr-2 w-5 h-5" />
                전화로 빠른 상담
              </a>
            </Button>
          </motion.div>

          {/* Trust text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-white/60 text-sm"
          >
            ✓ 개인정보 보호 철저 &nbsp;|&nbsp; ✓ 강압적 영업 절대 없음
            &nbsp;|&nbsp; ✓ 부담 없는 상담
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
