
import {  useState } from 'react';
import ResultPage from './ResultPage';


function Homepage() {
  const [error, setError] = useState(null);
  const [instruction, setInstruction] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([])
const onInput=(e)=>{
setSearchTerm(e.target.value)
setInstruction(false)
if(e.target.value==""){

setInstruction(true)
}}

const handleKeyDown = async (e) => {
  if (e.key === "Enter" && searchTerm.trim() !== "") {
    await handleSearch();
  }
};


const handleSearch = async () => {
  
  try {
    const response = await fetch(
      `https://backend.cappsule.co.in/api/v1/new_search?q=${searchTerm}&pharmacyIds=1,2,3`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
  
    
    setSearchResults(data.data.saltSuggestions);
 
    setError(null);
  } catch (error) {
    setError("Error fetching data");
  } 
};


  return (
    <main className="main relative w-[100%] ">
    <div className=" h-[100vh] w-[100%] gap-4 flex flex-col  items-center ">
      <div>

    
      <h1 className=' font-semibold text-2xl text-center pt-12 pb-12'>Cappsule Web Development Test</h1>



      </div>
      <div className="relative flex items-center w-[50%] h-20  focus-within:shadow-lg bg-white overflow-hidden border border-sky-500 rounded-full justify-between pl-3 pr-3 search-bar"  >
        <div className="grid place-items-center h-full w-12 text-black-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 gap-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
     
      
        <input
          className="peer h-full w-full outline-none text-[90%] pr-2 text-[
            #112D31]  leading-6 ml-4 tracking-widest text-[#112D31] font-bold"
          type="text"
          id="search"
          placeholder="Type your medicine name here"
          value={searchTerm}
          onChange={(e) =>  onInput(e)}
          onKeyDown={handleKeyDown}
  
        />
        
        <button
          className="ml-2  px-4 py-2 rounded font-semibold blue-text"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <hr className="w-[65%] mx-auto mt-8" />
      {instruction && <div className='justify-center flex items-center h-full ' ><p className='text-[rgba(136, 136, 136, 1)] justify-center font-semibold'>“ Find medicines with amazing discount “</p></div>}
{error&& <p>{error}</p>}
      
    </div>
    <div className=" flex items-center min-h-full top-28 absolute w-full flex-col gap-4 mt-[10%] ">
    {searchResults.length > 0 && (
          searchResults.map((result, index) => (
            <ResultPage key={index} result={result} />
          ))
        ) }

{searchResults.length > 0 && instruction==false&& <p>no result form</p>}
  </div>

  </main>
  )
}

export default Homepage;
