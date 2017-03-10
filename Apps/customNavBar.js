import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Navigator,
  TouchableOpacity
} from 'react-native';

var NavigationBarRouteMapper = {
  LeftButton: (route, navigator, index, navState) =>{
    return
  },
  RightButton: (route, navigator, index, navState) => {
    if(route.id != 'CalculatorPage'){
      return (
        <TouchableOpacity style={stylesCSS.tabbarHeadr} onPress={() => navigator.pop()}>
          <Text style={stylesCSS.headerFontSize}>Save</Text>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity style={stylesCSS.tabbarHeadr} onPress={() => navigator.push({id: 'SettingPage'})}>
          <Text style={stylesCSS.headerFontSize}>Setting</Text>
        </TouchableOpacity>
      );
    }
  },
  Title: (route, navigator, index, navState) => {
    return;
  },
}

const stylesCSS = StyleSheet.create({
  tabbarHeadr: {
    padding: 5
  },
  headerFontSize: {
    padding: 5
  }
});

// export this component
module.exports = (
  <Navigator.NavigationBar
    routeMapper={NavigationBarRouteMapper} />
)
