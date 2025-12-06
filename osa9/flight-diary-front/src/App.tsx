import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Content from "./components/Content";
import CreateForm from "./components/CreateForm";
import type { DiaryEntry, NewDiaryEntry } from "./types";
import { getAllDiaries, createDiaryEntry } from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const headerText = "Diary entries";

  const diaryEntryCreation = (entry: NewDiaryEntry) => {
    createDiaryEntry(entry)
      .then((data) => {
        setDiaries(diaries.concat(data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data);
          setTimeout(() => {
            setError("");
          }, 5000);
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <Header text={headerText} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <CreateForm creationFunction={diaryEntryCreation} />
      <Content diaries={diaries} />
    </div>
  );
};

export default App;
