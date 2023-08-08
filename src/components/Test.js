import { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/vehicles");

        console.log("API call successful:", response.data);

        setData(response.data);
      } catch (error) {
        console.log("Error fetching schedules:", error);
      }
    };
    fetchData();
  }, []);

  console.log(data);
  return <div>test</div>;
};

// const Test2 = () => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://api.carmd.com/v3.0/maint?vin=1GNALDEK9FZ108495&mileage=100000`,
//           {
//             headers: {
//               "content-type": "application/json",
//               authorization:
//                 "Basic NDE2ZTIwMTYtZGQ3Ny00MGMwLWE2ZmQtZGU1YzUyMjc4MGRj",
//               "partner-token": "7c3444026ac145f49781a785606af288",
//             },
//           }
//         );
//         console.log(response.data);
//       } catch (error) {
//         console.log("Error fetching schedules:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   console.log(data);
//   return <div>test</div>;
// };

export default Test;
