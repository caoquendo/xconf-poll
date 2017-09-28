import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import {Configs} from '../../../imports/api/configs.js';

class Config extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaults : {
                date : "2017-09-30",
                createTopics : "10:50",
                consolidateTopics : "15:45",
                vote : "16:15",
                results : "16:40",
                endAll : "20:00"
            },
            new : {}
        }
    }

    __onSaveConfig() {

    }

    __onInputChange(event) {
        console.log(event.target.value);
    }

    render() {
        return <div>
            <form className="login-form">
                <div className="input-field">
                    <input type="text" onChange={this.__onInputChange.bind(this)}/>
                    <label>
                        Fecha
                        <small> [yyyy-MM-dd]</small>
                    </label>
                </div>


                <div className="row">
                    <div className="col s12">
                        <button className="pink lighten-1 waves-effect waves-light btn-large right" type="submit"
                                onClick={this.__onSaveConfig.bind(this)}>
                            Continuar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    }
}

Config.propTypes = {
    config : PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('configs');
    return {
        config : Configs.find({}).fetch()
    };
}, Config);
