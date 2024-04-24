import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import ChartComponent from "./ChartComponent";
import Select from 'react-select';
import { fetchTSVData } from "./service";

const CitySocietySelector = () => {
  const [selectedCity, setSelectedCity] = useState("");
  // const [selectedCityRatings, setSelectedCityRatings] = useState({});
  const [panIndiaRatings, setPanIndiaRatings] = useState({});
  const [selectedSociety, setSelectedSociety] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [societyList, setSocietyList] = useState([]);
  const [counts, setCounts] = useState({ city: 0, society: 0 });
  const [rowData, setRowData] = useState([]);

  function getUniqueCityNames(data) {
    const citySet = new Set();
    data.forEach((entry) => {
      if (entry.City) {
        citySet.add(entry.City);
      }
    });
    return Array.from(citySet);
  }

  const calculateMeanRatings = (array, key) => {
    if (array.length === 0) {
      return 0;
    }
    const sumOfRatings = array.reduce((total, item) => {
      if (item[key]) return total + parseFloat(item[key]);
      else return total + 0;
    }, 0);
    const meanRating = sumOfRatings / array.length;
    return parseFloat(meanRating?.toFixed(1));
  };

  const fetchRowData = async () => {
    let data = await fetchTSVData();
    let data1 = parseTSV(data);
    setRowData(data1);
  };

  useEffect(() => {
    fetchCSVData();
    fetchRowData();
  }, []);

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

        const ratings = {
          Connectivity: calculateMeanRatings(parsedCsvData, "Connectivity"),
          Maintenance: calculateMeanRatings(
            parsedCsvData,
            "Maintenance Rating"
          ),
          Construction: calculateMeanRatings(
            parsedCsvData,
            "Construction Rating"
          ),
          Amenities: calculateMeanRatings(
            parsedCsvData,
            "Amenities & Livability Rating"
          ),
          Friendliness: calculateMeanRatings(
            parsedCsvData,
            "People Friendliness Rating"
          ),
        };
        setPanIndiaRatings(ratings);
      })
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
      });
  };

  const parseCSV = (csvText) => {
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
        Connectivity: parseFloat(rowObject["Connectivity"]),
        Maintenance: parseFloat(rowObject["Maintenance Rating"]),
        Construction: parseFloat(rowObject["Construction Rating"]),
        Amenities: parseFloat(rowObject["Amenities & Livability Rating"]),
        Friendliness: parseFloat(rowObject["People Friendliness Rating"]),
      };
      rowObject.ratings = ratings;
      data.push(rowObject);
    }
    return data;
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    getSurvayDataByCity(city);
    setSelectedSociety("");
  };

  const getSurvayDataByCity = (selectedCity) => {
    const filteredData = csvData.filter((entry) => entry.City === selectedCity);
    setCounts({ ...counts, city: filteredData.length });
    setSocietyList(filteredData);
  };

  const parseTSV = (csvText) => {
    const rows = csvText.split(/\r?\n/);
    const headers = rows[0].split("\t");
    const data = [];
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split("\t");
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rowData[j];
      }
      data.push(rowObject);
    }
    return data;
  };

  const handleSocietyChange = (society) => {
    setSelectedSociety(society?.value);
    let data = rowData.filter(
      (entry) => entry["Society Name"] === society?.value
    ).length;
    setCounts({ ...counts, society: data });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        <Select
          options={cityList.map((city) => ({ value: city, label: city }))}
          onChange={(selectedOption) => handleCityChange(selectedOption.value)}
          placeholder="Select City"
          styles={{ container: (provided) => ({ ...provided, width: 250 }) }}
        />
        {selectedCity && (
          <Select
            options={societyList.map((society) => ({
              value: society["Society Name"],
              label: society["Society Name"],
            }))}
            onChange={(selectedOption) => handleSocietyChange(selectedOption)}
            placeholder="Select Society"
            styles={{ container: (provided) => ({ ...provided, width: 250 }) }}
          />
        )}
      </div>
      {selectedCity && selectedSociety && (
        <>
          <div className="container" style={{ paddingTop: "20px" }}>
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
                    <td>{counts?.society || 0}</td>
                    <td>{counts?.city || 0}</td>
                    <td>{rowData?.length || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="chart-wrapper">
              <ChartComponent
                selectedCity={selectedCity}
                selectedSociety={selectedSociety}
                csvData={csvData}
                panIndiaRatings={panIndiaRatings}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CitySocietySelector;
