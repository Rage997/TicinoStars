import React from 'react';
import Map from './Map';
import './index.css';

const element = <h1>Hello, world</h1>;

// TODO: title and add logo
// TODO: when pressing to one of the michelin stars, a pop-up should display
// with the menu / information / text
function App() {
  return (
    <div>
    {/* <h1>Ticino Land of Stars</h1> */}
    {/* {element} */}

    {/* <div className="map"> */}
    <Map></Map>
    {/* </div> */}

    </div>
  )
}

export default App;