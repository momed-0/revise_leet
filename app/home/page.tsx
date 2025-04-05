"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSubmissions } from "@/store/submissionsSlice";
import ProblemsProvider from "@/components/ProblemsProvider";
import TagsProvider from "@/components/TagsProvider";
import { fetchSubmissionsForDay } from "@/components/fetchSubmissions";
import DatePicker from "@/components/ui/datePicker";
import SlugDropdown from "@/components/slugDropDown"

const HomePage = () => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date()); // Default to today

    useEffect(() => {
      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        fetchSubmissionsForDay(formattedDate).then((data) => {
          dispatch(setSubmissions(data));
        });
      }
    }, [selectedDate, dispatch]);

  return (
    <div className="max-w-screen-xl mx-auto py-10 lg:py-16 px-6 xl:px-0 flex flex-col lg:flex-row items-start gap-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Problems</h2>
        <div className="flex flex-wrap">
          <SlugDropdown />
          <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>
        <ProblemsProvider />
      </div>
      <TagsProvider />
    </div>
  );
};

export default HomePage;
