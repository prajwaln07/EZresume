// src/store/resumeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basics: {
    name: '',
    summary: '',
    objective: '',
    image: '',
  },
  work: [],
  skills: {
    languages: [],
    frameworks: [],
    technologies: [],
    libraries: [],
    databases: [],
  },
  education: [],
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setBasics: (state, action) => {
      state.basics = action.payload;
    },
    setWork: (state, action) => {
      state.work = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
  },
});

export const { setBasics, setWork, setSkills, setEducation } = resumeSlice.actions;
export default resumeSlice.reducer;
