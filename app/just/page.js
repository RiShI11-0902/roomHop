"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Just() {
    const [apiData, setapiData] = useState()

    const callData = ()=>{
        try {
            const response = axios.get('https://jsonplaceholder.typicode.com/posts').then((data)=> setapiData(data.data))
         } catch (error) {
            console.log(error);
         }
    }
    useEffect(() => {
    callData()
    }, [])
    
    return (
     <>
     <div className="p-5">
     {
        apiData?.map((i)=>{
            return <div className="border shadow-gray-200 shadow-md w-fit mx-auto rounded-md border-gray-100 p-5 space-y-6">
                {i.title}
            </div>
        })
     }
     </div>
     </>
    )
  }