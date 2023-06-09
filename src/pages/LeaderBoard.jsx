import { useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';

function LeaderBoard(){
    const url = import.meta.env.VITE_SOME_URL;
    const socket = io.connect(url);
    const navigate = useNavigate();
    const [scores, setScores] = useState([]);
    useEffect(() => {
        async function getLeaderBoard(){
            try {
                const res = await axios.get(`${url}/score`);
                const raw = res.data;
                const result = [];
                for (let i = 0; i < raw.length; i += 2) {
                    result.push({ name: raw[i], score: parseInt(raw[i + 1]) });
                }
                setScores(result);
            } 
            catch (err) {
                console.log(err);
            }
        }
        getLeaderBoard();
    }, []);
    useEffect(()=>{
        socket.on("newScore", (name) => {
            const idx = scores.findIndex((item) => item.name === name);
            if(idx===-1){
                scores.push({name: name, score:0});
                setScores(scores);
            }
        });
        socket.on("incrementScore", (name) => {
            const index = scores.findIndex((item) => item.name === name);
            if (index !== -1) {
                const newScores = [...scores];
                newScores[index].score += 1;
                newScores.sort((a, b) => b.score - a.score);
                setScores(newScores);
            }
        });
    },[socket]);

    return (
        <div>
            <button className='absolute top-4 left-5 font-mono text-xl underline' onClick={()=>navigate('/')} >HOME</button>
            <div className="flex h-screen w-full bg-[url('https://pbs.twimg.com/media/EVgB5jbUMAAE-Bv?format=jpg&name=large')] bg-cover bg-right justify-center items-center p-5 lg:py-32 lg:px-32 lg:justify-start lg:items-start">
                
                <div className='h-[550px] w-full md:w-4/5 lg:w-2/6 rounded-t-xl rounded-b-xl'>
                    
                    <div className='flex h-[15%] rounded-t-lg bg-[#3B3B3B] items-center justify-center space-x-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                        </svg>
                        <h1 className='font-mono text-2xl tracking-wide'> LEADERBOARD </h1>
                    </div>

                    <div className='flex flex-col h-[85%] gradient rounded-b-xl'>
                        <div className='flex w-full py-4 text-xl font-mono pr-10 pl-14 border-b text-amber-600  justify-between'>         
                            <div>RANK</div> 
                            <div>PLAYER</div> 
                            <div>SCORE</div> 
                        </div>
                        <div  className=' overflow-y-scroll scrollbar-hide'>
                        {
                            scores.map( (player, idx) => {
                                return(
                                    <div key={idx} className='flex w-full py-4 text-xl font-mono px-14 border-b text-white hover:bg-orange-900/20 '>         
                                        <div className='bg-white rounded-full h-8 w-8 text-orange-500 text-bold text-center'>{idx+1}</div> 
                                        <div className='flex-grow text-center'>{player.name}</div> 
                                        <div className='text-end'>{player.score}</div> 
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default LeaderBoard;
