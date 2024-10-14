import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BOP = () => {
    const [data, setData] = useState(null);

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

    const renderTable = () => {
        if (!data) return null;

        const rows = Object.keys(data).map(date => (
            <tr key={date}>
                <td>{date}</td>
                <td>{data[date].total_distance}</td>
                <td>{data[date].total_work}</td>
            </tr>
        ));

        return (
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Distance</th>
                        <th>Total Work</th>
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