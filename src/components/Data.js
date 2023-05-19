import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Data = () => {

    const [data,setData] = useState([]);
    const [name,setName] = useState('');

    const fetchData = async () => {
        
        const response = await axios.get('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')

        setData(response.data.employees)
        console.log(data);
    }
    useEffect(()=>{
        fetchData();
    },[])

    const getFilterData = () => {
        if (data.length > 0) {
            const filterData = data.filter((item) => {
              return item.name && item.name.includes(name);
            });
            setData(filterData);
            console.log(filterData);
          }
          
    }

    
  return (
<div class="flex flex-col m-16">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
      <div className="mb-4">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="search"
                className="px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Search by name"
                onChange={()=>{setName(name)}}
              />
              <button className='px-4 py-2 border border-gray-300 rounded-md' onClick={()=>{getFilterData()}}>Search</button>
             
            </div>
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">ID</th>
              <th scope="col" class="px-6 py-4">Name</th>
              <th scope="col" class="px-6 py-4">Skills</th>
              <th scope="col" class="px-6 py-4">Designation</th>
              <th scope="col" class="px-6 py-4">Projects</th>
            </tr>
          </thead>
          <tbody>
            {
                data.length > 0 && 
                data.map((item)=>{
                    return (
                        <tr
              class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td class="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
              <td class="whitespace-nowrap px-6 py-4">{item.name}</td>
              <td class="whitespace-nowrap px-6 py-4">{item.skills.map((e)=>{
                return(
                    <p>{e}</p>
                )
              })}</td>
              <td class="whitespace-nowrap px-6 py-4">{item.designation}</td>
              {
                item.projects && <td class="whitespace-nowrap px-6 py-4">{item.projects.map((e)=>{
                    return(
                        <>
                        <b className='font-bold'>{e.name}</b>
                        <p>{e.description}</p>
                        <br/>
                        <p className='font-bold'>TEAMS</p>
                        <p>{e.team.map((e)=>{
                            return (
                                <>
                                <p>Name : {e.name}</p>
                                <p>Role : {e.role}</p><br/>
                                </>
                            )
                        })}</p>
                        {
                            e.tasks && <p>{e.tasks.map((e)=>{
                                return (
                                    <>
                                    <p>ID : {e.id}</p>
                                    <p>Name : {e.name}</p>
                                    <p>Status : {e.status}</p><br/>
                                    </>
                                )
                            })}</p>
                        }
    
                        </>
                    )
                  })}</td>
              }
            </tr>
                    )
                })
            }
            
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default Data