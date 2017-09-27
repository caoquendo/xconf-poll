import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'

export default class ErrorMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible : props.message !== null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible : nextProps.message !== null
        });
    }

    render() {
        return this.state.visible ? (
            <div className="row">
                <div className="col s12 card-panel red darken-1 white-text center-align"
                     style={{padding : 8}}>
                    {this.props.message}
                </div>
            </div>
        ) : null;
    }
}

ErrorMessage.propTypes = {
    message : PropTypes.string
};
