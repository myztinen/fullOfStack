import type { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (<div>{props.courseParts.map((coursePart) => <Part key={coursePart.name} coursePart={coursePart} />)}</div>);
};

export default Content;
