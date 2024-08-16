import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAll = async (): Promise<DiaryEntry[]> => {
    const res = await axios.get<DiaryEntry[]>(baseUrl);
    return res.data;
};

export const addNew = async (data: NewDiaryEntry): Promise<DiaryEntry> => {
    const res = await axios.post<DiaryEntry>(baseUrl, data);
    return res.data;
};