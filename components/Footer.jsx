'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Phone } from 'lucide-react';

const navItems = [
  { name: '정책자금이란', href: '#about' },
  { name: '왜 정책자금인가', href: '#benefits' },
  { name: '성공사례', href: '#success' },
  { name: '상담신청', href: '#contact' },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer ref={ref} className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-3 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  type: 'spring',
                }}
                className="relative w-10 h-10 bg-white rounded-lg p-1"
              >
                <Image
                  src="/images/logo.svg"
                  alt="정만제 로고"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <span className="text-xl font-bold">
                정책자금<span className="text-primary">컨설팅</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-6">
              전문가들이 대표님의 사업에 딱 맞는 정책자금을
              찾아드립니다. 성공 시에만 비용이 발생하는 100% 후불제
              컨설팅으로 안심하고 상담받으세요.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {[{ icon: Phone, text: '연락처: 010-6776-3670' }].map(
                (item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.1,
                    }}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span>{item.text}</span>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">바로가기</h4>
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: 0.4 + index * 0.1,
                  }}
                >
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all text-sm"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Business Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-4">
              사업자 정보
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>회사명: 정 솔루션</li>
              <li>대표자명: 정만제</li>
              <li>사업자번호: 751-29-01700</li>
              <li>주소: 경기도 광명시 소하2동 924-42</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-6 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} 정솔루션. All Rights
              Reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-white/40 hover:text-white/80 text-sm transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link
                href="#"
                className="text-white/40 hover:text-white/80 text-sm transition-colors"
              >
                이용약관
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
