import { Component } from "react";
import weatherIcon from './cloudy-day1.png'
import back from './arrow1.jpeg'
import weatherIcon2 from './weatherIcon1.jpeg'
import './index.css'

class WeatherData extends Component {
    state = { weatherData: "", cityName: "", isSearch: true }

    searchBasedOnLocation = (event) => {
        this.setState({ cityName: event.target.value })
    }

    getDetailsBtn = () => {
        let { cityName } = this.state
        if (this.state.isSearch) {

            fetch(`http://localhost:8080/api/weather/${cityName}`)
                .then(async res =>
                    await res.json())
                .then((json) => {
                    console.log(json)
                    this.setState({
                        weatherData: json,
                        isSearch: !this.state.isSearch
                    })
                })
        }
    }

     backBtn=() =>{
        this.setState({
            isSearch:true
        })
     }


    render() {
        let { weatherData } = this.state;
        let temperature
        let startDate
        if (weatherData.data) {
            let d = new Date(weatherData.data.timelines[0].startTime)
            startDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
            temperature = weatherData.data.timelines[0].intervals.slice(0,5)
            
        }

        let getDetailsCard = () => {
            if (this.state.isSearch) {
                return (
                    <div className="search-card">
                        <div className="heading-card">
                            <h2 className="heading">Weather Application</h2>
                        </div>
                        <div className="user-input-card">
                            <p className="heading2">Please enter a valid city name</p>
                            <input className="input-card" onInput={this.searchBasedOnLocation} />
                            <button className="details-button" onClick={this.getDetailsBtn}>Get Details</button>
                        </div>

                    </div>
                )
            } else {
                return (
                    <div className="search-card">
                        <div className="heading-card2">
                            <img className="arrow-icon" onClick={this.backBtn} src={back} alt='' />
                            <h3 className="heading">Weather Application</h3>
                        </div>
                        <div className="user-input-card">
                            <img className="image" src={weatherIcon} alt="" />
                            <h3>{startDate}</h3>
                            <table className="table">
                                <tr>
                                    <th></th>
                                    <th>time</th>
                                    <th>temperature</th>
                                </tr>
                                {temperature.map(eachTime => {
                                    let d2 = new Date(eachTime.startTime)
                                    let hours =`${d2.getHours()}:00`;
                                    return (
                                        <tr>
                                            <td>
                                                <img className="weather-icon" src={weatherIcon2} alt='' />
                                            </td>
                                            <td>
                                                {hours}
                                            </td>
                                            <td>
                                                {eachTime.values.temperature}
                                            </td>
                                        </tr>
                                    )

                                })}
                            </table>
                        </div>
                    </div>
                )
            }

        }

        return (
            <>
                {getDetailsCard()}
            </>
        )
    }
}

export default WeatherData