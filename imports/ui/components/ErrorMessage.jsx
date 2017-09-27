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

    __onClick = (event) => {
        event.preventDefault();
        this.setState({visible : false});
    };

    render() {
        return this.state.visible ? (
            <div className="row">
                <div className="col s12 card-panel red darken-1 white-text"
                     style={{padding : 8}}>
                    <div className="left" style={{marginTop : 6}}>{this.props.message}</div>
                    <a href="#" onClick={this.__onClick.bind(this)}
                       style={{marginTop : 8}}
                       className="right white-text waves-effect waves-light btn-flat">
                        x
                    </a>
                </div>
            </div>
        ) : null;
    }
}

ErrorMessage.propTypes = {
    message : PropTypes.string
};
