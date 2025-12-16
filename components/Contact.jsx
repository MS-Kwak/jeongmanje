'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MessageCircle, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

const creditScoreOptions = ['선택해주세요', '350점', '700점 이하', '700점 이상', '800점 이상'];
const salesOptions = ['선택해주세요', '매출없음', '1억 미만', '1억 - 3억', '3억 - 5억', '5억 - 10억', '10억 이상'];
const fundOptions = ['선택해주세요', '3천만원 이하', '3,000 - 5,000만원', '1억원 이상', '3억원 이상'];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Google Sheets Web App URL (사용자가 설정해야 함)
      const GOOGLE_SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
      
      if (GOOGLE_SHEET_URL) {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
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
      alert('제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
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
            지금 바로 <span className="gradient-text">상담 신청</span>하세요
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
            <Card className="border-0 shadow-lg shadow-primary/10 bg-gradient-to-br from-primary to-accent text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">유선상담</p>
                    <p className="text-2xl font-bold">전화문의</p>
                  </div>
                </div>
                <p className="text-sm text-white/80">
                  평일 09:00 - 18:00 (주말/공휴일 휴무)
                </p>
              </CardContent>
            </Card>

            {/* KakaoTalk Card */}
            <Card className="border-0 shadow-lg shadow-primary/10 bg-[#FEE500] text-[#3C1E1E] overflow-hidden group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3C1E1E]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">카카오톡 상담</p>
                    <p className="text-lg font-bold">바로가기 →</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="p-6 rounded-2xl bg-muted/50">
              <h4 className="font-bold text-foreground mb-3">상담 안내</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  무료 상담으로 부담 없이 문의하세요
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  접수 후 1영업일 이내 연락드립니다
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
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
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      추가 문의하기
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Company Name */}
                      <div className="space-y-2">
                        <Label htmlFor="companyName">회사명 *</Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          placeholder="회사명을 입력해주세요"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Industry */}
                      <div className="space-y-2">
                        <Label htmlFor="industry">업종 *</Label>
                        <Input
                          id="industry"
                          name="industry"
                          placeholder="업종을 입력해주세요"
                          value={formData.industry}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">대표자 이름 *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="대표자 이름을 입력해주세요"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">연락처 *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="연락처를 입력해주세요"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <Label htmlFor="location">사업장 소재지</Label>
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
                        <Label htmlFor="creditScore">NICE기준 신용점수</Label>
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
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h5 className="font-semibold text-sm text-foreground mb-2">
                        개인정보 수집 및 이용 동의
                      </h5>
                      <p className="text-xs text-muted-foreground mb-3">
                        수집항목: 이름, 연락처, 회사명, 업종, 사업장 소재지, 매출정보<br />
                        수집·이용 목적: 상담 신청 및 상담 결과 회신<br />
                        보유·이용 기간: 수집일로부터 3개월 후 삭제
                      </p>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreed"
                          checked={formData.agreed}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">
                          개인정보 수집 및 이용에 동의합니다. *
                        </span>
                      </label>
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

