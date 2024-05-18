
import PropTypes from 'prop-types';

function FormSelector({ forms, selectedForm, handleForm, checkAvailabilityForm, showAllForms, setShowAllForms }) {
  return (
    <div className="form-strength-pack">
      <div>
        <p>Form :</p>
      </div>
      <div className="ml-12">
        {(showAllForms ? forms : forms.slice(0, 4)).map((form) => {
          const isFormAvailable = checkAvailabilityForm(form);
          return (
            <button
              key={form}
              type="button"
              className={`${selectedForm === form ? (isFormAvailable ? "selected" : "not-available-selected") : (isFormAvailable ? "not-selected" : "not-available-not-selected")}`}
              onClick={() => handleForm(form)}
            >
              {form}
            </button>
          );
        })}
        {forms.length > 4 && (
          <button onClick={() => setShowAllForms(!showAllForms)}>
            {showAllForms ?  <p className="text-[#112D31] font-bold ">view less</p> : <p className="text-[#112D31] font-bold  ">more..</p>}
          </button>
        )}
      </div>
    </div>
  );
}

FormSelector.propTypes = {
  forms: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedForm: PropTypes.string,
  handleForm: PropTypes.func.isRequired,
  checkAvailabilityForm: PropTypes.func.isRequired,
  showAllForms: PropTypes.bool.isRequired,
  setShowAllForms: PropTypes.func.isRequired,
};

export default FormSelector;
