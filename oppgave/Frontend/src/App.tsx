import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  phone: string;
  email: string; // Or use 'e-mail' if your backend returns it with a hyphen
}
export const App = () => {
  const [data, setData] = useState<User[]>([]);
  
 
  useEffect(()=> {
    fetch('http://localhost:8081/user')
    .then(res=>res.json())
    .then(data => setData(data))
    .catch(err => console.log(err)) ; 
  },[])
  return (
    <div style={{padding: "50px"}}>
      <table>
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Phone</th>
          <th>E-mail</th>
        </thead>
      </table>
      <tbody>
        {data.map((d, i)=>(
          <tr key={i}>
            <td>{d.id}</td>
            <td>{d.name}</td>
            <td>{d.phone}</td>
            <td>{d.email}</td>
          </tr>
        ))}
      </tbody>

    </div>
  )
}
