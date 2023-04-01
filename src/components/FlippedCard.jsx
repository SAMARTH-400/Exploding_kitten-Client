import React, { useState } from 'react'


function FlippedCard({onButtonClick}){
    return(
        <div className="shrink-0 h-[400px] w-72 rounded-2xl scale-90 ring-2 ring-gray-500" onClick={onButtonClick}>
            <div className="h-full w-full bg-[url('https://images.igdb.com/igdb/image/upload/t_cover_big/co3w3l.png')] bg-cover bg-center rounded-2xl" />
        </div>
    );
};
export default FlippedCard;






