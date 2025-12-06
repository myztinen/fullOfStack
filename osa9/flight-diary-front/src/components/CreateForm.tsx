import type { NewDiaryEntry } from "../types";
import RadioButtons from "./RadioButtons";
import { useState } from "react";

interface FormProps {
  creationFunction: (entry: NewDiaryEntry) => void;
}

const CreateForm = (props: FormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState("");

  const weatherSelections = ["sunny", "rainy", "cloudy", "stormy", "windy"];
  const visibilitySelections = ["great", "good", "ok", "poor"];

  const selectVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value);
  };

  const selectWeather = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value);
  };

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    creationFunction({
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  const { creationFunction } = props;
  return (
    <>
      <h2> create new</h2>
      <form onSubmit={addEntry}>
        <div>
          <label>
            date:
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
        </div>
        <RadioButtons
          name="visibility"
          options={visibilitySelections}
          value={visibility}
          handleSelection={selectVisibility}
        />
        <RadioButtons
          name="weather"
          options={weatherSelections}
          value={weather}
          handleSelection={selectWeather}
        />
        <div>
          <label>
            comment:
            <input
              type="text"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default CreateForm;
