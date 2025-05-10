"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarOff } from 'lucide-react';
import { useDispatch } from "react-redux";
import ProblemsProvider from "@/components/ProblemsProvider";
import TagsProvider from "@/components/TagsProvider";
import { FetchSubmissionsForDay, FetchQuestionsCount, FetchSubmissionsRange } from "@/components/fetchSubmissions";
import DatePicker from "@/components/ui/datePicker";
import SlugDropdown from "@/components/slugDropDown";
import PaginationProvider from "@/components/pagination";
import { HomePageSkeleton } from "@/components/ui/skeletons";

const findRange = (page: number) => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return { start, end};
}
const HomePage = () => {
    const dispatch = useDispatch();
    const [currPage, setCurrPage] = useState(1); // current page
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined); // selected date
    const [loading, setLoading] = useState(false); // loading state
    
    const dateListener = (date : Date) => {
      if(date) {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split("T")[0];
        setLoading(true); // Show loading skeleton
        FetchSubmissionsForDay(formattedDate, dispatch).finally(() => {
          setLoading(false); // Hide loading skeleton
        });
        setCurrPage(1); // reset to first page
      }
    }
    useEffect(() => {
      if (!selectedDate) { // update pagination if no date selected
        // fetch data for this particular page
        setLoading(true);
        const {start, end} = findRange(currPage);
        Promise.all([
          FetchSubmissionsRange(start, end, dispatch),
          FetchQuestionsCount(dispatch),
        ]).finally(() => {
          setLoading(false); // Hide loading skeleton
        });
      } 
    }, [currPage,selectedDate, dispatch]);
    // Show skeleton while loading
    if (loading) {
      return <HomePageSkeleton />;
    }
    return (
      <div className="max-w-screen-xl mx-auto py-10 lg:py-16 px-6 xl:px-0 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1">
          <div className="sticky top-0 z-10 backdrop-blur px-6 py-4 border-b">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-2xl font-semibold mb-2">Problems</h2>
              <div className="flex flex-wrap gap-4">
                <SlugDropdown loading={loading} setLoading={setLoading}/>
                <DatePicker selectedDate={selectedDate} onDateChange={dateListener} />
                {selectedDate &&
                  <Button variant="outline"
                    onClick={() => {
                      setSelectedDate(undefined);
                      setCurrPage(1); // reset to first page
                    }}
                  >
                    <CalendarOff />
                  </Button>
                }
              </div>
            </div>
          </div>
          <div className="w-full">
            <ProblemsProvider />
          </div>
          <PaginationProvider currPage={currPage} setCurrentPage={setCurrPage}/>
        </div>

        {/* Tags Sidebar */}
        <div className="lg:w-1/4 shrink-0">
          <TagsProvider />
        </div>
      </div>
    );

};

export default HomePage;
