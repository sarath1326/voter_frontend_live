


import axios from "axios";



 const URL= "https://voterlistbackendlive.onrender.com"
 
 
 
//  "https://voterlistbackendlive.onrender.com"
 
 
//  "http://localhost:3001/"



     const enstans=axios.create({
                baseURL:URL
            })
     


     export default enstans ;