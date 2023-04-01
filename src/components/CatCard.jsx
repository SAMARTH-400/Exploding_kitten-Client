import React from 'react'
import  background from "../assets/cat.png";

function CatCard() {
    return (         
        <div className='shrink-0 h-[400px] w-72  rounded-[2rem] scale-90'>
            <div style={{ backgroundImage: `url(${background})` }}className="h-full w-full bg-cover bg-bottom rounded-xl" />
        </div>
    )
}

export default CatCard