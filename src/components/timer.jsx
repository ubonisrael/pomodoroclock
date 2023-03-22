import React from 'react'
import Format from '../lib/timeformat'
import { AiOutlinePause, AiOutlinePlayCircle, AiOutlineReload } from 'react-icons/ai'

const Timer = ({period, periodType, play, pause, reset}) => {
  return (
    <div className='countdown-timer'>
        <h3>{periodType}</h3>
        <h2 className={period < 60 ? 'red' : 'green'}>{Format(period)}</h2>
        <div>
            <button onClick={play}>{<AiOutlinePlayCircle />}</button>
            <button onClick={pause}>{<AiOutlinePause />}</button>
            <button onClick={reset}>{<AiOutlineReload />}</button>
        </div>
    </div>
  )
}

export default Timer