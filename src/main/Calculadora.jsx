import React,{Component } from 'react'
import './calculadora.css'
import Buttons from '../components/Buttons'
import Display from '../components/Display'

const initialState = {
    displayValue : "0",
    clearDisplay : false,
    operation : null,
    values : [0,0],
    current:0
}

export default class Calculadora extends Component{
    state =  { ...initialState}

    clear(){
        this.setState({...initialState})
    }

    setOperation(operation){
        let current = 1
        let displayValue = "0"
        if (operation != "=" ) { 
      
            this.setState({operation,current,displayValue})
            console.log(this.state)
        }else{
            let result = 0
            this.setState({displayValue: 0})

            if(this.state.operation == "+"){
                result = this.state.values[0] + this.state.values[1]
            }else if(this.state.operation == "-"){
                result = this.state.values[0] - this.state.values[1]
            }else if(this.state.operation == "*"){
                result = this.state.values[0] * this.state.values[1]
            }else{
                result = this.state.values[0] / this.state.values[1]
            }
            const values = this.state.values;
            values[0] = result
            const displayValue  = result

            this.setState({current,displayValue,values})
            
        }

    }

    addDigito(n){
        if(n === "." && this.state.values.includes("."))
        {
            return 
        }
        const clearDisplay = this.state.displayValue === "0"
        || this.state.clearDisplay

        const currentValue = clearDisplay ? '':this.state.displayValue 
         const displayValue = currentValue + n
         this.setState({displayValue,clearDisplay:false})

         if(n != "."){
             const i = this.state.current
             const newValue = parseFloat(displayValue)
             const values = [...this.state.values]
             values[i] = newValue
             this.setState({values})
             console.log(this.state.values)
         }
    }

    render(){
        const addDigito = n =>this.addDigito(n)
        const setOperation = op => this.setOperation(op)
        // const clear = () => this.clear()
        return(
            <div className="calculadora">
                <Display value={this.state.displayValue} />
                <Buttons label="AC" click={() =>this.clear()} triple/>
                <Buttons label="/" click={setOperation} operation/>
                <Buttons label="7" click={addDigito}/>
                <Buttons label="8" click={addDigito}/>
                <Buttons label="9" click={addDigito}/>
                <Buttons label="*" click={setOperation} operation/>    
                <Buttons label="4" click={addDigito}/>
                <Buttons label="5" click={addDigito}/   >
                <Buttons label="6" click={addDigito}/>
                <Buttons label="-" click={setOperation} operation/>
                <Buttons label="1" click={addDigito}/>
                <Buttons label="2" click={addDigito}/>
                <Buttons label="3" click={addDigito}/>
                <Buttons label="+" click={setOperation} operation/>
                <Buttons label="0" click={addDigito} duble/>
                <Buttons label="." click={addDigito}/>
                <Buttons label="=" click={setOperation} operation/>

            </div>
        )
    }
}