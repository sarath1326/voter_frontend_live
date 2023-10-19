

import * as Yup from "yup" ;



export const validationSchema=Yup.object({


     name:Yup.string().required(" * this filed is required"),
     housename:Yup.string().required("* this filed is required"),
     age:Yup.string().required(" * this filed is required")

})