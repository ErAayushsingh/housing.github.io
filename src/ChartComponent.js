
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ selectedCity, selectedSociety, csvData, panIndiaRatings }) => {
    const societyChartRef = useRef(null);
    const cityChartRef = useRef(null);
    const panIndiaChartRef = useRef(null);

    useEffect(() => {
        const rowData = csvData.find(row => row['City'] === selectedCity && row['Society Name'] === selectedSociety);
        const ratingsData = rowData?.ratings;

        const categories = Object.keys(ratingsData);
        const societyCtx = societyChartRef.current.getContext('2d');

        const generateColors = (numColors) => {
            const colors = [];
            for (let i = 0; i < numColors; i++) {
                const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
                colors.push(color);
            }
            return colors;
        };

        const colors = generateColors(categories.length);

        if (selectedSociety && selectedCity) {
            const cityCtx = cityChartRef.current.getContext('2d');

            if (ratingsData) {
                const societyChart = new Chart(societyCtx, {
                    type: 'bar',
                    data: {
                        labels: categories,
                        datasets: [{
                            label: `Ratings for ${selectedSociety}`,
                            data: categories.map(category => ratingsData[category]),
                            backgroundColor: colors, // Random colors
                            borderColor: colors,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                suggestedMin: 1,
                                suggestedMax: 5,
                                ticks: {
                                    stepSize: 1
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    boxWidth: 10,
                                    font: {
                                        size: 14,
                                        weight: 'bold'
                                    }
                                }
                            }
                        }
                    }
                });

                const cityRatings = csvData.filter(row => row['City'] === selectedCity);
                const cityData = cityRatings.map(row => row.ratings);
                const cityMeanRatings = calculateMeanRatings(cityData);

                const getRandomColor = () => {
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    return `rgb(${r}, ${g}, ${b})`;
                };

                const cityChart = new Chart(cityCtx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(cityMeanRatings),
                        datasets: [{
                            label: `Total Ratings for ${selectedCity}`,
                            data: Object.values(cityMeanRatings),
                            backgroundColor: Array.from({ length: Object.keys(cityMeanRatings).length }, () => getRandomColor()),
                            borderColor: Array.from({ length: Object.keys(cityMeanRatings).length }, () => getRandomColor()),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                suggestedMin: 1,
                                suggestedMax: 5,
                                ticks: {
                                    stepSize: 1
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    boxWidth: 10,
                                    font: {
                                        size: 14,
                                        weight: 'bold'
                                    }
                                }
                            }
                        }
                    }
                });

                return () => {
                    societyChart.destroy();
                    cityChart.destroy();
                };
            }
        }
    }, [selectedCity, selectedSociety, csvData]);


    useEffect(() => {
        const panIndiaCtx = panIndiaChartRef.current.getContext('2d');

        if (Object.keys(panIndiaRatings).length > 0) {
            console.log(panIndiaRatings)
            const categories = Object.keys(panIndiaRatings);

            const colors = generateColors(categories.length); // Generate new colors

            const panIndiaChart = new Chart(panIndiaCtx, {
                type: 'bar',
                data: {
                    labels: categories,
                    datasets: [{
                        label: 'Total Ratings of PAN India',
                        data: categories.map(category => panIndiaRatings[category]),
                        backgroundColor: colors, // Random colors
                        borderColor: colors,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            suggestedMin: 1,
                            suggestedMax: 5,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                boxWidth: 10,
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }
            });

            return () => {
                panIndiaChart.destroy();
            };
        }
    }, [panIndiaRatings]);

    const calculateMeanRatings = (data) => {
        const meanRatings = {};

        Object.keys(data[0]).forEach(category => {
            const sum = data.reduce((acc, row) => acc + row[category], 0);
            meanRatings[category] = sum / data.length;
       //     console.log(data.length);
        });

        return meanRatings;

    };

    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
            colors.push(color);
        }
        return colors;
    };

    return (
        <div>
            {selectedSociety && selectedCity &&
                <div className="chart-container">
                    <canvas id="society-chart" ref={societyChartRef}></canvas>
                    <canvas id="city-chart" ref={cityChartRef}></canvas>
                </div>
            }
            <div className="chart-container">
                <canvas id="pan-india-chart" ref={panIndiaChartRef}></canvas>
            </div>
        </div>
    );
}

export default ChartComponent;
