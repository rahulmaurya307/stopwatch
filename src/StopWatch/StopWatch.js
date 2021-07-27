import React, {Component} from 'react';
import {COLOR_DISABLED} from '../Utiles/Colors';

import {
  STR_LAP,
  STR_START,
  STR_STOP,
  STR_RESET,
} from '../Constants/ConstantStrings';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

//MARK : creates for styling
import styles from './StopWatch.style';

//MARK : common button for start, end, lap, reset
import {CustomButton} from '../Components/button/CustomButton';

//MARK: Returning time using moment library
function Timer({interval, style}) {
  const pad = n => (n < 10 ? '0' + n : n);
  const duration = moment.duration(interval);
  const mSecond = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())}:</Text>
      <Text style={style}>{pad(mSecond)}</Text>
    </View>
  );
}

//MARK: Returning the
function Lap({number, interval, fastest, slowest}) {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest,
  ];
  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {number}</Text>
      <Timer style={[lapStyle, styles.lapTimer]} interval={interval} />
    </View>
  );
}

function LapsTable({laps, timer}) {
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={index === 0 ? timer + lap : lap}
        />
      ))}
    </ScrollView>
  );
}

function ButtonsRow({children}) {
  return <View style={styles.buttonsRow}>{children}</View>;
}
export default class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      now: 0,
      laps: [],
    };
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  start = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now,
      laps: [0],
    });
    this.timer = setInterval(() => {
      this.setState({now: new Date().getTime()});
    }, 100);
  };

  lap = () => {
    const timestamp = new Date().getTime();
    const {laps, now, start} = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timestamp,
      now: timestamp,
    });
  };

  stop = () => {
    clearInterval(this.timer);
    const {laps, now, start} = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    });
  };
  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    });
  };
  resume = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now,
    });
    this.timer = setInterval(() => {
      this.setState({now: new Date().getTime()});
    }, 100);
  };

  render() {
    const {now, start, laps} = this.state;
    const timer = now - start;
    return (
      <View style={styles.container}>
        <LapsTable laps={laps} timer={timer} />

        <Timer
          interval={laps.reduce((total, curr) => total + curr, 0) + timer}
          style={styles.timer}
        />
        {laps.length === 0 && (
          <ButtonsRow>
            <CustomButton title="Lap" disabled={true} color="grey" />
            <CustomButton title="Start" onPress={this.start} />
          </ButtonsRow>
        )}
        {start > 0 && (
          <ButtonsRow>
            <CustomButton title="Lap" onPress={this.lap} />
            <CustomButton title="Stop" onPress={this.stop} />
          </ButtonsRow>
        )}
        {laps.length > 0 && start === 0 && (
          <ButtonsRow>
            <CustomButton title="Reset" onPress={this.reset} />
            <CustomButton title="Start" onPress={this.resume} />
          </ButtonsRow>
        )}
      </View>
    );
  }
}
