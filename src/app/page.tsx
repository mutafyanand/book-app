'use client'

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Paper, Table, TableContainer, Box } from "@mui/material";
import { makeRequest } from "@/api";
import { APIRoutes, HttpMethods } from "@/utils/constants";
import { ApiResponseAll, ApiResponseDelete, Book } from "@/types";
import AddBookModal from "@/_components/Table/Modal";
import TableControls from "@/_components/Table/TableControls";
import TableHeader from "@/_components/Table/TableHeader";
import TableData from "@/_components/Table/TableData";

const Collection = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [data, setData] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [sorting, setSorting] = useState({
    sortBy: 'createdAt', sortOrder: "desc"
  })
  const [filterBy, setFilterBy] = useState<string | null>(null)
  const [filterValue, setFilterValue] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedFilterValue, setDebouncedFilterValue] = useState(filterValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilterValue(filterValue);
    }, 700);
    return () => {
      clearTimeout(handler);
    };
  }, [filterValue]);

  useEffect(() => {
    FetchDbData();
  }, [sorting, page, totalCount, pageSize, debouncedFilterValue, debouncedFilterValue ? filterBy : null]);

  const FetchDbData = () => {
    setLoading(true);
    const queryParams: Record<string, string | number> = {
      ...sorting,
      page,
      limit: pageSize,
    };

    if (filterBy !== undefined && filterValue && filterBy !== null) {
      queryParams[filterBy] = filterValue;
    }

    makeRequest<ApiResponseAll>({ method: HttpMethods.GET, url: APIRoutes.BOOK, params: queryParams })
      .then((res) => {
        if (res.success && res.data) {
          setData(res?.data?.books || []);
          setTotalCount(res?.data?.pagination?.totalItemCount || 0);
        } else {
          toast.error('Failed to fetch data');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSortChange = (column: string) => {
    setSorting(prevSorting => ({
      sortBy: column,
      sortOrder: prevSorting.sortBy === column && prevSorting.sortOrder === "desc" ? "asc" : "desc",
    }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddBook = (newBook: Book) => {
    setTotalCount((prevData) => prevData + 1)
    setData((prevData) => [newBook, ...prevData]);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  }

  const handleDelete = async (id: string | number) => {
    setLoading(true);
    try {
      const response = await makeRequest<ApiResponseDelete>({
        method: HttpMethods.DELETE,
        url: APIRoutes.BOOK,
        id
      });

      if (response.success) {
        setData(prevData => prevData.filter(book => book.id !== id));
        toast.success(response.message);
      } else {
        toast.error('Failed to delete the book');
      }
    } catch (error) {
      toast.error(`Error while deleting book: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFilterCol = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy((event.target as HTMLInputElement).value);
  };

  return (

    data && (
      <Box
        sx={{
          width: "95%",
          marginTop: "20px",
          display: 'flex',
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: "center",
          gap: '20px',
        }}
      >
        <TableContainer component={Paper}>
          <TableControls
            setIsModalOpen={setIsModalOpen}
            FetchDbData={FetchDbData}
            filterBy={filterBy}
            handleChangeFilterCol={handleChangeFilterCol}
            filterValue={filterValue}
            handleFilterChange={handleFilterChange}
            totalCount={totalCount}
            page={page}
            handleChangePage={handleChangePage}
            pageSize={pageSize}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
            <TableHeader sorting={sorting} handleSortChange={handleSortChange} />
            <TableData data={data} loading={loading} handleDelete={handleDelete} />
          </Table>
        </TableContainer>
        <AddBookModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} onAdd={handleAddBook} />
      </Box>)
  )
}
export default Collection