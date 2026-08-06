export const testimonialsContent = {
  heading: ["선배들의", "성장 스토리"],
  description: ["수료자들이 직접 들려주는", "JBIG 이후의 변화."],
  listAriaLabel: "JBIG 동아리원 후기",
  profileAltSuffix: "프로필",
} as const;

export type TestimonialItem = {
  id: string;
  profileImage?: string;
  name: string;
  department: string;
  cohort: string;
  highlight: string;
  review: string;
};

export const testimonialItems: readonly TestimonialItem[] = [
  {
    id: "member-01",
    name: "이**",
    department: "전자공학부",
    cohort: "3기",
    highlight: "다양한 사람과 연결된 성장 경험",
    review: "JBIG을 통해서 다양한 분야의 사람들과 네트워킹을 함으로써 다양한 정보 및 지식을 얻을 수 있었습니다. 특히, JBIG 선배님들과의 소통을 하는 홈커밍데이 행사를 통해 진로 및 진학에 대한 이야기들을 들을 수 있어서 좋았습니다.",
  },
  {
    id: "member-02",
    name: "안**",
    department: "전자공학부",
    cohort: "8기",
    highlight: "다양한 데이터 분석 활동과 팀 프로젝트 경험들, 그리고 열정 넘치는 부원들까지",
    review: "8주 동안 스터디와 세미나를 통해 배운 내용을 바탕으로 다양한 프로젝트와 활동에 자신 있게 도전할 수 있었습니다! 정규 과정, 소모임, 대회, 홈커밍까지 모든 활동이 알차게 구성되어 있어 JBIG에서 정말 뜻깊은 시간을 보낼 수 있었습니다.",
  },
  {
    id: "member-03",
    name: "박**",
    department: "전자공학부",
    cohort: "7기",
    highlight: "함께 배우고 성장하는 JBIG",
    review: "열정적인 사람들과 함께하며 좋은 자극을 많이 받았고, AI를 잘 몰라도 조별 활동을 통해 자연스럽게 배우며 성장할 수 있는 프로그램이었습니다.",
  },
];
