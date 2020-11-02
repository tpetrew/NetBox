import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      items: [],
      currentItem:{
        text:'',
        key:''
      },
      active: null,
      updateResponse: 'none',
      responseColor: '',
      responseBGColor: '',
      responseName: '',
      alertStyles: ''
    }

    this.setUpdate = this.setUpdate.bind(this);
    this.editMark = this.editMark.bind(this);
    this.deleteLine = this.deleteLine.bind(this);

  }

  componentDidMount () {
    return fetch('https://frontend-test.netbox.ru/')
    .then( (response) => response.json() )
    .then( (responseJson) => {
        this.setState({
            items: responseJson,
        });
    })
    .catch((error) => { console.log(error) });
  }
  


    editMark(keyX) {
    if(this.state.active === keyX){
      this.setState({
        active: null
      })
      const value = this.state.items[keyX];
      const uri = 'https://frontend-test.netbox.ru/?';
      const method = 'method=update';
      // console.log(value[0]);
      const data = '&id='+value[0].value+'&name='+value[1].value+'&age='+value[2].value+'&phone='+value[3].value+'&email='+value[4].value;
      fetch(uri+method+data)
      .then( (response) => response.json() )
      .then( (responseJson) => {
          this.setState({
              updateResponse: 'flex',
              responseBGColor: '#E5F5E6',
              responseColor: '#00A006',
              responseName: 'Данные успешно изменены'
          });
          
        }).catch((error) => { 
              this.setState({
                updateResponse: 'flex',
                responseBGColor: '#FAE5E5',
                responseColor: '#CE0000',
                responseName: 'Произошла ошибка'
            });
            console.log(error) 
      });
      console.log(this.state.updateResponse);

    } else {
      this.setState({
        active: keyX,
        updateResponse: 'none',
      })
    }
  }

  setUpdate(text, keyX, keyY){
    console.log(keyX);
    const items = this.state.items;
    items.map((item, X) =>
      item.map((values, Y) => {
        if(X===keyX && Y===keyY){
          values.value= text;
        }
      }
    ))
    this.setState({
      items: items
    })
  }

  deleteLine(keyX){
    console.log(keyX);
    const filteredItems = this.state.items.filter((item, key) =>
      key!==keyX);
    this.setState({
      items: filteredItems
    });

    const value = this.state.items[keyX];
    const uri = 'https://frontend-test.netbox.ru/?';
    const method = 'method=delete';
      // console.log(value[0]);
    const data = '&id='+value[0].value;
      fetch(uri+method+data)
      .then( (response) => response.json() )
      .then( (responseJson) => {
          this.setState({
              updateResponse: 'flex',
              responseBGColor: '#E5F5E6',
              responseColor: '#00A006',
              responseName: 'Строка удалена успешно'
          });
          
        }).catch((error) => { 
              this.setState({
                updateResponse: 'flex',
                responseBGColor: '#FAE5E5',
                responseColor: '#CE0000',
                responseName: 'Произошла ошибка'
            });
            console.log(error) 
      });

  }


 render(){

  const alertStyle = {
    borderRadius: '5px',
    padding: '20px',
    boxSizing: 'border-box',
    display: this.state.updateResponse,
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: '30px',
    position: 'fixed',
    height: '50px',
    width: '400px',
    backgroundColor: this.state.responseBGColor,
    color: this.state.responseColor,
    boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.08)',
  }


  return (
    <div className="App">
        <ListItems items={this.state.items} active={this.state.active} deleteLine={this.deleteLine} setUpdate={this.setUpdate} editMark={this.editMark}/>
        <div style={alertStyle}>{this.state.responseName}</div>
        <div className="countLine">{this.state.items.length} стр.</div>
    </div>
  );

 }

}


export default App;