'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  Send,
  CheckCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

// kakao 기능 동작을 위해 넣어준다.
const KAKAO_ADMIN_KEY = process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY;
const KAKAO_PUBLIC_KEY = '_xgxkEFn';

// Kakao 객체는 클라이언트에서만 접근
const getKakao = () => {
  if (typeof window !== 'undefined') {
    return window.Kakao;
  }
  return null;
};

const creditScoreOptions = [
  '선택해주세요',
  '350점',
  '700점 이하',
  '700점 이상',
  '800점 이상',
];
const salesOptions = [
  '선택해주세요',
  '매출없음',
  '1억 미만',
  '1억 - 3억',
  '3억 - 5억',
  '5억 - 10억',
  '10억 이상',
];
const fundOptions = [
  '선택해주세요',
  '3천만원 이하',
  '3,000 - 5,000만원',
  '1억원 이상',
  '3억원 이상',
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    name: '',
    phone: '',
    location: '',
    creditScore: '선택해주세요',
    sales: '선택해주세요',
    fund: '선택해주세요',
    message: '',
    agreed: false,
  });

  useEffect(() => {
    // 카카오 SDK 스크립트 동적 로드
    const loadKakaoSDK = () => {
      return new Promise((resolve) => {
        // 이미 로드된 경우
        if (window.Kakao) {
          resolve(window.Kakao);
          return;
        }

        // 스크립트가 이미 추가된 경우
        const existingScript = document.getElementById('kakao-sdk');
        if (existingScript) {
          existingScript.onload = () => resolve(window.Kakao);
          return;
        }

        // 스크립트 동적 생성
        const script = document.createElement('script');
        script.id = 'kakao-sdk';
        script.src =
          'https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js';
        script.integrity =
          'sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6';
        script.crossOrigin = 'anonymous';
        script.onload = () => resolve(window.Kakao);
        document.head.appendChild(script);
      });
    };

    loadKakaoSDK().then((Kakao) => {
      if (Kakao && !Kakao.isInitialized()) {
        if (KAKAO_ADMIN_KEY) {
          Kakao.init(KAKAO_ADMIN_KEY);
          console.log('Kakao SDK 초기화 완료');
        } else {
          console.warn(
            'KAKAO_ADMIN_KEY가 설정되지 않았습니다. .env.local 파일을 확인하세요.'
          );
        }
      }
    });
  }, []);

  const onClickChatChannel = () => {
    const Kakao = getKakao();
    if (Kakao && Kakao.isInitialized()) {
      Kakao.Channel.chat({
        channelPublicId: KAKAO_PUBLIC_KEY,
      });
    } else {
      // SDK가 초기화되지 않은 경우 직접 카카오톡 채널로 이동
      window.open(
        `https://pf.kakao.com/${KAKAO_PUBLIC_KEY}/chat`,
        '_blank'
      );
    }
  };

  // 전화번호 자동 하이픈 포맷팅
  const formatPhoneNumber = (value) => {
    // 숫자만 추출
    const numbers = value.replace(/[^0-9]/g, '');

    // 서울 지역번호 (02)
    if (numbers.startsWith('02')) {
      if (numbers.length <= 2) return numbers;
      if (numbers.length <= 5)
        return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
      if (numbers.length <= 9)
        return `${numbers.slice(0, 2)}-${numbers.slice(
          2,
          5
        )}-${numbers.slice(5)}`;
      return `${numbers.slice(0, 2)}-${numbers.slice(
        2,
        6
      )}-${numbers.slice(6, 10)}`;
    }

    // 휴대폰 (010, 011, 016, 017, 018, 019)
    if (numbers.startsWith('01')) {
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 7)
        return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      return `${numbers.slice(0, 3)}-${numbers.slice(
        3,
        7
      )}-${numbers.slice(7, 11)}`;
    }

    // 대표번호 (1588, 1577, 1566 등)
    if (numbers.startsWith('1')) {
      if (numbers.length <= 4) return numbers;
      return `${numbers.slice(0, 4)}-${numbers.slice(4, 8)}`;
    }

    // 일반 지역번호 (031, 032, 033 등)
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    if (numbers.length <= 10)
      return `${numbers.slice(0, 3)}-${numbers.slice(
        3,
        6
      )}-${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(
      3,
      7
    )}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 전화번호 필드는 자동 포맷팅 적용
    const processedValue =
      name === 'phone' ? formatPhoneNumber(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue,
    }));
    // 입력 시 해당 필드의 에러 제거
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = '회사명을 입력해주세요.';
    }
    if (!formData.industry.trim()) {
      newErrors.industry = '업종을 입력해주세요.';
    }
    if (!formData.name.trim()) {
      newErrors.name = '대표자 이름을 입력해주세요.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.';
    }
    if (!formData.agreed) {
      newErrors.agreed = '개인정보 수집 및 이용에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Google Sheets Web App URL (사용자가 설정해야 함)
      const GOOGLE_SHEET_URL =
        process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

      if (GOOGLE_SHEET_URL) {
        // 한국 시간으로 보기 좋게 포맷팅
        const now = new Date();
        const koreaTime = new Date(
          now.getTime() + 9 * 60 * 60 * 1000
        );
        const formattedTime = koreaTime
          .toISOString()
          .replace('T', ' ')
          .replace('Z', '')
          .slice(0, 19);

        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            // 휴대폰 번호 앞에 ' 추가하여 문자로 인식
            phone: `'${formData.phone}`,
            timestamp: formattedTime,
          }),
        });
      }

      setIsSubmitted(true);
      setFormData({
        companyName: '',
        industry: '',
        name: '',
        phone: '',
        location: '',
        creditScore: '선택해주세요',
        sales: '선택해주세요',
        fund: '선택해주세요',
        message: '',
        agreed: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(
        '제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 section-gradient-center" />
      <div className="absolute top-1/4 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            무료 상담
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6">
            지금 바로 <span className="gradient-text">상담 신청</span>
            하세요
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            확인 후 순차적으로 빠르게 연락 드리겠습니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Phone Card */}
            <a href="tel:010-6776-3670">
              <Card className="border-0 shadow-lg shadow-primary/10 bg-linear-to-br from-primary to-accent text-white overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        유선상담
                      </p>
                      <p className="text-lg font-bold">전화하기 →</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/80">
                    평일 09:00 - 18:00 (주말/공휴일 휴무)
                  </p>
                </CardContent>
              </Card>
            </a>

            {/* KakaoTalk Card */}
            <Card
              className="border-0 shadow-lg shadow-primary/10 bg-[#FEE500] text-[#3C1E1E] overflow-hidden group cursor-pointer mt-2 hover:shadow-xl transition-shadow"
              onClick={onClickChatChannel}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3C1E1E]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">
                      카카오톡 상담
                    </p>
                    <p className="text-lg font-bold">바로가기 →</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="p-6 rounded-2xl bg-muted/50">
              <h4 className="font-bold text-foreground mb-3">
                상담 안내
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  무료 상담으로 부담 없이 문의하세요
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  접수 후 1영업일 이내 연락드립니다
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  기업 맞춤형 정책자금 안내
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-xl shadow-primary/10 bg-white overflow-hidden">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      상담 신청이 완료되었습니다!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      빠른 시일 내에 연락드리겠습니다.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                    >
                      추가 문의하기
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Company Name */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="companyName"
                          className={
                            errors.companyName ? 'text-red-500' : ''
                          }
                        >
                          회사명{' '}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          placeholder="회사명을 입력해주세요"
                          value={formData.companyName}
                          onChange={handleChange}
                          className={
                            errors.companyName
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : ''
                          }
                        />
                        {errors.companyName && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.companyName}
                          </p>
                        )}
                      </div>

                      {/* Industry */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="industry"
                          className={
                            errors.industry ? 'text-red-500' : ''
                          }
                        >
                          업종 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="industry"
                          name="industry"
                          placeholder="업종을 입력해주세요"
                          value={formData.industry}
                          onChange={handleChange}
                          className={
                            errors.industry
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : ''
                          }
                        />
                        {errors.industry && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.industry}
                          </p>
                        )}
                      </div>

                      {/* Name */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className={
                            errors.name ? 'text-red-500' : ''
                          }
                        >
                          대표자 이름{' '}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="대표자 이름을 입력해주세요"
                          value={formData.name}
                          onChange={handleChange}
                          className={
                            errors.name
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : ''
                          }
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className={
                            errors.phone ? 'text-red-500' : ''
                          }
                        >
                          연락처{' '}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="연락처를 입력해주세요"
                          value={formData.phone}
                          onChange={handleChange}
                          className={
                            errors.phone
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : ''
                          }
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <Label htmlFor="location">
                          사업장 소재지
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="사업장 소재지를 입력해주세요"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Credit Score */}
                      <div className="space-y-2">
                        <Label htmlFor="creditScore">
                          NICE기준 신용점수
                        </Label>
                        <select
                          id="creditScore"
                          name="creditScore"
                          value={formData.creditScore}
                          onChange={handleChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {creditScoreOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Sales */}
                      <div className="space-y-2">
                        <Label htmlFor="sales">최근 1년간 매출</Label>
                        <select
                          id="sales"
                          name="sales"
                          value={formData.sales}
                          onChange={handleChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {salesOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Fund */}
                      <div className="space-y-2">
                        <Label htmlFor="fund">필요자금</Label>
                        <select
                          id="fund"
                          name="fund"
                          value={formData.fund}
                          onChange={handleChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {fundOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">문의 내용</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="문의 내용을 입력해주세요"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>

                    {/* Agreement */}
                    <div
                      className={`p-4 rounded-lg ${
                        errors.agreed
                          ? 'bg-red-50 border border-red-200'
                          : 'bg-muted/50'
                      }`}
                    >
                      <h5 className="font-semibold text-sm text-foreground mb-2">
                        개인정보 수집 및 이용 동의
                      </h5>
                      <p className="text-xs text-muted-foreground mb-3">
                        수집항목: 이름, 연락처, 회사명, 업종, 사업장
                        소재지, 매출정보
                        <br />
                        수집·이용 목적: 상담 신청 및 상담 결과 회신
                        <br />
                        보유·이용 기간: 수집일로부터 3개월 후 삭제
                      </p>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreed"
                          checked={formData.agreed}
                          onChange={handleChange}
                          className={`w-4 h-4 rounded text-primary focus:ring-primary ${
                            errors.agreed
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            errors.agreed
                              ? 'text-red-500'
                              : 'text-foreground'
                          }`}
                        >
                          개인정보 수집 및 이용에 동의합니다.{' '}
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {errors.agreed && (
                        <p className="text-red-500 text-sm flex items-center gap-1 mt-2">
                          <AlertCircle className="w-4 h-4" />
                          {errors.agreed}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-base py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          제출 중...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          상담 신청하기
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
