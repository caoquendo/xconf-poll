import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import {Conferences} from '../../api/conferences.js';

class Topics extends Component {

    __conferenceSelect = undefined;

    constructor(props) {
        super(props);
        this.state = {
            isLoaded : false,
            message : null
        }
    }

    setNewState(newVals) {
        let prevState = this.state;
        let newState = Object.assign(prevState, newVals);
        this.setState(newState);
    }

    __onClick = (event) => {
        event.preventDefault();

        const suggestedTopic = ReactDOM.findDOMNode(this.refs.topicTextarea).value.trim();
        const relatedConferenceName = this.__conferenceSelect.value;

        if (suggestedTopic !== '' && relatedConferenceName !== '') {
            Meteor.call('topics.insert', relatedConferenceName, suggestedTopic, (error, result) => {
                let message = null;
                if (!error) {
                    message = <div>
                        <p className="message-title">¡Gracias!</p>
                        <p>Tu sugerencia fue registrada.</p>
                    </div>;
                    ReactDOM.findDOMNode(this.refs.topicTextarea).value = '';
                } else {
                    message = <div>
                        <p className="message-title">¡Oops!</p>
                        <p>Ocurrió un error inesperado. Vuelve a intentar.</p>
                    </div>;
                }
                this.setNewState({message : message});

                setTimeout(() => {
                    this.setNewState({message : null});
                }, 3000);
            });
        }
    };

    componentDidUpdate() {
        if (!this.props.loading && !this.state.isLoaded) {
            $('.conference-select').material_select();
            this.setNewState({isLoaded : true});
        }
    }

    __renderMessage() {
        if (this.state.message === null) {
            return null;
        }
        return <div className="alert-message teal lighten-3">
            {this.state.message}
        </div>
    }

    render() {
        return <div>
            <span className="xconf-title">
                Indícanos sobre qué te gustaría hablar más en el Open Space al final del día.
            </span>
            {this.__renderMessage()}
            <form className="topic-form">
                <div className="input-field">
                    <textarea className="materialize-textarea" ref="topicTextarea"/>
                    <label>
                        Tema, pregunta o idea
                    </label>
                </div>
                <div className="input-field">
                    <select className="conference-select"
                            defaultValue={''}
                            ref={(input) => this.__conferenceSelect = input}>
                        <option value="" disabled>Selecciona...</option>
                        {this.props.conferences.map((conference) => {
                            let content = <span className="conference-item">
                                <span className="conference">{conference.name}. </span>
                                <small className="extra-details">
                                    <strong className="start-time">{conference.startTime} </strong>
                                    <span className="presenters">
                                        -{conference.presenters.map((presenter) =>
                                        <span key={presenter}> {presenter}</span>)}
                                    </span>
                                </small>
                            </span>;
                            return <option
                                key={conference._id}
                                value={conference.name}
                                data-placeholder={conference.name}>
                                {content}
                            </option>
                        })}
                    </select>
                    <label>
                        ¿A qué charla se relaciona?
                        <small>(Para ordenar mejor los temas)</small>
                    </label>
                </div>

                <div className="row">
                    <div className="col s12">
                        <button className="pink lighten-1 waves-effect waves-light btn-large right" type="submit"
                                onClick={this.__onClick.bind(this)}>
                            Enviar
                        </button>
                    </div>
                </div>
            </form>
        </div>;
    }
}

Topics.propTypes = {
    conferences : PropTypes.array.isRequired,
    loading : PropTypes.bool.isRequired
};

export default createContainer(() => {
    const conferencesSubscription = Meteor.subscribe('conferences');
    const loading = !conferencesSubscription.ready();

    return {
        conferences : Conferences.find({}, {sort : {_id : 1}}).fetch(),
        loading
    };
}, Topics);
