import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from "react"
import { Inter } from 'next/font/google'
import style from '@/styles/style.module.css'
import CalcButton from '../components/button'


const inter = Inter({ subsets: ['latin'] })

const Values = [
  { value: "7", operation: "number" },
  { value: "8", operation: "number" },
  { value: "9", operation: "number" },
  { value: "D", operation: "delete" },
  { value: "4", operation: "number" },
  { value: "5", operation: "number" },
  { value: "6", operation: "number" },
  { value: "+", operation: "operation" },
  { value: "1", operation: "number" },
  { value: "2", operation: "number" },
  { value: "3", operation: "number" },
  { value: "-", operation: "operation" },
  { value: ".", operation: "number" },
  { value: "0", operation: "number" },
  { value: "/", operation: "operation" },
  { value: "x", operation: "operation" },
]

export default function Home() {
  const [calculation, setCalculation] = useState({
    num01: "",

    num02: "",

    operation: "",
  })


  const [input, setInput] = useState({
    current: "",

    prev: "",

  })





  const [result, setResult] = useState(null)


  function AC() {
    setCalculation({
      num01: "",
      num02: "",
      operation: "",
    })

    setInput({
      current: "",
      prev: "",
    })

    setResult(null)
  }

  async function compute() {
    switch (calculation.operation) {
      case "+":
        let result =
          parseFloat(calculation.num01) + parseFloat(calculation.num02)
        setResult(result)
        setCalculation({ num01: result.toString(), num02: "", operation: "" })
        break

      case "-":
        let result02 =
          parseFloat(calculation.num01) - parseFloat(calculation.num02)
        setResult(result02)
        setCalculation({ num01: result02.toString(), num02: "", operation: "" })
        break

      case "/":
        let result03 =
          parseFloat(calculation.num01) / parseFloat(calculation.num02)
        setResult(result03)
        setCalculation({ num01: result03.toString(), num02: "", operation: "" })
        break

      case "x":
        let result04 =
          parseFloat(calculation.num01) * parseFloat(calculation.num02)
        setResult(result04)
        setCalculation({ num01: result04.toString(), num02: "", operation: "" })
        break
    }
  }

  function append(buttonContent, buttonType) {
    if (
      buttonType === "number" &&
      calculation.operation === "" &&
      buttonContent !== "."
    ) {
      setCalculation((prev) => ({ ...prev, num01: prev.num01 + buttonContent }))
      //setInput((prev) => ({ ...prev, current: input.current + buttonContent }))
    } else if (
      buttonType === "number" &&
      calculation.operation === "" &&
      !calculation.num01.includes(".")
    ) {
      setCalculation((prev) => ({ ...prev, num01: prev.num01 + buttonContent }))
      //setInput((prev) => ({...prev, current: input.current + buttonContent}))
    } else if (
      buttonType === "operation" &&
      calculation.num01 !== "" &&
      calculation.num02 === ""
    ) {
      setCalculation((prev) => ({ ...prev, operation: buttonContent }))
    } else if (
      buttonType === "number" &&
      calculation.num01 !== "" &&
      calculation.operation !== ""
    ) {
      setCalculation((prev) => ({ ...prev, num02: prev.num02 + buttonContent }))
    }
  }

  function handleClick(e) {
    const buttonType = e.target.id
    const buttonContent = e.target.textContent


    if (buttonType === "number" || buttonType === "operation") {
      append(buttonContent, buttonType)
    }
    if (buttonType === "style_execute__wGRpP") {
      compute()
    }
    if (buttonType === "AC") {
      AC()
    }
  }

  //updates current view
  useEffect(() => {

    setInput((prev) => ({
      ...prev,
      current: `${calculation.num01} ${calculation.operation} ${calculation.num02}`,
    }))
    return
  }, [calculation, result])
  return (

    <>
      <section>
        <div className={style.container}>
          <div id={style.display}>{`${!result ? 0 : result}`}</div>
          <div className={style.buttons}>
            {Values.map((item) => (
              <div key={item.value}>
                <CalcButton
                  value={item.value}
                  type={item.operation}
                  handleClick={handleClick}
                />
              </div>

            ))}

            <div id={style.execute} className={style.button} onClick={(e) => handleClick(e)}>=</div>

          </div>
        </div>
      </section >
    </>
  )
}
