import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import config from './utils/config';
import breweries from './map/features.json'

Mapbox.setAccessToken(config.get('accessToken'));

const VECTOR_SOURCE_URL =
  'mapbox://arnaudehresmann.cjmag27gf2ywn32s5vwzc8uvj-7ic0r';

  const layerStyles = Mapbox.StyleSheet.create({
    symbol:{
        textField:'title'
    },
    singlePoint: {
      // circleColor: 'green',
      // circleOpacity: 0.84,
      // circleStrokeWidth: 2,
      // circleStrokeColor: 'white',
      // circleRadius: 5,
      // circlePitchAlignment: 'map',
      textField: '{title}',
      textSize: 12,
      textPitchAlignment: 'map',
      iconImage: 'beer-15',
      textAnchor: 'bottom',
      textOffset: [0, -0.5],
      textOptional: true
    },
  
    clusteredPoints: {
      circlePitchAlignment: 'map',
      circleColor: Mapbox.StyleSheet.source(
        [
          [25, 'yellow'],
          [50, 'red'],
          [75, 'blue'],
          [100, 'orange'],
          [300, 'pink'],
          [750, 'white'],
        ],
        'point_count',
        Mapbox.InterpolationMode.Exponential,
      ),
  
      circleRadius: Mapbox.StyleSheet.source(
        [[0, 15], [100, 20], [750, 30]],
        'point_count',
        Mapbox.InterpolationMode.Exponential,
      ),
  
      circleOpacity: 0.84,
      circleStrokeWidth: 2,
      circleStrokeColor: 'white',
    },
  
    clusterCount: {
      textField: '{point_count}',
      textSize: 12,
      textPitchAlignment: 'map',
    },
  });


  export default class App extends Component {

    render() {
      return (
        <View style={styles.container}>
          <Mapbox.MapView
              styleURL={'mapbox://styles/arnaudehresmann/cjmolasbs01e42sljq5fz78sy'}
              zoomLevel={4.81}
              centerCoordinate={[3.315401, 47.077385]}
              style={styles.container}>
         <Mapbox.ShapeSource
            id="earthquakes"
            cluster
            clusterRadius={15}
            clusterMaxZoom={14}
            shape={breweries}>
            <Mapbox.SymbolLayer
              id="pointCount"
              style={layerStyles.clusterCount}
              belowLayerID="clusteredPoints"
            />

            <Mapbox.CircleLayer
              id="clusteredPoints"
              belowLayerID="pointCount"
              filter={['has', 'point_count']}
              style={layerStyles.clusteredPoints}
            />

            <Mapbox.SymbolLayer
              id="singlePoint"
              filter={['!has', 'point_count']}
              style={layerStyles.singlePoint}
              belowLayerID="pointCount"
            />
          </Mapbox.ShapeSource>      
          </Mapbox.MapView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  