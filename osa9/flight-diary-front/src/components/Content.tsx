import type { DiaryEntry } from "../types";

interface ContentProps {
  diaries: DiaryEntry[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.diaries.map((diary) => (
        <p key={diary.id}>
          <b>{diary.date}</b>
          <br></br>
          <br></br>
          visibility: {diary.visibility} <br></br>
          weather: {diary.weather}
        </p>
      ))}
    </div>
  );
};

export default Content;
