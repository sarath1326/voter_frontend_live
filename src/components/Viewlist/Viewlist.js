

import React from 'react'
import "./Viewlist.css";
import Table from 'react-bootstrap/Table';
import { BsFillTrash3Fill } from "react-icons/bs";
import axios from "../../Constant/Axios"
import { useEffect, useState } from 'react';
import { message } from "antd";
import ReactPaginate from "react-paginate";
import { ColorRing } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';





function Viewlist() {

  const [res, setres] = useState([])
  const [search, setsearch] = useState([])
  const [empty, setempty] = useState(true)
  const [loding, setloding] = useState(true)




  const tableRef = useRef()


  useEffect(() => {



    axios("/getdata").then((respo) => {

      let result = respo.data

      if (result.data.length === 0) {

        setempty(true)
        setloding(false)

        return

      } else if (result.flag) {

        setres(result.data)
        setsearch(result.data)
        setempty(false)
        setloding(false)

      } else {

        message.error("server err")


      }

    }).catch(err => {

      message.error("somthing worng... check your connrction")

    })

  }, [])


  // search code start


  const searchfunc = (value) => {


    const result = search.filter(obj => obj.name.toUpperCase().toLowerCase().includes(value) || obj.voterid.includes(value) || obj.housename.includes(value) || obj.age.includes(value))

    if (result.length === 0) {

      setempty(true)

    } else {

      setres(result)
      setempty(false)


    }



  }


  // search code end


  // data delete code start




  const deletefunc = (id, index) => {



    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {


        axios.delete("/datadelete", { data: { id: id } }).then((respo) => {


          if (respo.data.flag) {

            res.splice(index, 1);

            setres([...res])
            Swal.fire(
              'Deleted!',
              'Data  has been deleted.',
              'success'
            )

            if (res.length === 0) {

              setempty(true)
              setloding(false)


            }



          } else {

            message.error("server err")
          }



        }).catch(err => {

          message.error("somthing worng... check your connection ")


        })







      }


    })



  }











  // pagination code start  


  const [pageNumber, setPageNumber] = useState(0);
  const userPrePage = 8;
  const pageVisited = pageNumber * userPrePage;

  const pageCount = Math.ceil(res.length / userPrePage);


  const changePage = ({ selected }) => {

    setPageNumber(selected);

  }



  const displyaData = res.slice(pageVisited, pageVisited + userPrePage)
    .map((obj, index) =>

    (



      <tr>
        <td>

          {obj.name}


        </td>



        <td>{obj.housename}</td>

        <td>{obj.age}</td>

        <td>{obj.voterid}</td>

        <td>



          <br />
          <BsFillTrash3Fill className='view-delete-icone' onClick={() => { deletefunc(obj._id, index) }} />

        </td>

      </tr>

    ))


















  return (
    <div className='view-main'>

      <div className='view-search-main'>

        <input type='text' onChange={(e) => { searchfunc(e.target.value) }} className='view-serch-box' placeholder='Search here' />



      </div>


      {


        empty ?

          <div className="view-waiting">

            {

              loding ?

                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />


                :

                <img className='view-image' src='../noresult.jpeg' alt='loding...' />


            }





          </div>




          :





          <div className='container '>


            <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
            >

              <button className='excel-btn'  > Export excel </button>

            </DownloadTableExcel>


            <Table ref={tableRef} striped bordered hover>
              <thead>
                <tr>
                  <th className='view-th'>Name</th>
                  <th> House Name</th>
                  <th>age</th>
                  <th>Voter ID</th>
                  <th> Delete </th>

                </tr>
              </thead>

              <tbody>


                {displyaData}



              </tbody>


            </Table>


            <ReactPaginate

              previousLabel={"previous"}

              nextLabel={"next"}

              pageCount={pageCount}

              onPageChange={changePage}

              containerClassName={"paginationBttns"}
              pageLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />

          </div>



      }











    </div>
  )
}

export default Viewlist
