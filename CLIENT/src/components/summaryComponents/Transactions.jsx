import axios from "axios";
import moment from "moment";
import localization from "moment/locale/es";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { setHeaders, url } from "../../slices/api";
import { Small, Tiny } from "../Typography";

moment.updateLocale("es", localization);

const Transactions = () => {
  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}/orders/?new=true`, setHeaders());
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const flattened = orders.flatMap((num) => num);
  console.log(
    "🚀 ~ file: Transactions.jsx:34 ~ Transactions ~ flattened",
    flattened
  );
  return (
    <StyledTransactions>
      {isLoading ? (
        <p>Cargando transacciones...</p>
      ) : (
        <>
          <Small>Últimas transacciones</Small>
          {orders?.map((order, index) => (
            <Transaction key={index}>
              <Text>
                <Tiny>{order.shipping.name}</Tiny>
                <Tiny> CLP {order.total}</Tiny>
              </Text>
              <Text>
                <Tiny>{moment(order.createdAt).fromNow()}</Tiny>
              </Text>
            </Transaction>
          ))}
        </>
      )}
    </StyledTransactions>
  );
};

export default Transactions;

const StyledTransactions = styled.div` 
background: rgba(48, 51,78);
color: rgba(234, 234,255, 0.87);
padding: 2rem;
border-radius: 5px;
width: 80%;
}`;
const Text = styled.div` 
margin-rigth: 0.5rem;
margin-left: 0.5rem;

}`;

const Transaction = styled.div`
  display: flex;
  font-size: 10px;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);
  p {
    flex: 1;
  }
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;
