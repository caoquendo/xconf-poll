import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'

const moment = require('moment');

export default class Timer extends Component {

    constructor(props) {
        super(props);
        let endTime = this.props.endTime;
        let startTime = this.props.startTime;

        let leftEndNow = moment.duration(moment(endTime).diff(moment()));
        let totalStartEnd = moment.duration(moment(endTime).diff(startTime));
        let passedStartNow = moment.duration(moment().diff(startTime));

        let secondsLeft = leftEndNow.asSeconds();
        let hours = leftEndNow.hours();
        let minutes = leftEndNow.minutes();
        let seconds = leftEndNow.seconds();

        if (leftEndNow <= 0) {
            secondsLeft = hours = minutes = seconds = 0;
        }

        this.state = {
            totalSeconds : totalStartEnd.asSeconds(),
            passed       : passedStartNow.asSeconds(),
            secondsLeft  : secondsLeft,
            hours        : hours,
            minutes      : minutes,
            seconds      : seconds,
            time         : moment().format("HH:mm:ss")
        };
        setInterval(() => {
            let leftEndNow = moment.duration(moment(endTime).diff(moment()));

            let secondsLeft = leftEndNow.asSeconds();
            let hours = leftEndNow.hours();
            let minutes = leftEndNow.minutes();
            let seconds = leftEndNow.seconds();

            if (leftEndNow <= 0) {
                secondsLeft = hours = minutes = seconds = 0;
            }

            this.setNewState({
                secondsLeft : secondsLeft,
                hours       : hours,
                minutes     : minutes,
                seconds     : seconds,
                time        : moment().format("HH:mm:ss")
            });

        }, 1000);
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

    __timeLeftToVote() {
        return this.state.secondsLeft > 0 ? 'No te quedes sin votar!' : 'Se acabó el tiempo para votar.';
    }

    render() {
        const state = this.state;
        const totalSeconds = Math.floor(state.totalSeconds);
        return (
            <div className="row">
                <div className="col s8">
                    Son las {state.time}. {this.__timeLeftToVote()}
                    <div className="timer-wrapper">
                        <div className="spinner pie" style={{
                            animation               : `rota ${totalSeconds}s linear infinite`,
                            animationDelay          : `-${this.state.passed}s`,
                            animationIterationCount : 1
                        }}/>
                        <div className="filler pie" style={{
                            animation               : `fill ${totalSeconds}s steps(1, end) infinite`,
                            animationDelay          : `-${this.state.passed}s`,
                            animationIterationCount : 1
                        }}/>
                        <div className="mask" style={{
                            animation               : `mask ${totalSeconds}s steps(1, end) infinite`,
                            animationDelay          : `-${this.state.passed}s`,
                            animationIterationCount : 1
                        }}/>
                        <div className="timer-ghost"/>
                        <div className="timer-label">
                            {this.formatTimePart(state.hours)}:{this.formatTimePart(state.minutes)}:{this.formatTimePart(state.seconds)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Timer.propTypes = {
    startTime : PropTypes.string.isRequired,
    endTime   : PropTypes.string.isRequired
};
