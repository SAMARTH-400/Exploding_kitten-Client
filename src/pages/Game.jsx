import { useState, useEffect } from 'react'
import generateDeck from '../utilities/generateDeck';
import FlippedCard from '../components/FlippedCard';
import Card from '../components/Card';
import Modal from '../components/Modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { setUserName } from '../slices/userSlice';
import { io } from 'socket.io-client';
import {useNavigate} from 'react-router-dom';


function Game() {
    const navigate = useNavigate();
    const newDeck = generateDeck();
    const [deck, setDeck] = useState([...newDeck]);
    const [allowDraw, setAllowDraw] = useState(true);
    const [drawnCards, setDrawnCards] = useState([]);
    const [gameStatus, setGameStatus] = useState('Playing');
    const url = import.meta.env.VITE_SOME_URL;
    const username = useSelector(state => state.user.userName);
    const dispatch =useDispatch();
    const socket = io.connect(url);

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if(!storedName) navigate('/');
        if(storedName) dispatch(setUserName(storedName)); 
        const storedDeck = localStorage.getItem('deck');
        const storedDrawn = localStorage.getItem('drawn');
        localStorage.removeItem('deck');
        localStorage.removeItem('drawn');
        if(storedDeck)  setDeck(JSON.parse(storedDeck));
        if(storedDrawn) setDrawnCards(JSON.parse(storedDrawn));

    }, []);
    
    async function updateScore(){
        try {
            const res = await axios.put(`${url}/score`,{
                username: username
            });
            console.log(res.data);
        } 
        catch (err) {console.log(err)}
    };

    function saveGame(){
        localStorage.setItem('deck', JSON.stringify(deck));
        localStorage.setItem('drawn', JSON.stringify(drawnCards));
        navigate('/');
    }

    const drawCard = () => {
        if(!allowDraw) return;
        setAllowDraw(false);
        const card = deck.pop();
        setDeck([...deck]);
        setDrawnCards([ card, ...drawnCards]);
        if(card==='shuffle')toast("Shuffling...", { autoClose: 1000 });
        if(card==='explode' && drawnCards.includes('defuse')) toast("Defusing..", { autoClose: 1000 });
        const time = card==='explode'? 1500 : 1000;
        setTimeout(() => {
            setAllowDraw(true);
            if(card==='shuffle'){
                // GENERATE NEW DECK
                setDeck([...newDeck]);
                setDrawnCards([]);
                return;
            } else if(card==='explode'){
                const index = drawnCards.indexOf('defuse');
                if (index !== -1) {
                    // USE DIFUSE TO CANCEL THE EXPLOSION 
                    const newArray = [...drawnCards.slice(0, index), ...drawnCards.slice(index + 1)];
                    setDrawnCards(newArray);
                }
                else{
                    // GAME OVER
                    setGameStatus('Lose');
                    return;
                }
            }
            if(deck.length===0){
                //PLAYER WINS
                socket.emit('victory', username);
                setGameStatus('Won');
                updateScore();
                return;
            }
        }, time);
    }

    return (
        <div className="h-screen w-full bg-neutral-800 flex text-center flex-col pt-10 pb-28 overflow-y-scroll scrollbar-hide">
            { (gameStatus==="Won"||gameStatus==="Lose")  && <Modal status={gameStatus}/>}
            <button className='absolute top-4 left-5 font-mono text-xl underline' onClick={()=>navigate('/')} >HOME</button>
            <button className='absolute top-4 left-24 font-mono text-xl underline' onClick={()=>navigate('/leaderboard')} >LEADERBOARD</button>
            <button className='absolute top-4 right-5 border-2 border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer hover:bg-red-600 hover:text-red-200' onClick={saveGame} disabled={!allowDraw}>SAVE & EXIT</button>
            <ToastContainer />
            <h1  className='lg:text-4xl text-xl text-white font-mono'>EXPLODIND KITTENS</h1>
            <div className='flex flex-row lg:justify-center h-full py-32 px-2 overflow-y-scroll scrollbar-hide'>
                {deck.length > 0 && <FlippedCard onButtonClick={drawCard}/>}
                    {
                        drawnCards.map( (card, index) => <Card key={index} cardType={card}/> )
                    }
            </div>
            <h1  className='lg:text-xl text-xl text-white font-mono'>CLICK ON THE DECK TO DRAW A CARD</h1>
        </div>
    )
}

export default Game;





