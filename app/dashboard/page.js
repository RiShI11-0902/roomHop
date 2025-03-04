"use client";
import { Card } from "@/components/ui/card";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { roomDetails, roomMateDetails } from "../constants";

export default function Dashboard() {
  const [selectData, setSelectData] = useState(null);
  const [renderData, setRenderData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [open, setSetopen] = useState();
  const [islistingRoom, setislistingRoom] = useState();
  const [formdata, setFormdata] = useState();

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(selectData?.url);
      console.log(res);
      if (res.status == 200 && !res.data.message) {
        setRenderData(res.data.data);
      }else{
        setError(res.data.message)
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      // setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectData]);

  const handleChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    console.log(formdata);
    setSetopen(false);
    try {
      const res = await axios.post("/api/listroom", { formdata, islistingRoom:islistingRoom });
      console.log(res);
      
      // if(res.status == 200){
      //   router.refresh()
      // }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="flex justify-between ">
        <div>
          <Sidebar
            setislistingRoom={setislistingRoom}
            setSetopen={setSetopen}
            setSelectData={setSelectData}
            setError={setError}
          />
        </div>
        <div className="w-fit mx-auto p-5 flex-1 ">
          <div className="topBar p-10">TopBar Contents</div>
          { error  && <p>{error}</p>}
          <div className=" grid grid-cols-1 md:grid-cols-4 gap-5">
            {loading ? (
              <Loader className="animate-spin mx-auto w-full flex justify-center items-center" />
            ) : ( !error &&
              renderData?.map((ele, index) => {
                return (
                  <Card
                    onClick={() => {
                      router.push(`/roommates/${index}`);
                    }}
                    key={index}
                    className="max-w-80 cursor-pointer p-5"
                  >
                    <div className="mb-4">{"Icon"}</div>
                    <h3 className="text-xl font-semibold text-[#363062] mb-3">
                      {ele.title}
                    </h3>
                    <p className="text-[#363062]">{ele.title}</p>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={() => setSetopen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {islistingRoom ? "List Yout Room" : "List Roomate Request"}
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col space-y-2">
                {roomDetails.map((ele, i) => {
                  return (
                    <div key={i}>
                      {ele.type && (
                        <div>
                          {/* <Label htmlFor={ele.label}>{ele.label} </Label> */}
                          <Input
                            name={ele.name}
                            placeholder={ele.placeholder}
                            type={ele.type}
                            onChange={handleChange}
                          />
                        </div>
                      )}

                      {ele.name == "GenderPreference" && (
                        <select
                          defaultValue={"Add Gender"}
                          className="w-full p-2 border rounded"
                          name={ele.name}
                          onChange={handleChange}
                        >
                          <option disabled value="Add Gender">
                            Add Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Any">Any</option>
                        </select>
                      )}
                    </div>
                  );
                })}
                {!islistingRoom && (
                  <div>
                    <input
                      type="checkbox"
                      name="requestingRoommate"
                      value="Yes"
                      checked={true}
                      id="requestingRoommate"
                    />
                    <label htmlFor="requestingRoommate" className="ml-2">
                      Requesting Roommate
                    </label>
                  </div>
                )}
                <input type="button" value="Submit" onClick={onSubmit} />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
