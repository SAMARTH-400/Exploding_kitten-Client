import React from 'react'
import  background from "../assets/shuffle.png";

function ShuffleCard() {
    return (
        <div className='shrink-0 h-[400px] w-72 rounded-lg bg-white p-2 scale-90'>
            <div style={{ backgroundImage: `url(${background})` }} className="h-full w-full bg-cover bg-center  rounded-xl" />
        </div>
    )
}

export default ShuffleCard;