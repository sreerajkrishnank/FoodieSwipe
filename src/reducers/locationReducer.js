/**
 * Created by payyan1 on 18/06/18.
 */
import {GET_LOCATION} from '../actions/types';
import axios from 'axios';

const initialState = {
    coords: null,
    location: null,
    errorMessage: null
}

export default function(state = initialState, actio){
    switch (actio.type){
        case GET_LOCATION:
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
};