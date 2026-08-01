export type AwardRecord = {
  title: string;
  result: string;
  featured?: boolean;
};

export const awardsByYear = {
  "2025": [
    { title: "제5회 장애·비장애 대학생 창업경진대회", result: "우수상", featured: true },
    { title: "제주·AWS 글로벌 스페이스 챌린지 해커톤", result: "최우수상 · 우수상", featured: true },
    { title: "K리그-서울시립대 공개 AI 경진대회", result: "동상", featured: true },
    { title: "2026 지역 창업 솔버톤 대회", result: "우수상 · 서울대총장상", featured: true },
    { title: "제13회 빅콘테스트 (2025 AI데이터 경진대회)", result: "장려상" },
    { title: "2025 해운 항만 물류 AX 혁신 아이디어 공모전", result: "우수상" },
    { title: "제27회 아이디어 유니버시아드 대회", result: "최우수상", featured: true },
    { title: "제3회 전북 청년 빅데이터 경진대회", result: "전북특별자치도지사상" },
    { title: "2025 한국정보기술학회 대학생논문경진대회", result: "금상", featured: true },
    { title: "제12회 대한민국 SW융합 해커톤 대회", result: "우수상" },
    { title: "전주ICT이노베이션스퀘어 디지털 신기술 아이디어 공모전", result: "최우수상" },
    { title: "전북특별자치도 공공데이터 활용 창업경진대회", result: "우수상 · 2건" },
    { title: "JBNU SW·AI 경진대회 SW 부문", result: "동상" },
    { title: "JBNU SW·AI 경진대회 AI 부문", result: "동상" },
    { title: "학생 창업 기업 지원사업", result: "600만원 지원" },
    { title: "데이콘 × BDA 학습자 수료 예측 AI 경진대회", result: "상위 8%" },
    { title: "LG Aimers 6기", result: "본선 진출" },
  ],
  "2024": [
    { title: "제1회 호남권 SW 창업 아이디어 경진대회", result: "우수상" },
    { title: "2024 제조 빅데이터 분석 경진대회", result: "대상", featured: true },
    { title: "제3회 신빅해", result: "최우수상 · 우수상" },
    { title: "2024 CO-SHOW 경진대회", result: "COSS 협의회장상" },
    { title: "제2회 전북 청년 빅데이터 경진대회", result: "우리은행장상" },
    { title: "대한의용생체공학회 추계학술대회", result: "우수포스터" },
    { title: "대한의용생체공학회 추계학술대회", result: "우수포스터 논문상 · Silver" },
    { title: "문화체육관광 데이터 활용대회", result: "최우수상", featured: true },
    { title: "인공지능 온라인 교내 경진대회", result: "대상 · 금상 · 은상 · 동상 · 장려상" },
    { title: "자율주행 SW 교육 및 경진대회", result: "대상 · 우수상" },
    { title: "전주시 데이터 분석 공모전", result: "최우수상" },
    { title: "학생 창업 기업 지원 사업", result: "600만원 지원" },
    { title: "제2회 재난안전데이터 활용 창업경진대회", result: "대상", featured: true },
    { title: "제3회 대학 연합 아주 소중한 딥러닝 챌린지", result: "2등" },
    { title: "하계종합학술대회 및 대학생 논문경진대회", result: "동상" },
    { title: "생성 AI를 활용한 서비스 소프트웨어 개발 공모전", result: "장려상" },
  ],
  "2023": [
    { title: "전북대학교 × 전주비전대 공간경진 AI대회", result: "대상" },
    { title: "전북대학교 컴퓨터인공지능학부 작품경진대회", result: "은상" },
    { title: "소외계층을 위한 AI활용 아이디어 공모전", result: "교육부장관상", featured: true },
    { title: "POSTECH OIBC Challenge 태양광 발전량 예측 경진대회", result: "장려상" },
    { title: "ICT 표준 챌린지 공모전", result: "아이디어 분야 장려상" },
    { title: "제4회 오아시스 해커톤", result: "대상", featured: true },
    { title: "제조 빅데이터 분석 경진대회", result: "우수상" },
    { title: "Co-Data Station", result: "대상" },
    { title: "전북대학교 인공지능 온라인 경진대회", result: "장려상" },
  ],
  "2022": [
    { title: "빅데이터혁신공유대학 빅데이터 해커톤", result: "장려상" },
    { title: "전라북도 공공데이터 활용 창업경진대회", result: "특별상" },
  ],
  "2021": [
    { title: "행정안전부 공공 빅데이터 분석 프로젝트 해커톤", result: "대상", featured: true },
    { title: "데이터 크리에이터 캠프 (NIA)", result: "최우수상", featured: true },
  ],
} as const satisfies Record<string, readonly AwardRecord[]>;

export const awardYears = ["2025", "2024", "2023", "2022", "2021"] as const;

export const allAwards = awardYears.flatMap((year) =>
  awardsByYear[year].map((award) => ({ ...award, year })),
);

export const featuredAwards = allAwards.filter((award) => award.featured);
