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
  { value: "Delete", operation: "delete" },

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
  { value: "AC", operation: "ac" },

  { value: "(", operation: "open-parenthesis" },
  { value: ")", operation: "closing-parenthesis" },
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

  const [currentValue, setCurrentValue] = useState(0);
  const [showResult, setShowResult] = useState(false);


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
    setCurrentValue(0);
  }

  async function compute() {
    switch (calculation.operation) {
      case "+":
        let result =
          parseFloat(calculation.num01) + parseFloat(calculation.num02)
        setResult(result)
        setCurrentValue(result);


        setCalculation({ num01: result.toString(), num02: "", operation: "" })
        break

      case "-":
        let result02 =
          parseFloat(calculation.num01) - parseFloat(calculation.num02)
        setResult(result02)
        setCurrentValue(result02);


        setCalculation({ num01: result02.toString(), num02: "", operation: "" })
        break

      case "/":
        let result03 =
          parseFloat(calculation.num01) / parseFloat(calculation.num02)
        setResult(result03)
        setCurrentValue(result03);


        setCalculation({ num01: result03.toString(), num02: "", operation: "" })
        break

      case "x":
        let result04 =
          parseFloat(calculation.num01) * parseFloat(calculation.num02)
        setResult(result04)
        setCurrentValue(result04);

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
  function deleteElement() {
    if (currentValue.toString().length == 1) {
      setCurrentValue(0)
      return;
    }
    if (currentValue.toString().length > 1) {
      let tempValue = currentValue.toString().split("");
      tempValue.pop();

      tempValue.join("");

      setCurrentValue(tempValue.join(""))
    }
  }

  function handleClick(e) {
    const buttonType = e.target.id
    const buttonContent = e.target.textContent


    if (buttonType === "number" || buttonType === "operation") {
      let tempValue = currentValue.toString().split();
      if (tempValue.length == 1 && tempValue[0] == 0) {
        tempValue.pop()
      }
      tempValue.push(buttonContent);
      tempValue = tempValue.join("")
      setCurrentValue(tempValue);
      data = tempValue

      append(buttonContent, buttonType)

    }
    if (buttonType === "style_execute__wGRpP") {
      compute()
    }
    if (buttonType === "ac") {
      AC()
    }
    if (buttonType === "delete") {
      deleteElement(buttonContent, buttonType);
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
          <div id={style.display}>{`${currentValue}`}</div>
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
