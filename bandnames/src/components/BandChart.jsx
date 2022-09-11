 
import Chart from 'chart.js/auto';
import { useContext, useEffect, useRef } from 'react'  
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {

    const myChart = useRef();
    const SOCKET = useContext(SocketContext);
    const { socket } = SOCKET;
    useEffect( () => {
        socket.on('current-bands', (bands) => {
            graphics( bands );
        })
    }, [socket]);

    
    const graphics = ( bands = []) => {
        const ctx = document.getElementById('myChart');
        if (typeof myChart.current !== 'undefined') myChart.current.destroy();
        myChart.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map( band => band.name ),
                datasets: [{
                    label: '# of Votes',
                    data: bands.map( band => band.votes ),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    return (
        <canvas 
            id="myChart"
        ></canvas>
    )
}