


import React from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import axios from "../../Constant/Axios"
import { message } from "antd";
import Swal from 'sweetalert2';




function Home() {

  const navigate = useNavigate();
  const [loding, setloding] = useState(true);
  const [code,setcode]=useState(false)


    useEffect(()=>{

         axios("/checkconnect").then((respo)=>{

           if(respo.data.flag){

              setloding(false)

           }else{

            message.error("server err")


           }

         }).catch(err=>{

          message.error("somthing worng... check your connection..")


         })

    },[])


    const viewfunc= async()=>{

      const code=1937

      const { value: password } = await Swal.fire({
        title: 'Enter your password',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      
      if (password) {
       
          if(password==code){

           navigate("/viewlist")
          
          }else{

             message.error("password not match")

          }

    }else{

         message.error("enter password")
    }

  }





  return (
    <div >



      <div className='home-main'>


        {
          loding ?

            <div className='home-loding-box'>

              <Oval
                height={40}
                width={40}
                color="white"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="black"
                strokeWidth={2}
                strokeWidthSecondary={2}

              />

                <p className='home-loding-text'> Please wait...</p>



            </div>

            :


              

           <>


              <button onClick={() => { navigate('/newadd') }} className='home-btn-new'> Add New</button>

              <button onClick={viewfunc} className='home-btn-view'> View Liest </button>

            </>




        }











      </div>

    </div>
  )
}

export default Home
