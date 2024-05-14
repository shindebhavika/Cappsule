import PropTypes from 'prop-types';
import { useState } from 'react';
function ResultPage({ index, result }) {

  return (

      <div className="  bg-gray-100 rounded-xl shadow-2xl p-3 bg-gradient-to-l from-teal-100 to-white  justify-center rounded-lg flex  bg-black w-[90%]  " key={index}>
        <div className="flex items-center p-3 justify-between   w-[90%]">
          <div className=" ">
           
            <div className="form-strength-pack ">
          <div className="">  <p>Form :</p></div>

          <div className=" ml-12 ">
          {result.available_forms.map((form)=>( <button
          key={form}
                type="button"
                className=" selected   "
                data-bs-toggle="button"
                aria-pressed="true"
                onClick={()=>{
                  console.log( result.salt_forms_json[form]
                  
              )
                }}
                >
                {form}
                
              </button>))}
          
             
          

             </div>
            </div>
            <div className="form-strength-pack ">
             <div> <p>Strengths:</p></div>
             <div className=" ml-5  ">

            
             
             <button
                type="button"
                className=" selected   "
                data-bs-toggle="button"
                aria-pressed="true">
                Tablet
              </button>

          

             </div>
            </div>
            <div className="form-strength-pack">
              <div><p>Packaging:</p></div>
              <div className=" ml-4 ">
             <button
                type="button"
                className=" selected   "
                data-bs-toggle="button"
                aria-pressed="true">
                Tablet
              </button>

            
              
          


             </div>
            </div>
          </div>
          <div className="border-red-700  border min-w-40 min-h-12 flex justify-center  flex-col items-center ">
            <p
              className="text-[
#222222] font-semibold text-base">
             {result.salt}
            </p>
            <p
              className="
text-[#2A527A] font-medium  	font-size-[12px]
leading-5">
              tablet | 100mg | 5 strips
            </p>
          </div>
          <div className=" w-[210px] h-[59px] ">
            {/* <p className=" font-extrabold text-[28px] leading-[33px]">From ₹80</p> */}

            <p className=" text-[14px] leading-[18px]  border-2 border-[#A7D6D4] font-medium  text-center text-[#112D31] p-3 bg-white rounded">
              No stores selling this product near you
            </p>
            
          </div>
        </div>
      </div>
 
  );
}
// PropTypes validation
ResultPage.propTypes = {
  index: PropTypes.number,
  result: PropTypes.object.isRequired,
};
export default ResultPage;
