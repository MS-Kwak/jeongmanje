'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menu,
  ChevronRight,
  FileText,
  Award,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

const navItems = [
  { name: '정책자금이란', href: '#about', icon: FileText },
  { name: '왜 정책자금인가', href: '#benefits', icon: Award },
  { name: '성공사례', href: '#success', icon: Award },
  { name: '상담신청', href: '#contact', icon: MessageCircle },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-[42px] left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-primary/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-transform group-hover:scale-105">
              <Image
                src="/images/logo.svg"
                alt="정만제 로고"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-base sm:text-lg md:text-xl font-bold text-foreground">
              정책자금<span className="text-primary">컨설팅</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              className="relative overflow-hidden group"
            >
              <Link href="#contact">
                <span className="relative z-10">무료상담 신청</span>
                <div className="absolute inset-0 bg-linear-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                >
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">메뉴 열기</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] p-0"
              >
                {/* 접근성을 위한 숨겨진 타이틀 */}
                <SheetTitle className="sr-only">메뉴</SheetTitle>
                <SheetDescription className="sr-only">
                  사이트 네비게이션 메뉴
                </SheetDescription>

                {/* Header - 흰색 배경 */}
                <div className="p-6 bg-white border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                      <Image
                        src="/images/logo.svg"
                        alt="로고"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">
                        정책자금 컨설팅
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        전문가와 함께하세요
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                    메뉴
                  </p>
                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SheetClose asChild key={item.name}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <span className="font-medium flex-1">
                              {item.name}
                            </span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>
                </nav>

                {/* Bottom CTA */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-muted/50 border-t">
                  <SheetClose asChild>
                    <Button asChild className="w-full" size="lg">
                      <Link
                        href="#contact"
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        무료상담 신청하기
                      </Link>
                    </Button>
                  </SheetClose>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    평일 09:00 - 18:00
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
