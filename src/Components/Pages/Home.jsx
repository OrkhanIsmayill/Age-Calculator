import React, { useEffect, useState } from 'react'

import poppins from "@fontsource/poppins";

const Home = () => {

    const [dayValue, setDayValue] = useState('')
    const [monthValue, setMonthValue] = useState('');
    const [yearValue, setYearValue] = useState('')

    const [dayError, setDayError] = useState('')
    const [monthError, setMonthError] = useState(false);

    const [monthCount, setMonthCount] = useState();

    const [dayErrorColor, setdayErrorColor] = useState(false)
    const [monthErrorColor, setMonthErrorColor] = useState()

    const [yearError, setYearError] = useState('')
    const [yearErrorColor, setYearErrorColor] = useState()

    const [yearResult, setYearResult] = useState("--")
    const [monthResult, setMonthResult] = useState("--")
    const [dayResult, setDayResult] = useState("--")



    const d = new Date()
    let year = d.getFullYear()



    const handleChangeDay = (e) => {
        const value = e.target.value;
        setDayValue(value)

    }
    const handleChangeMonth = (e) => {
        const value = e.target.value
        setMonthValue(value)
    }
    const handleChangeYear = (e) => {
        const value = e.target.value;
        setYearValue(value)
    }

    useEffect(() => {
        console.log(monthError);
    }, [monthError]);


    const checkField = () => {



        if (!dayValue) {
            setDayError("This is required")
            setdayErrorColor("red")

        }
        else if (monthCount === "C2" && dayValue > 30) {
            setDayError("Please,input right day")
            setdayErrorColor("red")


        }
        else if (monthCount === "C3" && dayValue > 29) {
            setDayError("Please,input right day")
            setdayErrorColor("red")

        }
        else {
            setdayErrorColor("black")
            setDayError(false)

        }


        if (!monthValue) {
            setMonthError("This is required");
            setMonthErrorColor("red")
            setYearResult("--")
            setMonthResult("--")
            setDayResult("--")

        }
        else if (parseInt(monthValue) > 12 || parseInt(monthValue) < 1) {
            setMonthError("The month number is not between 1-12");
            setMonthErrorColor("red")

        }
        else if (parseInt(monthValue) % 2 == 1 || parseInt(monthValue) === 8) {
            setMonthCount("C1")  // Month from 31 day
            setMonthErrorColor("black")
            setMonthError(false)

        }
        else if (parseInt(monthValue) === 4 || parseInt(monthValue) === 6 || parseInt(monthValue) === 10 || parseInt(monthValue) == 12) {
            setMonthCount("C2") // Month from 30 day
            setMonthErrorColor("black")
            setMonthError(false)

        }
        else if (parseInt(monthValue) === 2) {
            setMonthCount("C3") // February
            setMonthErrorColor("black")
            setMonthError(false)

        }

        if (!yearValue) {
            setYearError("This is required")
            setYearErrorColor('red')
            setYearResult("--")
            setMonthResult("--")
            setDayResult("--")
        }
        else if (parseInt(yearValue) > parseInt(year)) {
            setYearError("The year is in the future")
            setYearErrorColor('red')
        }
        else if (parseInt(yearValue) < 1) {
            setYearError("The year is wrong")
            setYearErrorColor('red')

        }
        else {
            setYearError(false)
            setYearErrorColor("black")

        }


        if (dayError === false || monthError === false || yearError === false) {
            if (monthCount === "C1") {
                var addDay = 31

            }
            else if (monthCount === "C2") {
                var addDay = 30;
            }
            else if (monthCount === "C3") {
                var addDay = 28;
            }
            var today = new Date()
            var userDate = new Date(yearValue, monthValue - 1, dayValue)

            var yearResult = today.getFullYear() - userDate.getFullYear();
            var monthResult = today.getMonth() - userDate.getMonth();
            var dayResult = today.getDate() - userDate.getDate()

            if (monthResult < 0) {
                yearResult--;
                monthResult += 12
            }

            if (dayResult < 0) {
                if (monthResult > 0) {
                    monthResult--
                    dayResult = dayResult + addDay
                }
                else {
                    yearResult--
                    monthResult = 11

                }
            }

            console.log(yearResult);
            console.log(monthResult);
            console.log((dayResult));

        }


        setYearResult(yearResult)
        setMonthResult(monthResult)
        setDayResult(dayResult)




    }


    return (
        <div className='container' style={{ fontFamily: { poppins } }}>
            <div className='calculatorBox'>
                <div className='date'>
                    <form action="">
                        <div className='formDiv'>
                            <label htmlFor="day" style={{ color: dayErrorColor }} >DAY</label>
                            <br />
                            <input type="number" placeholder='DD' min="0" max="31" value={dayValue} onChange={handleChangeDay} style={{ borderColor: dayErrorColor }} />
                            {dayError && <div style={{ color: dayErrorColor }} className='errorMessage'>{dayError} </div>}

                        </div>
                        <div className='formDiv'>
                            <label htmlFor="month" style={{ color: monthErrorColor }}>MONTH</label>
                            <br />
                            <input type="number" placeholder='MM' min={1} max={12} value={monthValue} onChange={handleChangeMonth} style={{ borderColor: monthErrorColor }} />
                            {monthError && <div style={{ color: monthErrorColor }} className='errorMessage'>{monthError}</div>}
                        </div>
                        <div className='formDiv'>
                            <label htmlFor="year" style={{ color: yearErrorColor }}>YEAR</label>
                            <br />
                            <input type="number" placeholder='YYYY' min={1700} value={yearValue} onChange={handleChangeYear} style={{ borderColor: yearErrorColor }} />
                            {yearError && <div style={{ color: yearErrorColor }} className='errorMessage'>{yearError}</div>}
                        </div>

                    </form>

                </div>

                <div className='submit'>
                    <div className='space'></div>

                    <div className='goDiv'>
                        <button onClick={checkField}>GO</button>

                    </div>

                </div>

                <div className='resultField'>

                    <div className='years'>
                       { !(yearError || monthError || dayError) ? <p>{yearResult}</p>:null}
                        <h1>years</h1>

                    </div>

                    <div className='month'>
                    { !(yearError || monthError || dayError) ? <p>{monthResult}</p>:null}
                        <h1>months</h1>

                    </div>

                    <div className='days'>
                    { !(yearError || monthError || dayError) ? <p>{dayResult}</p>:null}
                        <h1>days</h1>

                    </div>


                </div>

            </div>




        </div>
    )
}

export default Home