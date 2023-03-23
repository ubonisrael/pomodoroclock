import React from 'react'
import Format from '../lib/timeformat'
import { MdOutlineAdd } from 'react-icons/md'
import { RiSubtractFill } from 'react-icons/ri'

const Session = ({period, inc, dec}) => {
  return (
    <div className='session-timer'>
      <h3>Session Time</h3>
        <h2>{Format(period)}</h2>
        <div className="incremental-btns">
            <button onClick={() => inc('session')}>{<MdOutlineAdd />}</button>
            <button onClick={() => dec('session')}>{<RiSubtractFill />}</button>
        </div>
    </div>
  )
}

export default Session