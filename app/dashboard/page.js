"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { House, Loader } from "lucide-react";
import DialogBox from "../components/DialogBox";
import FilterBar from "../components/FilterBar";
import { ShimmerEffect } from "../components/ShimmerEffect";
import {  useSession } from "next-auth/react";

export default function Dashboard() {
  const [selectData, setSelectData] = useState({
    name: "browse-roommate",
    url: "/api/getroomates",
  });
  const [originalData, setOriginalData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState({
    country: null,
    state: null,
    city: null,
    rentMax: null,
    genderPreference: null,
    currency: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState();
  const { data: session } = useSession();


  const router = useRouter();

  useEffect(() => {
    if(!session){
      router.push("/")
    }
    // const checkAuth = async () => {
    //   try {
    //     const res = await axios.get("/api/auth/protected");
    //     if (res.status !== 200) {
    //       throw new Error("Unauthorized");
    //     }
    //     setIsLoggedIn(true);
    //   } catch (error) {
    //     console.log("User not authenticated:", error);
    //     // router.push("/login");
    //     setIsLoggedIn(false);
    //   }
    // };

    // checkAuth();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.post(selectData?.url, { filters, currentPage });
      if (res.status === 200 && !res.data.message) {
        setOriginalData(res.data.data);
        setFilteredData(res.data.data);
        // setTotalRooms(res.data.totalRooms)
        settotalPages(Math.ceil(res.data.totalRooms / 4));

        console.log(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Error fetching data");
    }
    setLoading(false);
  };

  const onFilterChange = (filter) => {
    console.log("called");

    console.log(filters);

    const { country, state, city, rentMax } = filters;

    // Check if all filters are empty
    // const allFieldsEmpty = Object.values(filter).every(
    //   (value) => !value || value.trim() === ""
    // );

    // console.log(allFieldsEmpty);

    if (
      !filters.country &&
      !filters.state &&
      !filters.city &&
      !filters.rentMax
    ) {
      console.log("All fields are empty, resetting data", originalData);
      setFilters({
        country: null,
        state: null,
        city: null,
        rentMax: null,
        genderPreference: null,
        currency: null,
      });
      setFilteredData(originalData);
      fetchData();
      setError(null);
      console.log(error);
      return;
    }

    console.log("Fetching data with filters");
    fetchData(); // Call fetchData only when filters are applied
  };

  useEffect(() => {
    fetchData();
  }, [selectData, currentPage]);

  const handlePageChange = (val) => {
    console.log(totalPages);

    if (val == -1 && currentPage != 1) {
      console.log(currentPage);
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <section className="flex justify-between">
        <Sidebar
          setOpen={setOpen}
          setSelectData={setSelectData}
          setError={setError}
          isLoggedIn={isLoggedIn}
        />
        <div className="w-fit mx-auto p-5 flex-1">
          <div className="topBar p-10">
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              onFilterChange={onFilterChange}
              isLoggedIn={isLoggedIn}
              filteredData={filteredData}
            />
          </div>
          {error && <p>{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {loading ? (
              // <Loader className="animate-spin mx-auto w-full flex justify-center items-center" />
              <ShimmerEffect />
            ) : (
              !error &&
              filteredData?.map((ele, index) => (
                <div
                  key={index}
                  onClick={() =>
                    router.push(`/roommates/${ele._id ? ele._id : index}`)
                  }
                  className="max-w-80 cursor-pointer p-5 border border-gray-200 shadow-md shadow-gray-300 rounded-lg"
                >
                  <div className="mb-4">
                    <House />
                  </div>
                  <h3 className="text-xl font-semibold text-[#363062] mb-3">
                    {ele.title}
                  </h3>
                  <p className="text-[#363062]">{ele.description}</p>
                </div>
              ))
            )}
          </div>

          {filteredData?.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-5">
              {currentPage != 1 ? (
                <button
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => handlePageChange(-1)}
                >
                  Previous
                </button>
              ) : (
                ""
              )}

              <p className="text-lg">Current Page: {currentPage}</p>

              {totalPages != currentPage ? (
                <button
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => handlePageChange(1)}
                >
                  Next
                </button>
              ) : (
                " "
              )}
            </div>
          )}
        </div>
      </section>
      <DialogBox open={open} setOpen={setOpen} />
    </>
  );
}
