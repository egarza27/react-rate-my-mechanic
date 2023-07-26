import React, { useEffect, useState } from "react";
import axios from "axios";

const MaintenanceSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [vins, setVins] = useState([]);
  // const [myCar, setMyCar] = useState([]);
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4001/vehicles");
        console.log("API call successful:", response.data);
        const carsWithVin = response.data.map((car) => ({
          ...car,
          vin: car.vin,
        }));
        setVins(carsWithVin.map((car) => car.vin));
      } catch (error) {
        console.log("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, []);
  console.log(vins);
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const requests = vins.map((vin) =>
          axios.get(`http://api.carmd.com/v3.0/maintlist?vin=${vin}`, {
            headers: {
              "content-type": "application/json",
              authorization: "NDE2ZTIwMTYtZGQ3Ny00MGMwLWE2ZmQtZGU1YzUyMjc4MGRj",
              "partner-token": "7c3444026ac145f49781a785606af288",
            },
          })
        );

        const responses = await axios.all(requests);
        const schedulesData = responses.map((response) => response.data);
        console.log("API calls successful:", schedulesData);
        setSchedules(schedulesData);
      } catch (error) {
        console.log("Error fetching schedules:", error);
      }
    };

    if (vins.length > 0) {
      fetchSchedules();
    }
  }, [vins]);

  return (
    <div className="maintenance-schedules">
      <h2>Maintenance Schedules</h2>
      {schedules.length === 0 ? (
        <p>Loading schedules...</p>
      ) : (
        <ul>
          {schedules.map((scheduleData, index) => (
            <li key={index}>
              <h3>VIN: {vins[index]}</h3>
              <ul>
                {scheduleData.map((schedule) => (
                  <li key={schedule.id}>
                    Date: {schedule.date}, Description: {schedule.description}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// useEffect(() => {
//   const fetchCarDetails = async () => {
//     try {
//       const response = await axios.get("http://localhost:4001/vehicles");
//       console.log("API call successful:", response.data);

//       const vins = response.data.map((car) => car.vin);
//       setMyCar(vins);
//     } catch (error) {
//       console.log("Error fetching car details:", error);
//     }
//   };
//   fetchCarDetails();
// }, []);

// useEffect(() => {
// how can I display the car that belongs to the user that is signed-in
//     console.log(myCar);
//     if (myCar && myCar.vin) {
//       const fetchSchedules = async () => {
//         try {
//           const response = await axios.get(
//             `http://api.carmd.com/v3.0/maintlist?vin=${myCar.vin}`,
//             {
//               headers: {
//                 "content-type": "application/json",
//                 authorization:
//                   "NDE2ZTIwMTYtZGQ3Ny00MGMwLWE2ZmQtZGU1YzUyMjc4MGRj",
//                 "partner-token": "7c3444026ac145f49781a785606af288",
//               },
//             }
//           );
//           console.log("API call successful:", response.data);
//           setSchedules(response.data);
//         } catch (error) {
//           console.log("Error fetching schedules:", error);
//         }
//       };

//       fetchSchedules();
//     }
//   }, [myCar]);

//   return (
//     <div>
//       <h2>Maintenance Schedules</h2>
//       {schedules.length === 0 ? (
//         <p>Loading schedules...</p>
//       ) : (
//         <ul>
//           {schedules.map((schedule) => (
//             <li key={schedule.id}>
//               Date: {schedule.date}, Description: {schedule.description}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

export default MaintenanceSchedules;
