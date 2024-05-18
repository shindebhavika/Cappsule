
import PropTypes from 'prop-types';
function PriceDisplay({ price }) {
  return (
    price > 0 && price !== Infinity ? (
      <p className="text-[#112D31] text-3xl font-extrabold  font-Inter">From ₹{price}</p>
    ) : (
      <div className="w-[210px] h-[59px]">
        <p className="text-[100%] leading-[18px] border-2 border-[#A7D6D4] font-medium text-center text-[#112D31] p-3 bg-white rounded">
          No stores selling this product near you
        </p>
      </div>
    )
  );
}

PriceDisplay.propTypes = {
price: PropTypes.number
};
export default PriceDisplay;
