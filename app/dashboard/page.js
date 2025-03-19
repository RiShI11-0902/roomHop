"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card } from "@/components/ui/card";
import Sidebar from "../components/Sidebar";
import { Loader } from "lucide-react";
import DialogBox from "../components/DialogBox";
import FilterBar from "../components/FilterBar";
import { ShimmerEffect } from "../components/ShimmerEffect";

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
  const [islistingRoom, setislistingRoom] = useState();
  const [filters, setFilters] = useState({
    country: "",
    state: "",
    city: "",
    rentMin: "",
    rentMax: "",
    genderPreference: "",
    currency: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRooms, setTotalRooms] = useState()
  const [totalPages, settotalPages] = useState()

  const router = useRouter();

  // 🔹 Check authentication when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/protected"); // Call API to check JWT token
        if (res.status !== 200) {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.log("User not authenticated:", error);
        router.push("/login"); // Redirect to login if not authenticated
      }
    };

    checkAuth();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.post(selectData?.url, { filters, currentPage });
      if (res.status === 200 && !res.data.message) {
        setOriginalData(res.data.data);
        setFilteredData(res.data.data);
        // setTotalRooms(res.data.totalRooms)
        settotalPages(Math.ceil(res.data.totalRooms / 4))
        console.log(totalPages);
        
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
    console.log(filter);

    if (
      filter.country == "" &&
      filter.state == "" &&
      filter.city == "" &&
      filter.rentMax &&
      filter.currency
    ) {
      console.log(originalData);

      setFilteredData(originalData);
      return;
    }

    // const newData = filteredData.filter((ele) => {
    //   return (
    //     (filter.country && ele.country?.toLowerCase() === filter.country.toLowerCase()) ||
    //     (filter.state && ele.state?.toLowerCase() === filter.state.toLowerCase()) ||
    //     (filter.city && ele.city?.toLowerCase() === filter.city.toLowerCase())
    //   );
    // });

    // console.log(newData);

    setFilteredData(newData);
  };

  useEffect(() => {
    fetchData();
  }, [selectData, currentPage]);

  const handlePageChange = (val) => {
    // console.log(currentPage);
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
          setislistingRoom={setislistingRoom}
          setOpen={setOpen}
          setSelectData={setSelectData}
          setError={setError}
        />
        <div className="w-fit mx-auto p-5 flex-1">
          <div className="topBar p-10">
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              onFilterChange={onFilterChange}
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
                <Card
                  key={index}
                  onClick={() =>
                    router.push(`/roommates/${ele._id ? ele._id : index}`)
                  }
                  className="max-w-80 cursor-pointer p-5"
                >
                  <div className="mb-4">{"Icon"}</div>
                  <h3 className="text-xl font-semibold text-[#363062] mb-3">
                    {ele.title}
                  </h3>
                  <p className="text-[#363062]">{ele.description}</p>
                </Card>
              ))
            )}
          </div>

         {
          filteredData?.length > 0 &&  <div className="flex items-center justify-center gap-4 mt-5">
          { currentPage != 1 ?
            <button
              className={`px-4 py-2 rounded-lg border ${
                currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(-1)}
            >
              Previous
            </button> : ""
          }

          <p className="text-lg">Current Page: {currentPage}</p>

          { totalPages != currentPage ?
          <button
            className={`px-4 py-2 rounded-lg border ${
              currentPage === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(1)}
          >
            Next
          </button> : " "
          }
        </div>
         }
        </div>
      </section>
      <DialogBox open={open} setOpen={setOpen} />
    </>
  );
}
