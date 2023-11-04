import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecommendedPlaylist() {
    const [data, setData] = useState('');
    const [ emotion, setEmotion ] = useState('');
    const [ playlist, setPlaylist ] = useState([]);


    const valenceScore = String(0.5);
    // UNCOMMENT OUT LATER 
    // const valenceScore = String(localStorage.getItem('valence_score'));
    // console.log("VALENCE: ", valenceScore)

    useEffect(() => {
        async function fetchData() {
            axios.get(`http://127.0.0.1:5000/api/create-playlist?valence_score=${valenceScore}`)
                .then((res) => {
                    var data = res.data;
                    data = data.replace(/'/g, '"');
                    setPlaylist(JSON.parse(data));
                })
                .catch((error) => {
                    console.error(error);
                });

        }

        fetchData();

    }, []);

    return (
        <div>
            <div>Your Emotion is: {}</div>
            <div>Response from Flask API: </div>

            {playlist.length > 0 ? 
                <div>
                    {playlist.map((item, index) => (
                        <div key={index}>
                            <p>{item.name} -  {item.artist}</p>
                            {/* <p>{item.name}</p> */}
                            {/* <p>{item.artist} </p> */}
                        </div>
                    ))}
                </div>
                : null}
            



        </div>
    );
}