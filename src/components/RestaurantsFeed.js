/**
 * Created by payyan1 on 18/06/18.
 */
import React, {Component} from 'react';
import  Cards, {Card} from 'react-swipe-card'
import axios from 'axios'

class RestaurantsFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feed: null
        }

        this.callRestaurantsAPI = this.callRestaurantsAPI.bind(this);
    }

    callRestaurantsAPI(coords){
        return axios.get('https://developers.zomato.com/api/v2.1/geocode', {
            params: {
                lat: coords.latitude, //latitude
                lon: coords.longitude //longitude
            },
            headers: {
                'user-key': 'f4e2954d2471c7d76de9e3da46bdcd3f'
            }
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.coords && this.props.coords !== nextProps.coords){
            console.log(nextProps.coords)
            this.callRestaurantsAPI(nextProps.coords)
                .then((resp) => {
                    console.log(JSON.stringify(resp))
                    this.setState({feed: resp.data.nearby_restaurants})
                    return true;
                }, err=> {
                    return false;
                })
        }
        if(this.state.feed !== nextState.feed){
            return true
        }
        return false;
    }

    action(){
        console.log('i')
    }
    render() {

        const bgImg = ()=> {
            const arr = ['food','burger','pizza','cakes','shakes','curry','coffee']
            const sizes = ['400x800','500x900','600x1000','350x640','featured']
            return {
                backgroundImage: "url(https://source.unsplash.com/"+sizes[Math.floor(Math.random()*sizes.length)]+"/?"+arr[Math.floor(Math.random()*arr.length)]+")"
            }
        }
        if(this.state.feed && this.state.feed.length > 0) {
            return (
                <Cards onEnd={this.action('end')} className='master-root'>
                    {this.state.feed.map(item =>
                        <Card key={item.restaurant.id}
                              onSwipeLeft={() => this.action('swipe left')}
                              onSwipeRight={() => this.action('swipe right')}>
                            <div style={bgImg()} className="card-media"></div>
                            <div className="card-data">
                                <div className="card-desc">
                                    <h2>{item.restaurant.name}</h2>
                                    <div className="location"><i className="material-icons">
                                        person_pin_circle
                                    </i>{item.restaurant.location.address}</div>
                                </div>
                            </div>
                        </Card>
                    )}
                </Cards>
            );
        } else if(this.state.feed){
            return (<div><h1>No restaurant</h1></div>)
        } else {
            return (<div></div>)
        }
    }
}

export default RestaurantsFeed;