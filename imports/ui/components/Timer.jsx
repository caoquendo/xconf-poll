import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'

const moment = require('moment');

export default class Timer extends Component {

    constructor(props) {
        super(props);

        this.setInitialState();
        let endTime = this.props.endTime;
        setInterval(() => this.tickUpdate(endTime), 1000);
    }

    tickUpdate(endTime) {
        let leftEndNow = moment.duration(moment(endTime).diff(moment()));

        let secondsLeft = leftEndNow.asSeconds();
        let days = leftEndNow.days();
        let hours = leftEndNow.hours();
        let minutes = leftEndNow.minutes();
        let seconds = leftEndNow.seconds();

        if (leftEndNow <= 0) {
            secondsLeft = days = hours = minutes = seconds = 0;
        }

        this.setNewState({
            secondsLeft: secondsLeft,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            time: moment().format("HH:mm:ss")
        });
    }

    setInitialState() {
        let startTime = this.props.startTime;
        let endTime = this.props.endTime;

        let leftEndNow = moment.duration(moment(endTime).diff(moment()));
        let totalStartEnd = moment.duration(moment(endTime).diff(startTime));
        let passedStartNow = moment.duration(moment().diff(startTime));

        let secondsLeft = leftEndNow.asSeconds();
        let days = leftEndNow.days();
        let hours = leftEndNow.hours();
        let minutes = leftEndNow.minutes();
        let seconds = leftEndNow.seconds();

        if (leftEndNow <= 0) {
            secondsLeft = days = hours = minutes = seconds = 0;
        }

        this.state = {
            totalSeconds: totalStartEnd.asSeconds(),
            passed: passedStartNow.asSeconds(),
            secondsLeft: secondsLeft,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            time: moment().format("HH:mm:ss"),
            config: {
                size: this.props.size || 192,
                labelInside: typeof this.props.labelInside === 'undefined' ? true : this.props.labelInside
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

    render() {
        const state = this.state;
        const totalSeconds = Math.floor(state.totalSeconds);
        let timer = `${this.formatTimePart(state.hours)}:${this.formatTimePart(state.minutes)}:${this.formatTimePart(state.seconds)}`;
        if (state.days > 0) {
            timer = `${state.days} días ${timer}`;
        }
        const size = this.state.config.size;
        const secondsPassed = this.state.passed;

        if (this.state.config.labelInside) {
            return this.__timer(size, totalSeconds, secondsPassed, timer);
        }

        return (
            <div>
                {this.__timer(size, totalSeconds, secondsPassed, timer)}
                {this.__labelOutside(size, timer)}
            </div>
        );
    }

    __labelOutside(size, timer) {
        return <div className="timer-label-outside" style={{width: size}}>
            {timer}
        </div>;
    }

    __timer(size, totalSeconds, secondsPassed, timer) {
        let labelStyle = {
            width: size / 2,
            height: size / 2,
            top: size / 2 - size / 4,
            left: size / 2 - size / 4
        };
        if (this.state.days > 0) {
            labelStyle.paddingTop = size / 8;
        }
        return <div className="timer-wrapper" style={{
            width: size,
            height: size
        }}>
            <div className="spinner pie" style={{
                animation: `rota ${totalSeconds}s linear infinite`,
                animationDelay: `-${secondsPassed}s`,
                animationIterationCount: 1,
                borderRadius: `${size / 2}px 0 0 ${size / 2}px`
            }}/>
            <div className="filler pie" style={{
                animation: `fill ${totalSeconds}s steps(1, end) infinite`,
                animationDelay: `-${secondsPassed}s`,
                animationIterationCount: 1,
                borderRadius: `0 ${size / 2}px ${size / 2}px 0`
            }}/>
            <div className="mask" style={{
                animation: `mask ${totalSeconds}s steps(1, end) infinite`,
                animationDelay: `-${secondsPassed}s`,
                animationIterationCount: 1
            }}/>
            <div className="timer-ghost" style={{
                width: size,
                height: size,
                borderRadius: `${size / 2}px`
            }}/>
            <div className={`timer-label timer-label-${size}`} style={labelStyle}>
                {this.state.config.labelInside ? timer : ''}
            </div>
        </div>;
    }
}

Timer.propTypes = {
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    size: PropTypes.number,
    labelInside: PropTypes.bool
};
