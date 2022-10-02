 export const getData = async (data) => {
   const res = await fetch('http://localhost:4000/', {
         method: "post",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
             query: data
         })
     })
     if(res.ok !== true){
        console.log(`Error: ${res.status}`)
     }
     const data_1 = await res.json();
     return data_1;
 }
    