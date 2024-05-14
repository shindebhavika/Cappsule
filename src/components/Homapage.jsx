
import {  useState } from 'react';
import ResultPage from './ResultPage';

function Homapage() {
  const [error, setError] = useState(null);
  const [instruction, setInstruction] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([])
const onInput=(e)=>{
setSearchTerm(e.target.value)
setInstruction(false)
if(e.target.value==""){

setInstruction(true)
}
}

const handleSearch = async () => {
  
  try {
    const response = await fetch(
      `https://backend.cappsule.co.in/api/v1/new_search?q=${searchTerm}&pharmacyIds=1,2,3`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(searchResults)
    setSearchResults(data.data.saltSuggestions);

    setError(null);
  } catch (error) {
    setError("Error fetching data");
  } 
};


  return (
    <main className="main relative">
    <div className=" h-[100vh] w-[100%] gap-4 flex flex-col  items-center">
      <div>
      <p className='text-base font-normal black-text'>Cappsule web development test</p>
    
      </div>
      <div className="relative flex items-center w-[50%] h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-sky-500 rounded-[35px] justify-evenly" >
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
     
       {/* <div> <svg xmlns="http://www.w3.org/2000/svg"fill="#112D31" className="bi bi-arrow-left   w-10 " viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg></div> */}
        <input
          className="peer h-full w-full outline-none text-sm  pr-2 text-[
            #112D31] font-medium leading-6 ml-4"
          type="text"
          id="search"
          placeholder="Type your medicine name here"
          value={searchTerm}
          onChange={(e) =>  onInput(e)}
      
        />
        
        <button
          className="ml-2text-white px-4 py-2 rounded font-semibold blue-text"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {instruction && <div className='justify-center flex items-center h-full ' ><p className='text-[rgba(136, 136, 136, 1)] justify-center'>“ Find medicines with amazing discount “</p></div>}
{error&& <p>{error}</p>}
      
    </div>
    <div className=" flex items-center min-h-full top-28 absolute w-full flex-col gap-4  ">
    {searchResults.length > 0 && searchResults.map((result, index) => (
  <ResultPage key={index} result={result} />
))}

  </div>

  </main>
  )
}

export default Homapage
