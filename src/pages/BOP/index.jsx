import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BOP = () => {
    const [data, setData] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/workouts', {
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

    const renderTable = () => {
        if (!data) return null;

        const sorted = sortedData();

        const rows = Object.keys(sorted).map(date => (
            <tr key={date}>
                <td>{date}</td>
                <td>{sorted[date].total_distance}</td>
                <td>{sorted[date].total_work}</td>
            </tr>
        ));

        const getSortIcon = (key) => {
            if (sortConfig.key !== key) return null;
            return sortConfig.direction === 'ascending' ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
        };

        return (
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('date')}>
                            Date <i className={getSortIcon('date')}></i>
                        </th>
                        <th onClick={() => handleSort('total_distance')}>
                            Total Distance (km)<i className={getSortIcon('total_distance')}></i>
                        </th>
                        <th onClick={() => handleSort('total_work')}>
                            Total Work (joules)<i className={getSortIcon('total_work')}></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    };

    return (
        <div className="bop-container">
            <div className="bop-table">
                {data ? renderTable() : <div className="spinner"><i className="fas fa-spinner fa-spin"></i></div>}
            </div>
            <div className="bop-content">
                {/* Blank space for now */}
            </div>
        </div>
    );
};

export default BOP;