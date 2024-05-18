import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import FormSelector from './display-results/FormSelector';
import StrengthSelector from './display-results/StrengthSelector';
import PackagingSelector from './display-results/PackagingSelector';
import PriceDisplay from './display-results/PriceDisplay';

function ResultPage({ index, result }) {
  const [price, setPrice] = useState(Infinity);
  const [selectedForm, setSelectedForm] = useState(Object.keys(result.salt_forms_json)[0]);
  const [allStrength, setAllStrength] = useState(Object.keys(result.salt_forms_json[selectedForm]));
  const [selectedStrength, setSelectedStrength] = useState(Object.keys(result.salt_forms_json[selectedForm])[0]);
  const [allPackaging, setAllPackaging] = useState(Object.keys(result.salt_forms_json[selectedForm][selectedStrength]));
  const [selectedPack, setSelectedPack] = useState(Object.keys(result.salt_forms_json[selectedForm][selectedStrength])[0]);

 
  const [showAllForms, setShowAllForms] = useState(false);
  const [showAllStrengths, setShowAllStrengths] = useState(false);
  const [showAllPackaging, setShowAllPackaging] = useState(false);

  useEffect(() => {
    updatePrice();
  }, [selectedForm, selectedStrength, selectedPack]);

  const updatePrice = () => {
    const formExists = result.salt_forms_json[selectedForm];
    const strengthExists = formExists && result.salt_forms_json[selectedForm][selectedStrength];
    const packagingExists = strengthExists && result.salt_forms_json[selectedForm][selectedStrength][selectedPack];

    if (packagingExists) {
      let prices = [];
      const sellers = result.salt_forms_json[selectedForm][selectedStrength][selectedPack];
      for (let sellerId in sellers) {
        const seller = sellers[sellerId];
        if (seller) {
          seller.forEach(item => {
            if (item.selling_price) {
              prices.push(item.selling_price);
            }
          });
        }
      }
      if (prices.length > 0) {
        setPrice(Math.min(...prices));
      } else {
        setPrice(Infinity);
      }
    } else {
      setPrice(Infinity);
    }
  };

  const checkAvailability = (data) => {
    for (let key of Object.keys(data)) {
      for (let innerKey of Object.keys(data[key])) {
        const sellers = data[key][innerKey];
        if (sellers) {
          for (let seller of Object.keys(sellers)) {
            if (sellers[seller] !== null) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  const checkAvailabilityForm = (form) => {
    return checkAvailability(result.salt_forms_json[form]);
  };

  const checkAvailabilityStrength = (strength) => {
    return checkAvailability(result.salt_forms_json[selectedForm][strength]);
  };

  const checkAvailabilityPackaging = (packageName) => {
    const sellers = result.salt_forms_json[selectedForm][selectedStrength][packageName];
    if (sellers) {
      for (let seller of Object.keys(sellers)) {
        if (sellers[seller] !== null) {
          return true;
        }
      }
    }
    return false;
  };

  const handleForm = (form) => {
    setSelectedForm(form);
    const strengths = Object.keys(result.salt_forms_json[form]);
    setAllStrength(strengths);
    const firstStrength = strengths[0];
    setSelectedStrength(firstStrength);

    const packaging = Object.keys(result.salt_forms_json[form][firstStrength]);
    setAllPackaging(packaging);
    const firstPack = packaging[0];
    setSelectedPack(firstPack);
  };

  const handleStrength = (strength) => {
    setSelectedStrength(strength);
    const packaging = Object.keys(result.salt_forms_json[selectedForm][strength]);
    setAllPackaging(packaging);
    const firstPack = packaging[0];
    setSelectedPack(firstPack);
  };

  const handlePack = (packageName) => {
    setSelectedPack(packageName);
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-2xl p-3 bg-gradient-to-l from-teal-100 to-white justify-center flex w-[70%] mt-14 parent-container" key={index}>
      <div className="flex items-center p-3  w-[100%] main-content bg-slate-00 ">
        <div className=" ">
          <FormSelector
            forms={Object.keys(result.salt_forms_json)}
            selectedForm={selectedForm}
            handleForm={handleForm}
            checkAvailabilityForm={checkAvailabilityForm}
            showAllForms={showAllForms}
            setShowAllForms={setShowAllForms}
          />
          <StrengthSelector
            strengths={allStrength}
            selectedStrength={selectedStrength}
            handleStrength={handleStrength}
            checkAvailabilityStrength={checkAvailabilityStrength}
            showAllStrengths={showAllStrengths}
            setShowAllStrengths={setShowAllStrengths}
          />
          <PackagingSelector
            packaging={allPackaging}
            selectedPack={selectedPack}
            handlePack={handlePack}
            checkAvailabilityPackaging={checkAvailabilityPackaging}
            showAllPackaging={showAllPackaging}
            setShowAllPackaging={setShowAllPackaging}
          />
        </div>
        <div className=" min-h-12 flex justify-center flex-col">
          <p className="text-[#222222] font-semibold text-base">{result.salt}</p>
          <p className="text-[#2A527A] font-medium text-[12px] leading-5">
            {selectedForm} | {selectedStrength} | {selectedPack}
          </p>
        </div>
       <div className='min-h-12 flex justify-center flex-col'> <PriceDisplay price={price} /></div>
      </div>
    </div>
  );
}

ResultPage.propTypes = {
  index: PropTypes.number,
  result: PropTypes.object.isRequired,
};

export default ResultPage;
