import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BOP = () => {
    const [data, setData] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const currentEnv = import.meta.env.VITE_CURRENT_ENV;
    const apiUrl = currentEnv === 'LOCAL' ? 'http://127.0.0.1:5000/api/workouts' : 'https://api.sisooyin.com/api/workouts';

    useEffect(() => {
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = () => {
        if (!data || !sortConfig.key) return data;

        const sorted = Object.keys(data).sort((a, b) => {
            if (sortConfig.key === 'date') {
                return sortConfig.direction === 'ascending'
                    ? new Date(a) - new Date(b)
                    : new Date(b) - new Date(a);
            } else {
                return sortConfig.direction === 'ascending'
                    ? data[a][sortConfig.key] - data[b][sortConfig.key]
                    : data[b][sortConfig.key] - data[a][sortConfig.key];
            }
        });

        return sorted.reduce((acc, key) => {
            acc[key] = data[key];
            return acc;
        }, {});
    };

    const renderCards = () => {
        if (!data) return null;

        const sorted = sortedData();

        return Object.keys(sorted).map(date => (
            <div className="card" key={date}>
                <div className="card-header">
                    <h3>Week: {date}</h3>
                </div>
                <div className="card-body">
                    <p>Total Distance: {sorted[date].total_distance} km</p>
                    <p>Total Work: {Math.round(sorted[date].total_work / 1000)} joules</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="bop-container">
            <div className="info-section">
                <h2>Workout Summary</h2>
                <p>Tracking of my workout/bike rides</p>
            </div>
            <div className="sort-buttons">
                <button onClick={() => handleSort('date')}>
                    Date <i className={sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? 'fas fa-arrow-up' : 'fas fa-arrow-down') : ''}></i>
                </button>
                <button onClick={() => handleSort('total_distance')}>
                    Total Distance (km) <i className={sortConfig.key === 'total_distance' ? (sortConfig.direction === 'ascending' ? 'fas fa-arrow-up' : 'fas fa-arrow-down') : ''}></i>
                </button>
                <button onClick={() => handleSort('total_work')}>
                    Total Work (joules) <i className={sortConfig.key === 'total_work' ? (sortConfig.direction === 'ascending' ? 'fas fa-arrow-up' : 'fas fa-arrow-down') : ''}></i>
                </button>
            </div>
            <div className="bop-cards">
                {data ? renderCards() : <div className="spinner"><i className="fas fa-spinner fa-spin"></i></div>}
            </div>
        </div>
    );
};

export default BOP;