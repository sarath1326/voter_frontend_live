

import React from 'react'
import "./Form.css"
import { useFormik } from "formik"
import { validationSchema } from "./FormSchema"
import axios from "../../Constant/Axios"
import {message} from "antd"



function Form() {



    const initialValues = {

        name: "",
        housename: "",
        age: "",
        voterid: ""

    }


    const { errors, values, handleChange, handleBlur, handleSubmit, touched } = useFormik({

        initialValues: initialValues,
        validationSchema: validationSchema,

        onSubmit: (value,action) => {

              axios.post("/formsubmit",value).then((respo)=>{

                  if(respo.data.err){

                      message.error("server err")

                  }else if(respo.data.flag){

                    message.success("your data added")
                   
                    action.resetForm();


                  }else{

                       message.error("somthing err")
                  }



              }).catch(err=>{

                 message.error("somthing err.. check your connection")



              })

        
        }



    })






    return (
        <div className='form-main'>



            <div className='form-box-main'>

                <div>

                    <p className='form-title'> Enter Your Detailes </p>


                    <form onSubmit={handleSubmit}>

                        <label>Full Name</label><br />

                        <input type='text'
                            name='name'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}


                        /><br />

                        {
                            errors.name && touched.name ?

                                <> <span> {errors.name}</span><br /> </>

                                : <br />
                        }




                        <label> House Name </label><br />

                        <input type='text'
                            name='housename'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.housename}



                        /><br />

                        {
                            errors.housename && touched.housename ?

                                <> <span> {errors.housename}</span><br /> </>

                                : <br />
                        }


                        <label> Age </label><br />

                        <input type='text'
                            name='age'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.age}



                        /><br />

                        {
                            errors.age && touched.age?

                                <> <span> {errors.age}</span><br /> </>

                                : <br />
                        }


                        <label> Voter ID </label><br />

                        <input type='text'
                            name='voterid'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.voterid}


                        /><br /><br/>

                        <input type='file' accept='image/*' capture="environment" />

                        




                        <button type='submit' className='form-btn'> Submit </button>





                    </form>

                </div>







            </div>



















        </div>
    )
}

export default Form
