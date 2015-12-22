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
  ListView,
  View,
} = React;

var REQUEST_URL = 'http://api.wunderground.com/api/185df6336d8b7434/conditions/q/autoip.json'; // formatted API call "conditions" returns temp, wind, etc "autoip" geolocates 

var ZachsDemoApp = React.createClass({

  getInitialState: function() { //checks if this.state.current_observation === null, that is ... has the weather data loaded or not
    return {
      current_observation: null,
    };
  },

  componentDidMount: function() { //fires off a request after the component has finished loading 
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
        <View style={styles.headerContainer}>
          <View style={styles.logoBox}>
            <Image style={styles.logo} source={{uri: currentWeather.image.url}} />
          </View>
          <View style={styles.locBox}>
            <Text style={styles.loc}>Weather conditions for </Text> 
            <Text style={styles.loc}>{currentWeather.display_location.full}</Text>
          </View>
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.obTime}>{currentWeather.observation_time}</Text>
          <View>
            <Image style={styles.icon} source={{uri: currentWeather.icon_url}} />
            <Text>{currentWeather.temp_f}</Text>
          </View>
          <Text>{currentWeather.weather}</Text>

          <Text>{currentWeather.relative_humidity}</Text>
          <Text>{currentWeather.wind_string}</Text>
          
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF', 
  },
  headerContainer:{
    flexDirection: 'row',
    borderWidth: 1,    
    height: 90,
  },
  logoBox:{
    width: 130,
    height: 90,
  },
  logo: {
    width: 130,
    height: 80,
  },
  locBox:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  
    height: 90,
  },
  loc:{
    fontSize: 20,
    textAlign: 'center',
  },
  informationContainer:{
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
  },
  weatherContainer:{
    flexDirection: 'row'
  },
  obTime:{
    textAlign: 'center',
  },
  icon:{
    width: 130,
    height: 130,
  }
});

AppRegistry.registerComponent('ZachsDemoApp', () => ZachsDemoApp);
