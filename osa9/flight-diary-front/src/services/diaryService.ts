import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "/api";

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(`${baseUrl}/diaries`)
    .then((response) => response.data);
};

export const createDiaryEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(`${baseUrl}/diaries`, object)
    .then((response) => response.data);
};
