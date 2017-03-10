import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class Cal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      segmentSelectedIndex : 0,
      billAmount : 0,
      result : 0,
      tipAmount : 0
    }
  }

  handleSegmentChange(index) {
    this.setState({
      segmentSelectedIndex : index
    })

    this.handleBillAmountChange(this.state.billAmount, index)
  }

  handleBillAmountChange(bill, index) {
    this.setState({
      billAmount : bill
    })

    if (!index && index != 0) {
      index = this.state.segmentSelectedIndex
    }

    bill = parseFloat(bill)
    var percent = this.segmentValues()[index] //10% 15% 50%
    percent = parseFloat(percent)/100

    var result = bill + (bill * percent)

    this.setState({
      result : result,
      tipAmount : bill * percent
    })
  }

  segmentValues() {
    return ["10%", "15%", "50%"]
  }

  render() {
    return (
      <View style={{marginTop: 50}}>
      
        <View>
          <Text style={styles.title}>Tip Calculator</Text>
        </View>

        <View style={{flexDirection:'row', alignItems: 'center', margin: 10}}>
          <Text style={styles.labelMedium}>Bill Amount</Text>
          <TextInput style={styles.textinput}
            onChangeText={(billAmount) => this.handleBillAmountChange(billAmount)}
            keyboardType='numeric'
            maxLenght={10}/>
        </View>

        <View style={styles.content}>
          <Text style={styles.labelMedium}>Tip amount: {this.state.tipAmount}</Text>
        </View>

        <View style={styles.content}>
          <SegmentedControlTab
            values={this.segmentValues()}
            onTabPress= {index => this.handleSegmentChange(index)}
            />
        </View>

        <View style={styles.content}>
          <Text style={styles.labelSmall}>Bill amount: {this.state.billAmount} </Text>
          <Text style={styles.labelSmall}>Tip amount: {this.state.tipAmount}</Text>
          <Text style={styles.labelSmall}>Percent: {this.segmentValues()[this.state.segmentSelectedIndex]}</Text>
        </View>

        <View style={styles.content}>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>Result: {this.state.result}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10
  },
  textinput: {
    flex: 0.8,
    height: 40,
    alignSelf: 'stretch',
    borderColor: 'black',
    borderWidth: 2,
    marginLeft: 10,
  },
  labelMedium: {
    fontSize: 18
  },
  labelSmall: {
    fontSize: 12
  },
  content: {
    margin: 10
  }
});

module.export = Cal
