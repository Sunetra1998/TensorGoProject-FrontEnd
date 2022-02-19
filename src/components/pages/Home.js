import { Box, Grid } from "@material-ui/core"
import List from "../student/List";
import axios from "axios";
import { useState } from "react";
import {CSVLink} from "react-csv";
import { useEffect } from "react";

const Home = () => {
//  const [student, setStudent] = useState({
//   name: "",
//   email: ""
//  });
 const [status, setStatus] = useState();
 const [users, setUsers] = useState(); 

const style={
    backgroundColor:"blue", 
    color:"White",
    textDecoration:"none",

}
const boxStyle={
    display:"flex", 
    justifyContent:"flex-end"
}
 useEffect(() => {
    async function getAllStudent() {
     try {
      const users = await axios.get("https://gorest.co.in/public/v2/users")
      // console.log(users.data);
      setUsers(users.data)
     } catch (error) {
      console.log("Something is Wrong");
     }
    }
    getAllStudent();
   }, [])

   const headers=[
       {label:"id", key:"id"},
       {label:"name", key:"name"},
       {label:"email", key:"email"},
       {label:"gender", key:"gender"},
       {label:"status", key:"status"}
   ]
 const csvReport={
    filename:'Report.csv',
    headers:headers,
    data:users
}

 if (status) {
  return <Home />
 }
 return (
  <>
   <Grid container justify="center" spacing={3}>

    <Grid item md={12} xs={12}>
     <List />
    </Grid>
   </Grid>
   <Box m={3}  style={boxStyle}>
      <CSVLink {...csvReport} target="_blank" style={style}>DOWNLOAD CSV</CSVLink>
      </Box>
  </>
 )
}

export default Home
