'use client';

import {
  Phone,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
} from 'lucide-react';

const marqueeItems = [
  { icon: Phone, text: '무료상담 진행중' },
  { icon: Clock, text: '상담시간 09:00 - 18:00' },
  { icon: CheckCircle, text: '성공시에만 수수료 발생' },
  { icon: Star, text: '10년 이상 경력 전문가' },
  { icon: TrendingUp, text: '자금조달 성공률 95%' },
  { icon: Phone, text: '무료상담 진행중' },
  { icon: Clock, text: '상담시간 09:00 - 18:00' },
  { icon: CheckCircle, text: '성공시에만 수수료 발생' },
  { icon: Star, text: '10년 이상 경력 전문가' },
  { icon: TrendingUp, text: '자금조달 성공률 95%' },
];

export default function Marquee() {
  return (
    <div className="fixed top-0 left-0 right-0 z-60 bg-linear-to-r from-[oklch(0.50_0.22_250)] via-[oklch(0.55_0.22_250)] to-[oklch(0.50_0.22_250)] text-white overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {[...marqueeItems, ...marqueeItems].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 mx-8 text-sm font-medium"
            >
              <Icon className="w-4 h-4" />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
