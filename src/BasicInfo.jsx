// import React from 'react'

export default function BasicInfo({ data }) {


  return (
    <>
      <h2>Basic Data</h2>
      <p>
        Name: {data.firstName} {data.lastName}
      </p>
      <p>email: {data.email}</p>
      <p>tel: {data.mobile}</p>
     
    </>
  );
}
