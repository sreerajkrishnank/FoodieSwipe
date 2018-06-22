/**
 * Created by payyan1 on 18/06/18.
 */

import React, {Component} from 'react';
import Button from 'muicss/lib/react/button';
import Appbar from 'muicss/lib/react/appbar';
import axios from 'axios'


const geo_options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};

class LocationFetcher extends Component {

    constructor() {
        super();

        this.state = {
            coords: null,
            location: null,
            errorMessage: null
        }
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.coords !== this.state.coords) {
            return true
        }
        return false

    }

    getCurrentLocation(e) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                axios.get('https://maps.googleapis.com/maps/api/geocode/json',
                    {
                        params: {
                            latlng: position.coords.latitude + ',' + position.coords.longitude,
                            key: 'AIzaSyAD7XYJB2DX4_03u6NqBfY4q-yTuJ6mg_8'
                        }
                    })
                    .then(resp => {
                        console.log(JSON.stringify(resp));
                        this.setState({
                            coords: position.coords,
                            location: resp.data.results? resp.data.results[0].formatted_address.split(',').slice(0,3).join(',') : ''
                        })
                    })
                this.props.settingLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
            },
            (err) => {
                this.setState({errorMessage: "not available"});
                this.props.settingLocation({errorMessage: 'Sorry, no position available'})
            },
            geo_options
        );
    }


    render() {
        const s1 = {
            'margin-left': '10px'
        }
        console.log(this.state.coords)
        if (this.state.coords) {
            return (<Appbar className="mui--bg-danger">
                <table width="100%">
                    <tbody>
                    <tr>
                        <td className="mui--appbar-height" style={s1}>Best ones near {this.state.location}</td>
                    </tr>
                    </tbody>
                </table>
            </Appbar>)
        } else {
            return (<div className="coordinates-button"><Button onClick={this.getCurrentLocation} color="danger"
                                                                size="large">I'm hungry!</Button></div>)
        }
    }
}

export default LocationFetcher;