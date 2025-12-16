'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const navItems = [
  { name: '정책자금이란', href: '#about' },
  { name: '왜 정책자금인가', href: '#benefits' },
  { name: '성공사례', href: '#success' },
  { name: '상담신청', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 bg-white rounded-lg p-1">
                <Image
                  src="/images/logo.svg"
                  alt="정만제 로고"
                  fill
                  className="object-contain"
                />
              </div>
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
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5 text-primary" />
                <span>전화문의</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5 text-primary" />
                <span>이메일 문의</span>
              </div>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>사업장 주소</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">바로가기</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              사업자 정보
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>회사명: 회사명</li>
              <li>대표자명: 대표자명</li>
              <li>사업자번호: 000-00-00000</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} 회사명. All Rights
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
        </div>
      </div>
    </footer>
  );
}
