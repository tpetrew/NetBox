import React, {useState} from 'react';
import './ListItems.css';

function ListItems(props){

    let [count, setCount] = useState('');

    const items = props.items;
    const active = props.active;
    // const count = 0;
    // console.log(active);
    const listItems = items.map((item, keyX) =>
         <div id={keyX+Date.now()} className={"listLine " + (active === keyX ? "active" : "")}> {
        item.map((values, keyY) => {
            return  <div className="list" key={item.key}>
                        <p>
                            <input type="text" id={keyX+" "+keyY} value={values.value} onChange={(e)=>{props.setUpdate(e.target.value, keyX, keyY)}}/>
                        </p>
                        
                    </div>
                    
                }
            ) }
                <div className="lineButtons">
                    <div className="editButton" onClick={(e)=>{props.editMark(keyX)}}><img src={(active === keyX ? "http://tpetrew.moscow/lastposts/assets/check-mark.svg" : "http://tpetrew.moscow/lastposts/assets/pencil-create.svg")}></img></div>
                    <div className="editButton" onClick={(e)=>{props.deleteLine(keyX)}}><img src="http://tpetrew.moscow/lastposts/assets/trash.svg"></img></div>
                </div>
            </div>


        )

            return <div>{listItems}</div>;
  }

  export default ListItems;