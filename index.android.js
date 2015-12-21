/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var REQUEST_URL = 'http://api.wunderground.com/api/185df6336d8b7434/conditions/q/FL/Orlando.json'

var ZachsDemoApp = React.createClass({

  getInitialState: function() { //checks if this.state.current_observation === null, that is ... has the weather data loaded or not
    return {
      current_observation: null,
    };
  },

  componentDidMount: function() { //fires off a request after the component has finished loading //          
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          current_observation: responseData.current_observation,
        });
      })
      .done();
  },

  render: function() {
    if(!this.state.current_observation){
      return this.renderLoadingView();
    }
    var currentWeather = this.state.current_observation;
    return this.renderWeather(currentWeather);
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading weather...
        </Text>
      </View>
    );
  },

  renderWeather: function(currentWeather){
    return (
      <View style={styles.container}>
          <Image style={styles.logo} source={{uri: currentWeather.image.url}} />
          <Text>Weather conditions for {currentWeather.display_location.full}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 130,
    height: 80,
  },
});

AppRegistry.registerComponent('ZachsDemoApp', () => ZachsDemoApp);
