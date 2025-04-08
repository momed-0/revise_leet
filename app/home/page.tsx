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
      if (selectedDate) { // set the submissions state in the store
        const formattedDate = selectedDate.toISOString().split("T")[0];
        fetchSubmissionsForDay(formattedDate, dispatch).then((data) => {
          dispatch(setSubmissions(data));
        });
      }
    }, [selectedDate, dispatch]);

    return (
      <div className="max-w-screen-xl mx-auto py-10 lg:py-16 px-6 xl:px-0 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1">
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur px-6 py-4 border-b">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-2xl font-semibold mb-2">Problems</h2>
              <div className="flex flex-wrap gap-4">
                <SlugDropdown />
                <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <ProblemsProvider />
          </div>
        </div>

        {/* Tags Sidebar */}
        <div className="lg:w-1/4 shrink-0">
          <TagsProvider />
        </div>
      </div>
    );

};

export default HomePage;
