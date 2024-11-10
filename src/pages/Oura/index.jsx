import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Hint, HorizontalGridLines, LabelSeries, LineMarkSeries, LineSeries, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';
import './style.css';

const Oura = () => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    const [ouraWorkoutData, setOuraWorkoutData] = useState(null);
    const [ouraSleepData, setOuraSleepData] = useState(null);
    const [ouraActivityData, setOuraActivityData] = useState(null);

    const [sleepHintValue, setSleepHintValue] = useState(null);
    const [activityHintValue, setActivityHintValue] = useState(null);


    const currentEnv = import.meta.env.VITE_CURRENT_ENV;
    const apiUrl = currentEnv === 'LOCAL' ? 'http://127.0.0.1:5000/api/activity' : 'https://api.sisooyin.com/api/activity';
    const ouraWorkoutApiUrl = currentEnv === 'LOCAL' ? 'http://127.0.0.1:5000/api/oura_workouts' : 'https://api.sisooyin.com/api/oura_workouts';
    const ouraSleepApiUrl = currentEnv === 'LOCAL' ? 'http://127.0.0.1:5000/api/sleep' : 'https://api.sisooyin.com/api/sleep';
    const ouraActivityUrl = currentEnv === 'LOCAL' ? 'http://127.0.0.1:5000/api/activity' : 'https://api.sisooyin.com/api/activity';

    useEffect(() => {
        const { firstDay, lastDay } = getCurrentMonthDates();

        const fetchData = async () => {
            try {
                const [activityResponse, sleepResponse, workoutResponse] = await Promise.all([
                    fetch(`${ouraActivityUrl}?start_date=${firstDay.toISOString().split('T')[0]}&end_date=${lastDay.toISOString().split('T')[0]}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    }),
                    fetch(`${ouraSleepApiUrl}?start_date=${firstDay.toISOString().split('T')[0]}&end_date=${lastDay.toISOString().split('T')[0]}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    }),
                    fetch(`${ouraWorkoutApiUrl}?start_date=${firstDay.toISOString().split('T')[0]}&end_date=${lastDay.toISOString().split('T')[0]}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    })
                ]);

                if (!activityResponse.ok || !sleepResponse.ok || !workoutResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const [activityData, sleepData, workoutData] = await Promise.all([
                    activityResponse.json(),
                    sleepResponse.json(),
                    workoutResponse.json()
                ]);

                setOuraActivityData(formatData(activityData, 'activity'));
                setOuraSleepData(formatData(sleepData, 'sleep'));
                setOuraWorkoutData(formatData(workoutData, 'workout'));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);


    const getCurrentMonthDates = () => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { firstDay, lastDay };
    };
    const getMonthName = (monthIndex) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[monthIndex];
    };
    const formatData = (data, type) => {
        const camelCaseToHumanReadable = (str) => {
            return str
                .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
                .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter
        };

        if (type === 'workout') {
            return Object.keys(data).map(workout => ({
                x: camelCaseToHumanReadable(workout),
                y: data[workout].length
            }));
        } else if (type === 'sleep') {
            return data.map(obj => ({
                x: obj.date,
                y: obj.score
            }));
        } else if (type === 'activity') {
            return data.map(activity => ({
                x: activity.date,
                y: activity.steps
            }));
        }
    };

    const currentMonthName = getMonthName(new Date().getMonth());
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const labelColor = isDarkMode ? 'white' : 'black';

    return (
        <div className="oura-container">
            <div className="info-section">
                <h2>Oura Usage for {currentMonthName}</h2>
                <p>Possibly too personal, but info on my oura ring usage</p>
            </div>

            <div>
                {!(ouraWorkoutData && ouraActivityData && ouraSleepData) && (
                    <div className="loading">
                        <h2>Loading...</h2>
                        <i className="fa fa-spinner fa-spin" style={{ fontSize: '64px' }}></i>
                    </div>
                )}
                {ouraWorkoutData && (
                    <>
                        <h2>Workout Data</h2>
                        <XYPlot xType="ordinal" width={0.65 * window.innerWidth} height={300}>
                            <VerticalBarSeries data={ouraWorkoutData} barWidth={1} />
                            <XAxis />
                            <YAxis />
                            <LabelSeries data={ouraWorkoutData.map(obj => ({ ...obj, label: obj.y }))} style={{ color: labelColor }} />
                        </XYPlot>
                    </>
                )}
                <hr />
                {ouraActivityData && (
                    <>
                        <h2># of Steps Data</h2>
                        <XYPlot xType="ordinal" width={0.5 * window.innerWidth} height={300} color={'green'}>
                            <HorizontalGridLines />
                            <VerticalGridLines />
                            <YAxis />
                            <VerticalBarSeries data={ouraActivityData} barWidth={1} />
                            <LabelSeries data={ouraActivityData.map(obj => ({ ...obj, label: obj.y }))} style={{ fill: labelColor }} />
                        </XYPlot>
                    </>
                )}
                <hr />
                {ouraSleepData && (
                    <>
                        <h2>Sleep Score Data</h2>
                        <XYPlot xType="ordinal" width={0.5 * window.innerWidth} height={300}>
                            <VerticalBarSeries data={ouraSleepData} barWidth={1} />
                            <YAxis />
                            <LabelSeries data={ouraSleepData.map(obj => ({ ...obj, label: obj.y }))} style={{ fill: labelColor }} />
                        </XYPlot>
                    </>
                )}
            </div>
        </div>
    );
};

export default Oura;