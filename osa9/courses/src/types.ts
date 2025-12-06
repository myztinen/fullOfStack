interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartExpansion extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartExpansion {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartExpansion {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartExpansion {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
