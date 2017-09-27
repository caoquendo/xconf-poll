import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import {Conferences} from '../../api/conferences.js';

import XconfCard from "./XconfCard";

class Topics extends Component {

    __conferenceSelect = undefined;

    __onClick = (event) => {
        event.preventDefault();

        const suggestedTopic = ReactDOM.findDOMNode(this.refs.topicTextarea).value.trim();
        const relatedConferenceName = this.__conferenceSelect.value;

        if (suggestedTopic !== '' && relatedConferenceName !== '') {
            Meteor.call('topics.insert', relatedConferenceName, suggestedTopic);

            ReactDOM.findDOMNode(this.refs.topicTextarea).value = '';
        }
    };

    componentDidUpdate() {
        if (!this.props.loading) {
            $('.conference-select').material_select();
        }
    }

    render() {
        let content = <div>
            <span className="card-title xconf">Indícanos sobre qué te gustaría hablar más en el Open Space al final del día.</span>
            <p>Puedes hacer tantos envíos como quieras.</p>
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
                            return <option
                                key={conference._id}
                                value={conference.name}>
                                {conference.name}
                            </option>
                        })}
                    </select>
                    <label>
                        ¿A qué charla se relaciona?
                        <small>(Esto nos ayudará a organizar mejor los temas)</small>
                    </label>
                </div>

                <button className="pink lighten-1 waves-effect waves-light btn" type="submit"
                        onClick={this.__onClick.bind(this)}>
                    Enviar
                </button>
            </form>
        </div>;
        return <XconfCard content={content}/>;
    }
}

Topics.propTypes = {
    conferences: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default createContainer(() => {
    const conferencesSubscription = Meteor.subscribe('conferences');
    const loading = !conferencesSubscription.ready();

    return {
        conferences: Conferences.find({}, {sort: {name: 1}}).fetch(),
        loading
    };
}, Topics);
