import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import {Configs} from '../../../imports/api/configs.js';

class Config extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date : "",
            createTopics : "",
            consolidateTopics : "",
            vote : "",
            results : "",
            endAll : ""
        }
    }

    componentDidMount() {
        $('label').addClass('active');
    }

    __onSaveConfig() {

    }

    __onInputChange(event) {
        console.log(event.target.value);
    }

    __renderConfigItem(config) {
        return <div key={config._id}>
            <form className="login-form">
                <div className="row">
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.date}/>
                        <label>
                            Fecha
                            <small> [YYYY-MM-DD]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.startAll}/>
                        <label>
                            Inicio del evento
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.createTopics}/>
                        <label>
                            Proponer temas
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.consolidateTopics}/>
                        <label>
                            Consolidar temas
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.vote}/>
                        <label>
                            Votar
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.results}/>
                        <label>
                            Resultados
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.endAll}/>
                        <label>
                            Fin del evento
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <button className="pink lighten-1 waves-effect waves-light btn-large right" type="submit"
                                onClick={this.__onSaveConfig.bind(this)}>
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    }

    render() {
        const config = this.props.configs.filter(config => !config.default)[0];
        return <div>
            <form className="login-form">
                <div className="row">
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.date}/>
                        <label>
                            Fecha
                            <small> [YYYY-MM-DD]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.startAll}/>
                        <label>
                            Inicio del evento
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.createTopics}/>
                        <label>
                            Proponer temas
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.consolidateTopics}/>
                        <label>
                            Consolidar temas
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.vote}/>
                        <label>
                            Votar
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.results}/>
                        <label>
                            Resultados
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                    <div className="col s6 input-field">
                        <input type="text" defaultValue={config.endAll}/>
                        <label>
                            Fin del evento
                            <small> [HH:mm]</small>
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <button className="pink lighten-1 waves-effect waves-light btn-large right" type="submit"
                                onClick={this.__onSaveConfig.bind(this)}>
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    }
}

Config.propTypes = {
    configs : PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('configs');
    return {
        configs : Configs.find({}).fetch()
    };
}, Config);
