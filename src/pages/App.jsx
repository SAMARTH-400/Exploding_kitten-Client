import {useNavigate} from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { useState , useEffect } from 'react'
import { setUserName } from '../slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import { io } from 'socket.io-client';
import axios from 'axios';


function App() {
    useEffect(() => { 
        const storedName = localStorage.getItem('name');
        if(storedName) dispatch(setUserName(storedName));
    }, []);
    const url = import.meta.env.VITE_SOME_URL;
    const socket = io.connect(url);
    const name = useSelector(state => state.user.userName)
    const [input, setInput] = useState(name);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    function handleClick() { 
        if(name===""){
            localStorage.setItem('name', input);
            socket.emit('addNewPlayer', input);
            try {
                axios.post(`${url}`,{username: input})
            } catch (err){console.log(err)}
        }
        dispatch(setUserName(input));
        if (localStorage.hasOwnProperty('deck')) localStorage.removeItem('deck');
        if (localStorage.hasOwnProperty('drawn')) localStorage.removeItem('drawn');
        navigate('/game');
    };
    function handleContinue(){
        if(localStorage.hasOwnProperty('deck')) navigate('/game');
        else toast("No saved game found...", { autoClose: 500 });
    }
    return (
        <body>
            <ToastContainer />
            <div className="h-screen w-full bg-[url('https://pbs.twimg.com/media/EVgB5iVU0AAvSc_?format=jpg&name=large')] bg-cover bg-bottom flex flex-col justify-center items-center text-center">
                <div className='flex flex-col h-1/2 justify-start items-center font-mono'>
                    <h1 className='text-6xl text-white'>EXPLODIND KITTENS</h1>
                    {name===""  ? <div className='flex flex-col'>
                        <label className='mt-10  mb-1'>Player Name</label>
                        <input placeholder='Enter a Name to begin' className='py-3 px-6 text-center bg-transparent border border-white rounded-lg placeholder:text-slate-300 ' value={input} onChange={(e)=>setInput(e.target.value)}></input>
                    </div> : <label className='mt-10  mb-1'>hii, {name} </label>}
                    <button className=' text-3xl hover:bg-black/20 py-4 px-10 rounded-lg mt-16' onClick={handleContinue}> CONTINUE</button>
                    <button onClick={ () => handleClick() } disabled={name==="" && input===""} className='mt-6 text-3xl hover:bg-black/20 py-4 px-10 rounded-lg '> NEW GAME</button>
                    <button onClick={ () => navigate('/leaderboard') } className='mt-6 text-3xl hover:bg-black/20 py-4 px-10 rounded-lg '> LEADERBOARD </button>
                </div>
            </div>
        </body>
    )
}

export default App;
