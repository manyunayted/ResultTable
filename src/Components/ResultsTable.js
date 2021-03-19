import React,{useState,useEffect} from 'react';
import styled from 'styled-components/macro';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
 import { getTableResults } from './services'

export function ResultsTable() {
  // const [loading, setLoading] = React.useState(false); // loading state to control loading animation
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);


  const makeRequest = async requestData => {
    const results = await getTableResults(requestData);
    //handle errors here...
    //we could maybe convert it to camelCase before returning
    return (results)
  };
   //test
  
   
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(
          (result) => {
             setItems(result);
            setLoading(false);
        let requestBody = {
            shift: 1, // код смены
            start_date: '2021-03-07T00:00:00+05:00', // данные за период от
            end_date: '2021-03-08T00:00:00+05:00', // данные за период до
          };
          makeRequest(requestBody).then(res => {
            setLoading(true);
            console.log(res.data);
          });
          },
         
          (error) => {
            setLoading(true);
            setError(error);
          }
        )
    }, []) 
    if (error) {
      return <div>Error: {error.message}</div>;
    }else if (!loading) {
      return <div>Loading...</div>;
    }else  {
      return (
        <Wrapper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#Рейтинг</TableCell>
                <TableCell>ФИО</TableCell>
                <TableCell>Сумма чеков</TableCell>
                <TableCell>Кол-во товаров</TableCell>
                <TableCell>Размер бонусов</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
           { items.map((item )=> {
             return(
                <TableRow >
                <TableCell>#{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.username} or {item.email}</TableCell>
                <TableCell>{item.username} or {item.email}</TableCell>
                <TableCell>...etc.</TableCell>
               </TableRow>
            ) }) }
              
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
        
      );
    }
  }
    
  
    const Wrapper = styled.div`
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
    `;
