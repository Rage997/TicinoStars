import React, {useState, useRef, useCallback} from 'react';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import {IconLayer} from '@deck.gl/layers';
import {MapboxLayer} from '@deck.gl/mapbox';

const MAPBOX_TOKEN = "pk.eyJ1IjoicmFnZTk5NyIsImEiOiJja3J4Zmd4dmcwcHR4Mm5uOHl0cXNxNWdhIn0.spr-aZIVDY4VGYCUh6K11w"

const INITIAL_VIEW_STATE = {
  longitude: 8.874958110344565,
  latitude: 46.22002254055144,
  zoom: 8.7,
  pitch: 0,
  bearing: 0
};

const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
};

const data = [
  {position: [8.874958110344565, 46.22002254055144], size: 100}
];

function Map() {
  // DeckGL and mapbox will both draw into this WebGL context
  const [glContext, setGLContext] = useState();
  const deckRef = useRef(null);
  const mapRef = useRef(null);

  const onMapLoad = useCallback(() => {
    const map = mapRef.current.getMap();
    const deck = deckRef.current.deck;

    // You must initialize an empty deck.gl layer to prevent flashing
    map.addLayer(
      // This id has to match the id of the deck.gl layer
      new MapboxLayer({ id: "my-scatterplot", deck }),
      // Optionally define id from Mapbox layer stack under which to add deck layer
      'beforeId'
    );
    map.addLayer(
      // This id has to match the id of the deck.gl layer
      new IconLayer({ id: "icon-layer", deck }),
      // Optionally define id from Mapbox layer stack under which to add deck layer
      'beforeId'
    );
    
  }, []);

  const layers = [
    new ScatterplotLayer({
      id: 'my-scatterplot',
      data,
      getPosition: d => d.position,
      getRadius: d => d.size,
      getFillColor: [0, 0, 0]
    }),
    new IconLayer({
      id: 'icon-layer',
      data,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',
  
      sizeScale: 15,
      getPosition: d => d.coordinates,
      getSize: d => 5,
      getColor: d => [Math.sqrt(d.exits), 140, 0]
    })
  ];


  return (
    <DeckGL
      // Resizing the map components yield to the wrong size of the map..
      // width={'75vh'} 
      // height={'80vw'}
      ref={deckRef}
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      onWebGLInitialized={setGLContext}
      glOptions={{
        /* To render vector tile polygons correctly */
        stencil: true
      }}
    >
      {glContext && (
        /* This is important: Mapbox must be instantiated after the WebGLContext is available */
        <StaticMap
          ref={mapRef}
          gl={glContext}
          mapStyle="mapbox://styles/rage997/ckrwcnr5w1qg118qpghum80zk"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onLoad={onMapLoad}
        />
      )}
    </DeckGL>
  );
}

export default Map;
