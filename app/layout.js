import './globals.css';

export const metadata = {
  title: '정책자금 컨설팅',
  description:
    '매년 20조 원 이상 쏟아지는 정책자금, 대표님의 사업에 딱 맞는 자금을 찾아드립니다. 성공 시에만 비용 발생하는 100% 후불제 컨설팅!',
  keywords:
    '정책자금, 중소기업 대출, 창업자금, 정부지원금, 기업컨설팅, 자금조달',
  openGraph: {
    title: '정책자금 컨설팅',
    description:
      '매년 20조 원 이상 쏟아지는 정책자금, 대표님의 사업에 딱 맞는 자금을 찾아드립니다.',
    type: 'website',
    images: [
      {
        url: '/images/og-thumbnail.png',
        width: 1200,
        height: 630,
        alt: '정책자금 컨설팅',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '정책자금 컨설팅',
    description:
      '매년 20조 원 이상 쏟아지는 정책자금, 대표님의 사업에 딱 맞는 자금을 찾아드립니다.',
    images: ['/images/og-thumbnail.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
