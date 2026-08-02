export const recruitPageContent = {
  metadata: {
    title: "JBIG 모집 | 호기심이 팀이 되는 곳",
    description: "함께 배우고, 만들고, 도전하는 전북대학교 데이터 분석 동아리 JBIG의 모집 페이지입니다.",
    canonicalUrl: "https://jbig.co.kr/recruit",
    siteName: "JBIG",
    locale: "ko_KR",
  },
  brand: {
    name: "JBIG",
    homeUrl: "https://jbig.co.kr/",
    logoLetters: ["J", "B", "I", "G"],
    logoAriaLabel: "민트와 코발트 그라데이션으로 빛나는 JBIG 로고",
    homeAriaLabel: "JBIG 홈으로 이동",
  },
  skipLinkLabel: "본문으로 바로가기",
  navigation: {
    ariaLabel: "JBIG 모집 페이지 주요 메뉴",
    items: [
      { href: "#about", label: "JBIG 소개" },
      { href: "#curriculum", label: "8주 교안" },
      { href: "#testimonials", label: "동아리원 후기" },
      { href: "#awards", label: "수상경력" },
      { href: "#fit", label: "잘 맞는 사람" },
    ],
  },
  hero: {
    heading: ["호기심이", "팀이 되는 곳."],
    subtitle: "전북대학교 데이터 분석 동아리 JBIG",
    scrollLabel: "JBIG 더 알아보기",
  },
  about: {
    heading: ["JBIG가 무슨", "약자인가요?"],
    acronymAriaLabel: "JBIG 이름의 의미",
    activityHeading: "저희는 이런 걸 공부해요.",
  },
  fit: {
    heading: ["이런 당신을", "기다리고 있어요."],
  },
  faq: {
    heading: ["모집 전에", "궁금한 것들."],
  },
  apply: {
    heading: ["다음 이야기를", "함께 만들어요."],
    description: "모집 일정과 지원 대상이 확정되면 이곳에서 안내합니다.",
    buttonLabel: "지원하기",
  },
  footer: {
    description: "Jeonbuk National University · Data Analysis Club",
  },
} as const;

export const acronymItems = [
  { letter: "J", word: "JBNU" },
  { letter: "B", word: "Big Data" },
  { letter: "I", word: "AI" },
  { letter: "G", word: "Group" },
] as const;

export const activityAreas = ["데이터 사이언스", "딥러닝", "머신러닝", "AI"] as const;

export const fitStatements = [
  "궁금한 건 직접 해봐야 직성이 풀리는 사람",
  "혼자보다 팀에서 더 멀리 가고 싶은 사람",
  "완성한 것을 밖으로 꺼내 보여주고 싶은 사람",
] as const;

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: readonly FaqItem[] = [
  {
    id: "schedule",
    question: "모집은 언제 시작하나요?",
    answer: "모집 일정이 확정되면 이 페이지에서 가장 먼저 확인할 수 있습니다.",
  },
  {
    id: "eligibility",
    question: "누가 지원할 수 있나요?",
    answer: "모집 대상과 지원 조건은 최종 모집 공지에서 함께 안내합니다.",
  },
  {
    id: "application",
    question: "지원 링크는 어디에서 열리나요?",
    answer: "모집이 시작되면 페이지 아래의 지원 버튼이 활성화됩니다.",
  },
];

export type RecruitmentConfig = {
  status: "preparing" | "open" | "closed";
  statusLabel: string;
  period: string | null;
  eligibility: string | null;
  applicationUrl: string | null;
};

export const recruitmentConfig: RecruitmentConfig = {
  status: "preparing",
  statusLabel: "모집 소식 준비 중",
  period: null,
  eligibility: null,
  applicationUrl: null,
};
