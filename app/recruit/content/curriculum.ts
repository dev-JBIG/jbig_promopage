export const curriculumContent = {
  heading: ["배운 것은 바로,", "해보는 쪽으로."],
  flowAriaLabel: "JBIG 8주 활동 구성",
  weekLabel: "WEEK",
  expandAriaLabelSuffix: "자세히 보기",
  closeAriaLabelSuffix: "상세 내용 닫기",
  scheduleAriaLabelSuffix: "주차별 핵심 일정",
  studioStepsAriaLabel: "JBIG SOLUTION STUDIO 등산형 진행 단계",
  detail: {
    openLabel: "8주 일정 자세히 보기",
    closeLabel: "상세 일정 닫기",
    heading: ["질문에서 결과물까지,", "매주 한 걸음씩."],
    labels: {
      practice: "실습",
      project: "프로젝트",
      seminar: "세미나",
    },
  },
} as const;

export type CurriculumWeek = {
  week: string;
  question: string;
  practice: string;
  project: string;
  seminar: string;
};

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
] as const satisfies readonly CurriculumWeek[];

export type CurriculumWeekId = (typeof curriculumWeeks)[number]["week"];
export type CurriculumPhaseTone = "analysis" | "challenge" | "deep-learning" | "studio";

export type CurriculumPhase = {
  range: string;
  title: string;
  companion: string | null;
  description: string;
  tone: CurriculumPhaseTone;
  detail: {
    headline: string;
    note: string;
    weekIds: readonly CurriculumWeekId[];
    steps: readonly (readonly [string, string])[];
  };
};

export const curriculumPhases = [
  {
    range: "01–04",
    title: "데이터 분석",
    companion: "코드 과제",
    description: "현실 데이터로 배우는 빅데이터 분석과정",
    tone: "analysis",
    detail: {
      headline: "분석의 기본을, 직접 해보며 익힙니다.",
      note: "공통 데이터와 누적형 코드 과제로 분석의 흐름을 만듭니다.",
      weekIds: ["01", "02", "03", "04"],
      steps: [],
    },
  },
  {
    range: "05",
    title: "JBIG DATA ARENA",
    companion: null,
    description: "제대로 경험해보는 DATA X ML 분석대회",
    tone: "challenge",
    detail: {
      headline: "누구나 다 계획이 있죠. 당하기 전까지는.",
      note: "실제 Kaggle, Dacon 대회와 동일하게 설계된 대회로, 개념을 넘어 응용까지.",
      weekIds: [],
      steps: [],
    },
  },
  {
    range: "06–08",
    title: "딥러닝",
    companion: null,
    description: "개념 이해부터, 실제로 적용해보는 프로젝트까지.",
    tone: "deep-learning",
    detail: {
      headline: "이해부터 응용까지 한 번에",
      note: "최신 트렌드의 기술들을 활용해서, 결과물을 만들어볼 기회",
      weekIds: ["06", "07", "08"],
      steps: [],
    },
  },
  {
    range: "01–08",
    title: "JBIG SOLUTION STUDIO",
    companion: null,
    description: "한 학기의 노력을 당당하게 제출할 수 있는 포트폴리오로 만들어보아요.",
    tone: "studio",
    detail: {
      headline: "전공과 연결해서 풀어내보는 취업 대비 포트폴리오 프로젝트.",
      note: "팀의 질문을 프로토타입과 발표로 완성하는 제작 스튜디오",
      weekIds: [],
      steps: [
        ["01", "문제 정의"],
        ["02", "데이터 수집"],
        ["03", "프로토타입 제작"],
        ["04", " DEMO - Day"],
      ],
    },
  },
] as const satisfies readonly CurriculumPhase[];
