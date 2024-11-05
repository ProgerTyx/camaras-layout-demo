enum CameraStatus {
  Offline,
  Online,
}

export interface ICamera {
  id: string;
  name: string;
  status: CameraStatus;
}

export const cameras: ICamera[] = Array.from({ length: 20 }, (_, index) => ({
  id: String(index + 1),
  name: `Камера ${index + 1}`,
  status: Math.random() < 0.5 ? CameraStatus.Online : CameraStatus.Offline,
}));

export interface ILayoutBlock {
  type: "small" | "big";
  id: number;
  area: string;
  content: string;
}

export interface ILayoutGridStyles {
  areas: string;
}

export interface ILayout {
  layoutId: string;
  blocks: ILayoutBlock[];
  gridStyles: ILayoutGridStyles;
}

export const layout: ILayout = {
  layoutId: "customLayout",
  blocks: [
    { type: "small", id: 1, area: "a", content: "" },
    { type: "small", id: 2, area: "b", content: "" },
    { type: "small", id: 3, area: "c", content: "" },
    { type: "small", id: 4, area: "d", content: "" },
    { type: "small", id: 5, area: "e", content: "" },
    { type: "small", id: 6, area: "f", content: "" },
    { type: "small", id: 7, area: "g", content: "" },
    { type: "small", id: 8, area: "h", content: "" },
    { type: "big", id: 9, area: "i", content: "" },
    { type: "big", id: 10, area: "j", content: "" },
    { type: "small", id: 11, area: "k", content: "" },
    { type: "small", id: 12, area: "l", content: "" },
    { type: "small", id: 13, area: "m", content: "" },
    { type: "small", id: 14, area: "n", content: "" },
    { type: "small", id: 15, area: "o", content: "" },
    { type: "small", id: 16, area: "p", content: "" },
    { type: "small", id: 17, area: "q", content: "" },
    { type: "small", id: 18, area: "r", content: "" },
    { type: "big", id: 19, area: "s", content: "" },
    { type: "big", id: 20, area: "t", content: "" },
  ],
  gridStyles: {
    areas: `
      "a b c d"
      "e f g h"
      "i i j j"
      "k l m n"
      "o p q r"
      "s s t t"
    `,
  },
};
