import type { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = (props: PartProps) => {
  const { coursePart } = props;
  switch (coursePart.kind) {
    case "basic":
      return (
        <>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
            <br></br>
            <i>{coursePart.description}</i>
          </p>
        </>
      );
    case "background":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br></br>
          <i>{coursePart.description}</i>
          <br></br>
          {coursePart.backgroundMaterial}
        </p>
      );
    case "group":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br></br>
          project exercises {coursePart.groupProjectCount}
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br></br>
          <i>{coursePart.description}</i>
          <br></br>
          required skills: {coursePart.requirements.join(', ')}
        </p>
      );
  }
};

export default Part;
