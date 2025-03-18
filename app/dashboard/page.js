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
  const [renderData, setRenderData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState();
  const [islistingRoom, setislistingRoom] = useState();

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
      const res = await axios.get(selectData?.url);
      if (res.status === 200 && !res.data.message) {
        setRenderData(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Error fetching data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectData]);

  return (
    <>
      <section className="flex justify-between">
        <Sidebar setislistingRoom={setislistingRoom} setOpen={setOpen} setSelectData={setSelectData} setError={setError} />
        <div className="w-fit mx-auto p-5 flex-1">
          <div className="topBar p-10">
            <FilterBar onFilterChange={(filters) => console.log(filters)} />
          </div>
          {error && <p>{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {loading ? (
              // <Loader className="animate-spin mx-auto w-full flex justify-center items-center" />
              <ShimmerEffect />
            ) : (
              !error &&
              renderData?.map((ele, index) => (
                <Card
                  key={index}
                  onClick={() => router.push(`/roommates/${ele._id ? ele._id : index}`)}
                  className="max-w-80 cursor-pointer p-5"
                >
                  <div className="mb-4">{"Icon"}</div>
                  <h3 className="text-xl font-semibold text-[#363062] mb-3">{ele.title}</h3>
                  <p className="text-[#363062]">{ele.description}</p>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
      <DialogBox open={open} setOpen={setOpen} />
    </>
  );
}
