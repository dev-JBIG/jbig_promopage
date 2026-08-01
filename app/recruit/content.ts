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
    description: "실제 현실 데이터로 배우는 빅데이터 분석과정",
    tone: "analysis",
  },
  {
    range: "05",
    label: "PERFORMANCE ARENA",
    title: "JBIG DATA ARENA",
    companion: null,
    description: "제대로 경험해보는 캐글-like INSIGHT X ML 분석대회",
    tone: "challenge",
  },
  {
    range: "06–08",
    label: "DEEP LEARNING",
    title: "딥러닝",
    companion: null,
    description: "개념 이해부터, 실제로 적용해보는 프로젝트까지.",
    tone: "deep-learning",
  },
  {
    range: "01–08",
    label: "BUILD STUDIO",
    title: "JBIG SOLUTION STUDIO",
    companion: null,
    description: "한 학기의 노력을 당당하게 제출할 수 있는 포트폴리오로 만들어보아요.",
    tone: "studio",
  },
] as const;

export const curriculumWeeks = [
  {
    week: "01",
    question: "생성형 AI를 이용한 데이터 분석",
    practice: "데이터 불러오기 · 기초 시각화 · 단순 baseline",
    project: "팀 구성, 관심 문제와 데이터 후보 수집",
    seminar: "프로젝트 방향 공유 · 코드 과제",
  },
  {
    week: "02",
    question: "데이터는 어떻게 읽고 다듬어야 할까?",
    practice: "EDA · 결측·이상치 · 인코딩 · 스케일링 판단",
    project: "문제 정의와 데이터 이용 가능성 확인",
    seminar: "데이터 인사이트 공유",
  },
  {
    week: "03",
    question: "모델이 잘하고 있는지는 어떻게 알 수 있을까?",
    practice: "모델 비교 · 평가지표 선택 · 오류 해석",
    project: "연구·분석 질문과 1차 방법 확정",
    seminar: "진행 공유 · 코드 과제",
  },
  {
    week: "04",
    question: "점수가 좋아졌다고 바로 믿어도 될까?",
    practice: "교차검증 · 누수·과적합 점검 · 재현 가능한 validation",
    project: "기획안, 역할, 일정, 최소 산출물 확정",
    seminar: "기획 점검 · 코드 과제",
  },
  {
    week: "05",
    question: "모델 성능은 어디까지 끌어올릴 수 있을까?",
    practice: "JBIG DATA ARENA · 점수 제출",
    project: "대회 종료 후 구현 착수",
    seminar: "결과 점검 · 프로젝트 시작",
  },
  {
    week: "06",
    question: "딥러닝은 뭐가 다른 걸까?",
    practice: "교안 예제·데모 · 선택형 실습",
    project: "JBIG SOLUTION STUDIO 구현",
    seminar: "진행 공유",
  },
  {
    week: "07",
    question: "이미지를 데이터로 이해한다는 것",
    practice: "교안 예제·데모 · 선택형 실습",
    project: "JBIG SOLUTION STUDIO 구현",
    seminar: "중간 점검",
  },
  {
    week: "08",
    question: "프로젝트 최종 발표",
    practice: "필수 코드 과제 없음",
    project: "JBIG SOLUTION STUDIO 데모데이 · 피드백 · 아카이빙",
    seminar: "발표와 질의응답",
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
