export const testimonialsContent = {
  heading: ["배운 것은,", "어디까지 이어졌을까요."],
  description: ["수료자들이 직접 들려주는", "JBIG 이후의 변화."],
  listAriaLabel: "JBIG 동아리원 후기",
  profileAltSuffix: "프로필",
} as const;

export type TestimonialItem = {
  id: string;
  profileImage?: string;
  name: string;
  cohort: string;
  mainActivity: string;
  highlight: string;
  review: string;
};

export const testimonialItems: readonly TestimonialItem[] = [
  {
    id: "member-01",
    name: "이름 입력",
    cohort: "기수 입력",
    mainActivity: "주요 활동 입력",
    highlight: "한 줄 장점이 이곳에 들어갑니다.",
    review: "500자 이내의 간결한 후기가 이곳에 들어갑니다.",
  },
  {
    id: "member-02",
    name: "이름 입력",
    cohort: "기수 입력",
    mainActivity: "주요 활동 입력",
    highlight: "한 줄 장점 입력",
    review: "500자 이내 후기 입력",
  },
  {
    id: "member-03",
    name: "이름 입력",
    cohort: "기수 입력",
    mainActivity: "주요 활동 입력",
    highlight: "한 줄 장점 입력",
    review: "500자 이내 후기 입력",
  },
];
