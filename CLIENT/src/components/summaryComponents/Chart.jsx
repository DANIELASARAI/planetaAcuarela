import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { setHeaders, url } from "../../slices/api";

const Chart = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/orders/week-sales`, setHeaders());
        res.data.sort(compare);
        const newData = res.data.map((item) => {
          const Days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
          return {
            day: Days[item._id - 1],
            Monto: item.total,
          };
        });
        setSales(newData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const data = [
    {
      day: "Lunes",
      Monto: 4000,
    },
    {
      day: "Martes",
      Monto: 3000,
    },
  ];

  return (
    <>
      {loading ? (
        <Loader>Cargando Gráfico...</Loader>
      ) : (
        <StyledChart>
          <h3>Ganancias en los últimos 7 días</h3>
          <ResponsiveContainer>
            <LineChart
              width={500}
              height={300}
              data={sales}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Monto"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </StyledChart>
      )}
    </>
  );
};

export default Chart;

const StyledChart = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 2rem;
 
}
  padding: 1rem;
  border: 2px solid rgba(48, 51, 78, 0.2);
  border-radius: 5px;
  h3 {
    margin-bottom: 1rem;
    font-family: Poppins;
    font-size: 12px;
    color:rgba(48, 51, 78, 1);
  }
  ${mobile({
    display: "none",
  })};
`;

const Loader = styled.p`
  margin-top: 2rem;
  font-family: Yomogi;
`;
