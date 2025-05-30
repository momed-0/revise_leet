import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Submission = {
    submission_id: number;
    code: string;
    question_slug: string;
    tags: string[];
    submitted_at: string;
    title?: string;
    description?: string;
};

type tagStatistics = {
    tag: string;
    count: number;
}

type SubmissionsState = {
    submissions: Submission[];
    filters: {
        tags: string[],
    };
    currentTags: tagStatistics[];
    count: number;
};

const initialState: SubmissionsState = {
    submissions: [],
    filters: {
        tags: [],
    },
    currentTags: [],
    count: 0,
};

const submissionsSlice = createSlice({
    name: "submissions",
    initialState,
    reducers: {
        setSubmissions(state, action: PayloadAction<Submission[]>) {
            state.submissions = action.payload;
        },
        addFilterTag(state, action: PayloadAction<string>) {
            state.filters.tags.push(action.payload);
        },
        removeFilterTag(state, action: PayloadAction<string>) {
            state.filters.tags = state.filters.tags.filter(tag => tag !== action.payload);
        },
        updateCurrentTags(state, action: PayloadAction<tagStatistics[]>) {
            state.currentTags = action.payload;
        },
        updateCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        }
    },
});

export const { setSubmissions , updateCurrentTags, addFilterTag, removeFilterTag, updateCount} = submissionsSlice.actions;
export default submissionsSlice.reducer;