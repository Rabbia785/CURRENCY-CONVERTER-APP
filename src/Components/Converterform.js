
// import React, { useState } from "react";
// import CurrencySelect from './Currencyselect';

// function Converterform() {
//   const [amount, setAmount] = useState();
//   const [fromCurrency, setFromCurrency] = useState("USD");
//   const [toCurrency, setToCurrency] = useState("PKR");
//   const [result, setResult] = useState("");
//   console.log(result,"Result")

//   const handleSwapCurrency = () => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//   };

//   const getExchangedRate = async () => {
//     // const API_KEY = process.env.REACT_APP_API_KEY;
//    const API_URL=  `https://open.er-api.com/v6/latest/${fromCurrency}`;

//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) throw new Error("Something went wrong!");

//       const data = await response.json();
//       console.log(data,"Data");


//       if (data && data.conversion_rate) {
//         const rate = (data.conversion_rate * amount).toFixed();
//         console.log(rate,"Rate");
//         setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
//       } else {
//         throw new Error("Invalid response from API");
//       };
    
      
//     }
//      catch (error) {
//       console.error("Error fetching exchange rate:", error);
//       // setResult("Error calculating exchange rate. Please try again.");
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (amount && fromCurrency && toCurrency) {
//       getExchangedRate();
//     }
//   };

//   return (
//     <form className="converter-form" onSubmit={handleFormSubmit}>
//       <div className="form-group">
//         <label className="form-label">Enter Account</label>
//         <input
//           type="number"
//           className="form-input"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           required
//         />
//       </div>

//       <div className="form-group  form-currency-group">
//         <div className="form-section">
//           <label className="form-label">Form</label>
//           <CurrencySelect
//             selectedCurrency={fromCurrency}
//             handleCurrency={(e) => setFromCurrency(e.target.value)}
//           />
//         </div>

//         <div className="swap-icon" onClick={handleSwapCurrency}>
//           <svg
//             width="16"
//             viewBox="0 0 20 19"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
//               fill="#fff"
//             />
//           </svg>
//         </div>

//         <div className="form-section">
//           <label className="form-label">To</label>
//           <CurrencySelect
//             selectedCurrency={toCurrency}
//             handleCurrency={(e) => setToCurrency(e.target.value)}
//           />
//         </div>
//       </div>

//       <button type="submit" className="submit-button">
//         {" "}
//         Get Exchange Rate
//       </button>

//       <p className="exchange-rate-result">{result}</p>
//     </form>
//   );
// }

// export default Converterform;









import React, { useState } from "react";
import CurrencySelect from './Currencyselect';

function Converterform() {
  // Initialize amount as an empty string to avoid uncontrolled component warning
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [result, setResult] = useState("");
  console.log(result, "Result");

  const handleSwapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
 
  const getExchangedRate = async () => {
    const API_URL = `https://open.er-api.com/v6/latest/${fromCurrency}`;
  
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Something went wrong with the API request!");
  
      const data = await response.json();
      console.log(data, "Full API Response");
  
      // Check if `rates` exists and get the conversion rate for `toCurrency`
      if (data && data.rates && data.rates[toCurrency]) {
        const rate = (data.rates[toCurrency] * amount).toFixed(2); // Use `rates` instead of `conversion_rates`
        console.log(rate, "Calculated Rate");
        setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
      } else {
        throw new Error("Invalid response from API: No rates found for the selected currency");
      }
  
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setResult("Error calculating exchange rate. Please try again.");
    }
  };
  
 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (amount && fromCurrency && toCurrency) {
      getExchangedRate();
    }
  };

  return (
    <form className="converter-form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label className="form-label">Enter Amount</label>
        <input
          type="number"
          className="form-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="form-group form-currency-group">
        <div className="form-section">
          <label className="form-label">From</label>
          <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)}
          />
        </div>

        <div className="swap-icon" onClick={handleSwapCurrency}>
          <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
              fill="#fff"
            />
          </svg>
        </div>

        <div className="form-section">
          <label className="form-label">To</label>
          <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={(e) => setToCurrency(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        Get Exchange Rate
      </button>

      <p className="exchange-rate-result">{result}</p>
    </form>
  );
}

export default Converterform;
