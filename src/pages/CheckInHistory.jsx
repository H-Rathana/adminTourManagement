import { useEffect, useState } from "react";
import API from "../services/api";

const CheckInHistory = () => {

  const [history, setHistory] =
    useState([]);


  const fetchHistory = async () => {

    try {

      const res =
        await API.get(
          "/bookings/checkedin/history"
        );

      setHistory(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };
  useEffect(() => {
    const loadFetchHistory = async ()=>{
        await fetchHistory();
    }
    loadFetchHistory();

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Check-In History
      </h1>

      <div className="bg-white rounded-3xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="p-4 text-left">
                Booking
              </th>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Tour
              </th>

              <th className="p-4 text-left">
                Location
              </th>

              <th className="p-4 text-left">
                Checked In
              </th>

            </tr>

          </thead>

          <tbody>

            {history.map(item => (

              <tr
                key={item.booking_id}
                className="border-t"
              >

                <td className="p-4">
                  #{item.booking_id}
                </td>

                <td className="p-4">
                  {item.full_name}
                </td>

                <td className="p-4">
                  {item.tour_title}
                </td>

                <td className="p-4">
                  {item.location}
                </td>

                <td className="p-4">
                  {new Date(
                    item.checked_in_at
                  ).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default CheckInHistory;