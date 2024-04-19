// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import Axios
// import './App.css';
// import ChartComponent from "./ChartComponent";

// // const citiesData = {
  
// // };

// // const SocietyDropdown = ({ city, onSelect }) => {
// //   const societies = citiesData[city] || [];

// //   return (
// //     <select onChange={(e) => onSelect(e.target.value)}>
// //       <option value="">Select Society</option>
// //       {societies.map((society, index) => (
// //         <option key={index} value={society}>
// //           {society}
// //         </option>
// //       ))}
// //     </select>
// //   );
// // };

// const CitySocietySelector = () => {
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedSociety, setSelectedSociety] = useState("");
//   const [csvData, setCsvData] = useState([]);
//   const [cityList, setCityList] = useState([]);
//   const [societyList, setSocietyList] = useState([]);

//   function getUniqueCityNames(data) {
//     const citySet = new Set(); // Use a Set to store unique city names
//     data.forEach((entry) => {
//       if (entry.City) {
//         citySet.add(entry.City); // Add the city name to the set
//       }
//     });
//     return Array.from(citySet);
//   }
//   const getSurvayDataByCity = (selectedCity) => {
//     const filteredData = csvData.filter((entry) => entry.City === selectedCity);
//     setSocietyList(filteredData);
//   };

//   const fetchCSVData = () => {
//     const csvUrl =
//       "https://docs.google.com/spreadsheets/d/e/2PACX-1vTgI8w-NWdzdJwVdNktWKLol5ZMuYGJjcy4UqyGDB59l6Ua4lWUPXq5dLCiSFc8ub7n9o93MPQhgRsq/pub?gid=1450461553&single=true&output=csv"; // Replace with your Google Sheets CSV file URL

//     axios
//       .get(csvUrl) // Use Axios to fetch the CSV data
//       .then((response) => {
//         const parsedCsvData = parseCSV(response.data);
//         const uniqueCities = getUniqueCityNames(parsedCsvData);
        
//         setCityList(uniqueCities);
//         setCsvData(parsedCsvData); // Set the fetched data in the component's state
//       })
//       .catch((error) => {
//         console.error("Error fetching CSV data:", error);
//       });
//   };

//   function parseCSV(csvText) {
//     const rows = csvText.split(/\r?\n/); // Use a regular expression to split the CSV text into rows while handling '\r'
//     const headers = rows[0].split(","); // Extract headers (assumes the first row is the header row)
//     const data = []; // Initialize an array to store the parsed data
//     for (let i = 1; i < rows.length; i++) {
//       const rowData = rows[i].split(","); // Use the regular expression to split the row while handling '\r'
//       const rowObject = {};
//       for (let j = 0; j < headers.length; j++) {
//         rowObject[headers[j]] = rowData[j];
        
//       }
//       data.push(rowObject);
//     }
//     return data;
//   }

//   const handleCityChange = (city) => {
//     setSelectedCity(city);
//     getSurvayDataByCity(city);
//     setSelectedSociety(""); // Reset society when city changes
//   };

//   const handleSocietyChange = (data)=>{
//     setSelectedSociety(data?.target?.value)
//   }

//   useEffect(() => {
//     fetchCSVData(); // Fetch the CSV data when the component mounts
//   }, []); // The empty array ensures that this effect runs only once, like componentDidMount
//   return (
//     <div>
//       <select onChange={(e) => handleCityChange(e.target.value)}>
//         <option value="">Select City</option>
//         {cityList.length &&
//           cityList?.map((city, index) => (
//             <option key={index} value={city}>
//               {city}
//             </option>
//           ))}
//       </select>
//       {selectedCity && (
//         <select onChange={(e) => handleSocietyChange(e)}>
//           <option value="">Select Society</option>
//           {societyList.length &&
//             societyList?.map((society, index) => (
//               <option key={index} value={society['Society Name']}>
//                 {society['Society Name']}
//               </option>
//             ))}
//         </select>
//       )}
//       {selectedCity && <p>Selected : {selectedCity}</p>}
//       {selectedSociety && <p>Selected Society: {selectedSociety}</p>}
//       {selectedCity && selectedSociety && (
//         <>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-evenly",
//             }}
//           >
//             <ChartComponent
//               selectedCity={selectedCity}
//               selectedSociety={selectedSociety}
//             />
//             <div className="table-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Selected City</th>
//                     <th>Selected Society</th>
//                     <th>Country</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{selectedCity}</td>
//                     <td>{selectedSociety}</td>
//                     <td>PAN India</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CitySocietySelector;





import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import ChartComponent from "./ChartComponent";

const CitySocietySelector = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSociety, setSelectedSociety] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [societyList, setSocietyList] = useState([]);
  

  function getUniqueCityNames(data) {
    const citySet = new Set();
    data.forEach((entry) => {
      if (entry.City) {
        citySet.add(entry.City);
      }
    });
    return Array.from(citySet);
  }
  

  const getSurvayDataByCity = (selectedCity) => {
    const filteredData = csvData.filter((entry) => entry.City === selectedCity);
    setSocietyList(filteredData);
  };

  const fetchCSVData = () => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTgI8w-NWdzdJwVdNktWKLol5ZMuYGJjcy4UqyGDB59l6Ua4lWUPXq5dLCiSFc8ub7n9o93MPQhgRsq/pub?gid=1450461553&single=true&output=csv";

    axios
      .get(csvUrl)
      .then((response) => {
        const parsedCsvData = parseCSV(response.data);
        const uniqueCities = getUniqueCityNames(parsedCsvData);
        
        setCityList(uniqueCities);
        setCsvData(parsedCsvData);
      })
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
      });
  };

  function parseCSV(csvText) {
    const rows = csvText.split(/\r?\n/);
    const headers = rows[0].split(",");
    const data = [];
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(",");
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rowData[j];
      }
      const ratings = {
        Connectivity: parseFloat(rowObject["Connectivity Rating"]),
        Maintenance: parseFloat(rowObject["Maintenance Rating"]),
        Construction: parseFloat(rowObject["Construction Rating"]),
        Amenities: parseFloat(rowObject["Amenities & Livability Rating"]),
        Friendliness: parseFloat(rowObject["People Friendliness Rating"])
      };
     
      rowObject.ratings = ratings;
      data.push(rowObject);
    }
    return data;
  }

  const handleCityChange = (city) => {
    setSelectedCity(city);
    getSurvayDataByCity(city);
    setSelectedSociety("");
  };

  const handleSocietyChange = (data)=>{
    setSelectedSociety(data?.target?.value)
  }

  useEffect(() => {
    fetchCSVData();
  }, []);

  return (
    <div>
      <select onChange={(e) => handleCityChange(e.target.value)}>
        <option value="">Select City</option>
        {cityList.length &&
          cityList?.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
      </select>
      {selectedCity && (
        <select onChange={(e) => handleSocietyChange(e)}>
          <option value="">Select Society</option>
          {societyList.length &&
            societyList?.map((society, index) => (
              <option key={index} value={society['Society Name']}>
                {society['Society Name']}
              </option>
            ))}
        </select>
      )}
      {/* {selectedCity && <p>Selected : {selectedCity}</p>}
      {selectedSociety && <p>Selected Society: {selectedSociety}</p>} */}
      {selectedCity && selectedSociety && (
        <>
          <div className="container" style={{paddingTop:'20px'}}>
  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
        <th>Selected Society</th>
          <th>Selected City</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        <tr>
         <td>{selectedSociety}</td>
          <td>{selectedCity}</td>
          <td>PAN India</td>
        </tr>
        <tr>
          <td>17</td>
          <td>1259</td>
          <td>9870</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="chart-wrapper">
    <ChartComponent
      selectedCity={selectedCity}
      selectedSociety={selectedSociety}
      csvData={csvData}
    />
  </div>
</div>

          
        </>
      )}
    </div>
  );
};

export default CitySocietySelector;


