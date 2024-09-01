import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js'; // Import PointElement
import { fetchbills } from '../redux/billSlice';
import { fetchBuildings } from '../redux/buildingSlice';
import TopBarComponet from './TopBarComponet';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FootBarComponent from './FootBarComponent';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement); // Register PointElement

function Dashboard() {
    const dispatch = useDispatch();
    const { billData } = useSelector((state) => state.bills);
    const { buildingData } = useSelector((state) => state.buildings);
    const [value, onChange] = useState(new Date());
    

    useEffect(() => {
        dispatch(fetchbills());
        dispatch(fetchBuildings());

        return () => {
            // Ensure that all chart instances are cleaned up
            const canvases = document.querySelectorAll('canvas');
            canvases.forEach(canvas => {
                const chart = ChartJS.getChart(canvas);
                if (chart) {
                    chart.destroy();
                }
            });
        };
    }, [dispatch]);

    // Process data for Pie Chart
    const pieData = {
        labels: buildingData.map(building => building.name),
        datasets: [{
            label: 'Total Units Consumed',
            data: buildingData.map(building => {
                return billData
                    .filter(bill => bill.meter === building.id)
                    .reduce((sum, bill) => sum + bill.units_consumed, 0);
            }),
            backgroundColor: ["navy", "#c43a31", "cyan", "gold"],
        }]
    };

    // Process data for Bar Chart
    const barData = {
        labels: buildingData.map(building => building.name),
        datasets: [{
            label: 'Charges',
            data: buildingData.map(building => {
                const totalCharges = billData
                    .filter(bill => bill.meter === building.id)
                    .reduce((sum, bill) => sum + bill.bill_amount, 0);
                return totalCharges;
            }),
            backgroundColor: ["#c43a31", "navy", "cyan", "gold"],
        }]
    };

    // Aggregate bill amounts by month for all buildings
    const aggregatedLineData = billData.reduce((acc, bill) => {
        const month = new Date(bill.month).toLocaleString('default', { month: 'short' });
        if (!acc[month]) {
            acc[month] = 0;
        }
        acc[month] += bill.bill_amount;
        return acc;
    }, {});

    // Convert aggregated data to an array format for Line Chart
    const lineData = {
        labels: Object.keys(aggregatedLineData),
        datasets: [{
            label: 'Total Charges',
            data: Object.values(aggregatedLineData),
            borderColor: "#c43a31",
            backgroundColor: "rgba(195, 58, 49, 0.2)",
            fill: true,
        }]
    };

    return (
        <>
            <TopBarComponet />

            <section className="content bg-secondary" style={{ margin: '1px'}}>
                <div className="container-fluid bg-light-subtle text-light" style={{ paddingLeft: "15%"}}>
                <br/>
                    <div className="row" >
                        <div className="col-md-5">
                            <h3 style={{ textAlign: 'center', marginBottom: '20px'}} className='text-dark fw-bold'>Building Charges Overview - Bar Chart</h3>
                            <div className="chart-container"> {/* Container with fixed height */}
                                <Bar
                                    data={barData}
                                    options={{
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Building Charges Overview',
                                                padding: { top: 5, bottom: 5 }
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (tooltipItem) {
                                                        return `Charges: Rs.${tooltipItem.raw}`;
                                                    }
                                                }
                                            }
                                        },
                                        responsive: true,
                                        maintainAspectRatio: true,
                                        scales: {
                                            x: {
                                                title: {
                                                    display: true,
                                                    text: 'Buildings'
                                                }
                                            },
                                            y: {
                                                title: {
                                                    display: true,
                                                    text: 'Charges'
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <h3 style={{ textAlign: 'right', marginBottom: '20px' }} className='text-dark fw-bold '>Building Charges Overview - Pie Chart</h3>
                            <Pie
                                data={pieData}
                                options={{
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: function (tooltipItem) {
                                                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                                                }
                                            }
                                        }
                                    },
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-5">
                            <h3 style={{ textAlign: 'center', marginBottom: '20px' }} className='text-dark fw-bold'>Total Charges by Month - Line Chart</h3>
                            <Line
                                data={lineData}
                                options={{
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Total Charges by Month',
                                            padding: { top: 20, bottom: 20 }
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: function (tooltipItem) {
                                                    return `Total: $${tooltipItem.raw}`;
                                                }
                                            }
                                        }
                                    },
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    scales: {
                                        x: {
                                            title: {
                                                display: true,
                                                text: 'Months'
                                            }
                                        },
                                        y: {
                                            title: {
                                                display: true,
                                                text: 'Total Charges'
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                        <br /><br />
                        <div className='col-md-3'>
                            <h3 style={{ textAlign: 'center' }} className='text-dark fw-bold'>Calendar</h3>
                            <Calendar onChange={onChange} value={value} />
                        </div>
                    </div>
                </div>
            </section>
            <FootBarComponent/>
        </>
    );
}

export default Dashboard;
