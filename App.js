import React from 'react';
import {View} from 'react-native';
import StopWatch from './src/StopWatch/StopWatch';

class App extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: 'red', flex: 1}}>
        <StopWatch></StopWatch>
      </View>
    );
  }
}

export default App;
