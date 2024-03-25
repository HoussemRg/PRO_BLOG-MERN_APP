import React from 'react'

const Pagination = ({pages,setCurrentPage,currentPage}) => {
  const pagesArray=[];
  for(let i=1;i<=pages;i++){
    pagesArray.push(i);
  }
  return (
    <div className='flex justify-center  items-center  h-5 w-full mt-5 mb-9 cursor-pointer '>
      <button disabled={currentPage===1} onClick={()=> setCurrentPage(current=>current-1)} className=' border-gray-400 border  shadow-lg rounded-l-md  p-2  text--gray-400 hover:bg-cyan-400 '>previous</button>
      {pagesArray.map((page)=>(
        <div onClick={()=>setCurrentPage(page)} key={page} className={`${currentPage===page ? "bg-cyan-400 cursor-auto disabled:cursor-not-allowed" : ""}  border-gray-400 shadow-lg border py-2 px-3  hover:bg-cyan-400 text-gray-400 `}> {page}</div>
      ))}
      <button disabled={currentPage===pages} onClick={()=> setCurrentPage(current=>current+1)} className=' border-gray-400 shadow-lg border p-2 rounded-r-md rounded-br-md  text--gray-400 hover:bg-cyan-400 '>next</button>
    </div>
  )
}

export default Pagination
