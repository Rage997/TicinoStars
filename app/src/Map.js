// import { Popup } from "mapbox-gl";
import React, { useState } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import * as TicinoStars from "./data/stars.json";
import Modal from "./Modal";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFnZTk5NyIsImEiOiJja3J4Zmd4dmcwcHR4Mm5uOHl0cXNxNWdhIn0.spr-aZIVDY4VGYCUh6K11w";

// Map centered in Ticino
const INITIAL_VIEW_STATE = {
  longitude: 8.874958110344565,
  latitude: 46.22002254055144,
  zoom: 8.7,
  pitch: 0,
  bearing: 0,
  width: "100wh",
  height: "100vh",
};

const MAP_BOUNDS = [
  [8.3331298828125, 45.69850658738846], // Southwest coordinates
  [9.43450927734375, 46.59190029349218] // Northeast coordinates
  ];
   

function Map() {
  const [viewPort, setViewPort] = useState(INITIAL_VIEW_STATE);
  const [selectedStar, setSelectedStar] = useState({});
  const [show, setShow] = useState(false);

  const goToCoords = (coords) => {
    setViewPort({
      ...viewPort,
      longitude: coords[0],
      latitude: coords[1],
      zoom: 10,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const clampBoundary = (viewPort) => {
    // Handles viewport boundary limit
    // SouthWeast boundary
    if (viewPort.longitude < MAP_BOUNDS[0][0]) {
      viewPort.longitude = MAP_BOUNDS[0][0];
    }
    if (viewPort.latitude < MAP_BOUNDS[0][1]) {
      viewPort.latitude = MAP_BOUNDS[0][1];
    }
    // NorthEast boundary
    if (viewPort.longitude > MAP_BOUNDS[1][0]) {
      viewPort.longitude = MAP_BOUNDS[1][0];
    }
    if (viewPort.latitude > MAP_BOUNDS[1][1]) {
      viewPort.latitude = MAP_BOUNDS[1][1];
    }
  }  

  return (
    <div id="map">
      <Modal show={show} setShow={setShow} content={selectedStar.content} />

      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(viewPort) => {
          clampBoundary(viewPort);
          setViewPort(viewPort);
        }}
        mapStyle="mapbox://styles/rage997/ckrwcnr5w1qg118qpghum80zk"
      >
        {TicinoStars.features.map((star) => {
          let coords = star.geometry.coordinates;
          return (
            <Marker key={star.key} longitude={coords[0]} latitude={coords[1]}>
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (star.key !== selectedStar.key) {
                    setSelectedStar(star);
                    setShow(true);
                    goToCoords(star.geometry.coordinates)
                  } else {
                    setShow(!show);
                  }
                }}
              >
                <img src="/meme.png" alt="test"></img>
              </button>
            </Marker>
          );
        })}

        {/* {selectedStar ? (
        // console.log(selectedStar)
        <Popup longitude={ selectedStar.geometry.coordinates[0]} 
          latitude={ selectedStar.geometry.coordinates[1]}>
          <div>
            Hello there
          </div>
        </Popup>
      ) : null} */}
      </ReactMapGL>
    </div>
  );
}

export default Map;
