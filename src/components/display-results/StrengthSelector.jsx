
import PropTypes from 'prop-types';

function StrengthSelector({ strengths, selectedStrength, handleStrength, checkAvailabilityStrength, showAllStrengths, setShowAllStrengths }) {
  return (
    <div className="form-strength-pack">
      <div>
        <p>Strengths:</p>
      </div>
      <div className="ml-5 ">
        {(showAllStrengths ? strengths : strengths.slice(0, 4)).map((strength, index) => {
          const hasAvailablePackaging = checkAvailabilityStrength(strength);
          return (
            <button
              key={index}
              type="button"
              className={`${selectedStrength === strength ? (hasAvailablePackaging ? "selected" : "not-available-selected") : (hasAvailablePackaging ? "not-selected" : "not-available-not-selected")}`}
              onClick={() => handleStrength(strength)}
            >
              {strength}
            </button>
          );
        })}
        {strengths.length > 4 && (
          <button onClick={() => setShowAllStrengths(!showAllStrengths)}>
            {showAllStrengths ? <p className="text-[#112D31] font-bold ">view less</p> : <p className="text-[#112D31] font-bold  ">more..</p>}
          </button>
        )}
      </div>
    </div>
  );
}

StrengthSelector.propTypes = {
  strengths: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedStrength: PropTypes.string,
  handleStrength: PropTypes.func.isRequired,
  checkAvailabilityStrength: PropTypes.func.isRequired,
  showAllStrengths: PropTypes.bool.isRequired,
  setShowAllStrengths: PropTypes.func.isRequired,
};

export default StrengthSelector;
