export const acronymItems = [
  { letter: "J", word: "JBNU" },
  { letter: "B", word: "Big Data" },
  { letter: "I", word: "AI" },
  { letter: "G", word: "Group" },
] as const;

export const activityAreas = ["데이터 사이언스", "딥러닝", "머신러닝", "AI"] as const;

export const curriculumPhases = [
  {
    range: "01–04",
    label: "DATA ANALYSIS",
    title: "데이터 분석",
    companion: "코드 과제",
    description: "공통 데이터로 배우고, 누적형 코드 과제를 완성합니다.",
    tone: "analysis",
  },
  {
    range: "05",
    label: "MINI CHALLENGE",
    title: "데이터 분석대회",
    companion: null,
    description: "배운 내용을 한 번의 실전으로 확인합니다.",
    tone: "challenge",
  },
  {
    range: "06–08",
    label: "DEEP LEARNING",
    title: "딥러닝",
    companion: null,
    description: "핵심 개념과 실습을 팀 프로젝트로 이어갑니다.",
    tone: "deep-learning",
  },
] as const;

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
