import React, {Component} from 'react';
import Container from 'muicss/lib/react/container';
import RestaurantsFeed from './components/RestaurantsFeed'
import LocationFetcher from './components/LocationFetcher'
import {Provider} from 'react-redux'
import store from './store/store'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feed: [],
            coords: null,
            errorMessage: null
        }
        this.settingLocation = this.settingLocation.bind(this);
    }

    settingLocation = (data) => {
        console.log('data '+JSON.stringify(data))
        this.setState({
            coords: {
                latitude: data.latitude,
                longitude: data.longitude
            }
        })
    }

    render() {

        return (
            <Provider store={store}>
                <div className="root-div">
                        <LocationFetcher settingLocation = {this.settingLocation}/>
                        <RestaurantsFeed coords = {this.state.coords}/>
                </div>
            </Provider>
        );
    }
}

export default App;
