
import PropTypes from 'prop-types';

function PackagingSelector({ packaging, selectedPack, handlePack, checkAvailabilityPackaging, showAllPackaging, setShowAllPackaging }) {
  return (
    <div className="form-strength-pack">
      <div>
        <p>Packaging:</p>
      </div>
      <div className="ml-4">
        {(showAllPackaging ? packaging : packaging.slice(0, 4)).map((packageName, index) => {
          const isPackagingAvailable = checkAvailabilityPackaging(packageName);
          return (
            <button
              key={index}
              type="button"
              className={`${selectedPack === packageName ? (isPackagingAvailable ? "selected" : "not-available-selected") : (isPackagingAvailable ? "not-selected" : "not-available-not-selected")}`}
              onClick={() => handlePack(packageName)}
            >
              {packageName}
            </button>
          );
        })}
        {packaging.length > 4 && (
          <button onClick={() => setShowAllPackaging(!showAllPackaging)}>
            {showAllPackaging ?  <p className="text-[#112D31] font-bold ">view less</p> : <p className="text-[#112D31] font-bold  ">more..</p>}
          </button>
        )}
      </div>
    </div>
  );
}

PackagingSelector.propTypes = {
  packaging: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedPack: PropTypes.string,
  handlePack: PropTypes.func.isRequired,
  checkAvailabilityPackaging: PropTypes.func.isRequired,
  showAllPackaging: PropTypes.bool.isRequired,
  setShowAllPackaging: PropTypes.func.isRequired,
};

export default PackagingSelector;
