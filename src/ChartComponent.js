
// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const ChartComponent = ({ selectedCity, selectedSociety }) => {
//     const chartRef = useRef(null);
//     const chartInstance = useRef(null);


    

//     useEffect(() => {
//         const ratingsData = {
//             Connectivity: { [selectedSociety]: 3.0, [selectedCity]: 4.0, 'Pan India': 4.5 },
//             Maintenance: { [selectedSociety]: 3.5, [selectedCity]: 4.2, 'Pan India': 4.7 },
//             Construction: { [selectedSociety]: 3.8, [selectedCity]: 4.5, 'Pan India': 4.9 },
//             Amenities: { [selectedSociety]: 4.0, [selectedCity]: 4.3, 'Pan India': 4.8 },
//             Friendliness: { [selectedSociety]: 4.2, [selectedCity]: 4.4, 'Pan India': 4.6 }
//         };

//         const categories = Object.keys(ratingsData);
//         const ctx = chartRef.current.getContext('2d');

//         const generateColors = (numColors) => {
//             const colors = [];
//             for (let i = 0; i < numColors; i++) {
//                 const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
//                 colors.push(color);
//             }
//             return colors;
//         };

//         const colors = generateColors(categories.length);

//         if (!chartInstance.current) {
//             // Create new chart instance
//             chartInstance.current = new Chart(ctx, {
//                 type: 'bar',
//                 data: {
//                     labels: Object.keys(ratingsData.Maintenance),
//                     datasets: categories.map((category, index) => ({
//                         label: `${category} Ratings`,
//                         data: Object.values(ratingsData[category]),
//                         backgroundColor: colors[index],
//                         borderColor: colors[index],
//                         borderWidth: 1
//                     }))
//                 },
//                 options: {
//                     plugins: {
//                         legend: {
//                             display: true,
//                             position: 'top',
//                             labels: {
//                                 boxWidth: 10,
//                                 font: {
//                                     size: 12
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//         } else {
//             // Update chart with new data
//             categories.forEach((category, index) => {
//                 chartInstance.current.data.datasets[index].data = Object.values(ratingsData[category]);
//                 chartInstance.current.update();
//             });
//         }

//         return () => {
//             if (chartInstance.current) {
//                 chartInstance.current.destroy();
//                 chartInstance.current = null;
//             }
//         }; // Cleanup to avoid memory leaks
//     }, [selectedCity, selectedSociety]);

//     return (
//         <div>
//             <div className="chart-container">
//                 <canvas id="column-chart" ref={chartRef}></canvas>
//             </div>
//         </div>
//     );
// }

// export default ChartComponent;





import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ selectedCity, selectedSociety, csvData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const rowData = csvData.find(row => row['City'] === selectedCity && row['Society Name'] === selectedSociety);
        const ratingsData = rowData?.ratings;

        const categories = Object.keys(ratingsData);
        const ctx = chartRef.current.getContext('2d');

        const generateColors = (numColors) => {
            const colors = [];
            for (let i = 0; i < numColors; i++) {
                const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
                colors.push(color);
            }
            return colors;
        };

        const colors = generateColors(categories.length);

        if (!chartInstance.current) {
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: categories, // X axis labels from 1 to 5
                    datasets: [{
                        label: 'This is Rating after Considering your society',
                        data: categories.map(category => ratingsData[category]),
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            suggestedMin: 1, // Y axis scale starts from 1
                            suggestedMax: 5, // Y axis scale ends at 5
                            ticks: {
                                stepSize: 1 // Y axis scale step size
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
                                    size: 12
                                }
                            }
                        }
                    }
                }
            });
        } else {
            categories.forEach((category, index) => {
                chartInstance.current.data.datasets[0].data[index] = ratingsData[category];
                chartInstance.current.update();
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [selectedCity, selectedSociety, csvData]);

    return (
        <div>
            <div className="chart-container">
                <canvas id="column-chart" ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default ChartComponent;
