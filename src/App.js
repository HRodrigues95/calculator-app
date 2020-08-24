import React, { memo } from 'react';
import './App.css';
class CalcBtn extends React.Component {
  render() {
    let styl = "button";
    switch (this.props.text) {
      case '=':
      case '-':
      case '+':
      case 'x':
      case '÷': {
        styl += " orange"
        break;
      }
      case '0': {
        styl += " wide"
        break;
      }
      default:break;
    }
    return (
      <div className={styl}>
        <button onClick={this.props.onClick}>
          {this.props.text}
        </button>
      </div>
    );
  }
}

class BtnPanel extends React.Component {

  renderBtn(txt) {
    return (
      <CalcBtn text={txt} onClick={() => this.props.onClick(txt)}></CalcBtn>
    );
  }

  renderRow(i) {
    return (
      <div>
        {this.renderBtns(i)}
      </div>
    );
  }

  renderBtns(i) {
    const btns = [];
    switch (i) {
      case 0:
        btns.push(this.renderBtn("AC"))
        btns.push(this.renderBtn("+/-"))
        btns.push(this.renderBtn("%"))
        btns.push(this.renderBtn("÷"))
        break;
      case 1:
        btns.push(this.renderBtn("7"))
        btns.push(this.renderBtn("8"))
        btns.push(this.renderBtn("9"))
        btns.push(this.renderBtn("x"))
        break;
      case 2:
        btns.push(this.renderBtn("4"))
        btns.push(this.renderBtn("5"))
        btns.push(this.renderBtn("6"))
        btns.push(this.renderBtn("-"))
        break;
      case 3:
        btns.push(this.renderBtn("1"))
        btns.push(this.renderBtn("2"))
        btns.push(this.renderBtn("3"))
        btns.push(this.renderBtn("+"))
        break;
      case 4:
        btns.push(this.renderBtn("0"))
        btns.push(this.renderBtn("."))
        btns.push(this.renderBtn("="))
        break;
      default: break;
    }
    return btns;
  }

  render() {
    return (
      <div className="button-panel">
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return (
      <div className="display">
        <div>{this.props.value}</div>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 0,
      memory: 0,
      lastinput: null,
      operation: null,
    }
  }

  isSimpleOperation(txt) {
    return txt === 'AC' || txt === '+/-' || txt === '%';
  }

  isComplexOperation(txt) {
    return txt === '*' || txt === '+' || txt === '-' || txt === '÷';
  }

  isNumber(txt) {
    return txt === '1' || txt === '2' || txt === '3' || txt === '4' || txt === '5' ||
           txt === '6' || txt === '7' || txt === '8' || txt === '9' || txt === '0';
  }

  handleBtnClick(txt) {
    
    let memory = this.state.memory;
    let display = this.state.display;
    let operat = this.state.operation;

    if (this.isNumber(this.state.lastinput) && this.isNumber(txt))
      display = display.toString() + txt;
    
    
    if (this.isComplexOperation(this.state.lastinput) && this.isNumber(txt)) {
      memory = display;
      display = txt;
      console.log("Valor em memória novo: " + memory + " display: " + display);
    }

    if (txt === '.' && !display.toString().includes('.'))
      display = display.toString() + '.';

    if (this.isSimpleOperation(txt)) {
      switch (txt) {
        case 'AC':
          display = 0;
          if (this.state.lastinput === 'AC'){
            memory = 0;
          }
          break;
        case '+/-':
          display = -display;
          break;
        case '%':
          display = display / 100;
          break;
        default: break;
      }
    }

    if (this.isComplexOperation(txt)) {
      if (!this.isComplexOperation(this.state.lastinput)) {
        if (operat !== null) {
          switch (operat) {
            case '+':
              display = memory + display;
              break;
            case '-':
              display = memory - display;
              break;
            case '*':
              display = memory * display;
              break;
            case '÷':
              display = memory / display;
              break;
            default: break;
          }
        }
        operat = txt;
      }
    }

    if (txt === '=') {
      if (operat !== null) {
        let result = 0;
        if (this.isNumber(this.state.lastinput)) {
          switch (operat) {
            case '+':
              result = memory + display;
              break;
            case '-':
              result = memory - display;
              break;
            case '*':
              result = memory * display;
              break;
            case '÷':
              result = memory / display;
              break;
            default: break;
          }
          memory = display;
        }
        else {
          switch (operat) {
            case '+':
              result = display + memory;
              break;
            case '-':
              result = display - memory;
              break;
            case '*':
              result = display * memory;
              break;
            case '÷':
              result = display * memory;
              break;
            default: break;
          }
        }
        display = result;
      }
    }

    if (!this.isNumber(this.state.lastinput) && this.state.lastinput !== '.' && txt !== '.' &&
        !this.isSimpleOperation(txt) && !this.isComplexOperation(txt) && txt !== '=')
      display = txt;
    
    this.setState(
      {
        display: display,
        memory: memory,
        lastinput: txt,
        operation: operat,
      }
    );
  }

  render() {
    
    return (
      <div className="app">
        <Display value={this.state.display}/>
        <BtnPanel onClick={
          (txt) => this.handleBtnClick(txt)
        } />
      </div>
    );
  }
}


function App() {
  return (
    <Calculator />
  );
}

export default App;
