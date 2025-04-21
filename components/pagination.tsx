import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";  
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function PaginationProvider({currPage, setCurrentPage} : {currPage: number, setCurrentPage: any}) {
    const count = useSelector((state: RootState) => state.submissions.count);
    const totalPages = Math.ceil(count / 10) ; // Assuming 10 items per page
    const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>, page: number, direction: string) => {
        e.preventDefault();
        if(direction === "+" && page < totalPages) {
            setCurrentPage(page + 1);
        } else if (direction === "-" && page > 1) {
            setCurrentPage(page -1);
        } else if(direction === "=" && page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    return (
    <Pagination>
        <PaginationContent>
            <PaginationItem>
                <PaginationPrevious
                 href="#" 
                 onClick={(e) => handlePageChange(e, currPage, "-")}
                 className={currPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
            </PaginationItem>
            {Array.from({ length: totalPages}, (_, index) => {
                const pageNumber = index+1;
                return (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink
                            href ="#"
                            onClick={(e) => handlePageChange(e, pageNumber, "=")}
                            isActive={pageNumber === currPage}
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                );
            })}
            <PaginationItem>
                <PaginationNext href="#" 
                    onClick={(e) => handlePageChange(e, currPage, "+")}
                    className={currPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
    )
}