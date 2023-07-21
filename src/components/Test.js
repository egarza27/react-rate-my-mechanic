import { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/users");

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
export default Test;
