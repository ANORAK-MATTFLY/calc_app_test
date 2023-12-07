import React from 'react'
import style from '@/styles/style.module.css'

const CalcButton = ({ value, handleClick, type }) => {

    return (
        <div
            sx={{ backgroundColor: "black" }}
            className={style.button}

            onClick={(e) => handleClick(e)}
            id={type}
        >
            <>
                {value}
            </>
        </div>
    )

}

export default CalcButton
