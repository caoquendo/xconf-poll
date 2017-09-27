import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import Timer from "./Timer";

const moment = require('moment');

export default class TimerWrapper extends Component {

    constructor(props) {
        super(props);

        this.setInitialState();
        setInterval(() => {
            this.setNewState({
                time : moment().format("HH:mm:ss")
            });
        }, 1000);
    }

    setInitialState() {
        this.state = {
            time : moment().format("HH:mm:ss"),
            config : {
                showTime : typeof this.props.showTime === 'undefined' ? true : this.props.showTime,
                messageStillTime : this.props.messageStillTime || 'No te quedes sin votar!',
                messageOutOfTime : this.props.messageOutOfTime || 'Se acabó el tiempo para votar.'
            }
        }
    }

    setNewState(newVals) {
        let prevState = this.state;
        let newState = Object.assign(prevState, newVals);
        this.setState(newState);
    }

    formatTimePart(time) {
        let padded = `${time}`;
        if (padded.length === 1) {
            padded = '0' + padded;
        }
        return padded;
    }

    __formatMessage() {
        let endTime = this.props.endTime;
        let leftEndNow = moment.duration(moment(endTime).diff(moment()));
        let secondsLeft = leftEndNow.asSeconds();
        if (leftEndNow <= 0) {
            secondsLeft = 0;
        }
        return secondsLeft > 0 ? this.state.config.messageStillTime : this.state.config.messageOutOfTime;
    }

    render() {
        return (
            <div className="row" style={{marginTop : 32}}>
                <div className="col s12 center-align timer-ui">
                    <Timer
                        size={320}
                        startTime={this.props.startTime}
                        endTime={this.props.endTime}/>
                    {this.state.config.showTime ? 'Son las {state.time}.' : ''}
                </div>
                <div className="col s12 center-align timer-label-outside" style={{marginTop : 8}}>
                    {this.__formatMessage()}
                </div>
            </div>
        );
    }
}

TimerWrapper.propTypes = {
    startTime : PropTypes.string.isRequired,
    endTime : PropTypes.string.isRequired,
    messageStillTime : PropTypes.string,
    messageOutOfTime : PropTypes.string,
    showTime : PropTypes.bool
};
