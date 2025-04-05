import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Submission = {
    submission_id: number;
    code: string;
    submitted_at: string;
    title?: string;
    description?: string;
};

type SubmissionsState = {
    submissions: Submission[];
};

const initialState: SubmissionsState = {
    submissions: [],
};

const submissionsSlice = createSlice({
    name: "submissions",
    initialState,
    reducers: {
        setSubmissions(state, action: PayloadAction<Submission[]>) {
            state.submissions = action.payload;
        },
    },
});

export const { setSubmissions } = submissionsSlice.actions;
export default submissionsSlice.reducer;