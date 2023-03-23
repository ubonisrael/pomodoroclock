import React from "react";
import Format from "../lib/timeformat";
import { MdOutlineAdd } from 'react-icons/md'
import { RiSubtractFill } from 'react-icons/ri'

const Break = ({ period, inc, dec }) => {
  return (
    <div className="break-timer">
      <h3>Break Time</h3>
      <h2>{Format(period)}</h2>
      <div className="incremental-btns">
        <button onClick={() => inc("break")}>{<MdOutlineAdd />}</button>
        <button onClick={() => dec("break")}>{<RiSubtractFill />}</button>
      </div>
    </div>
  );
};

export default Break;
