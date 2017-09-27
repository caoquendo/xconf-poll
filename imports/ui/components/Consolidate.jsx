import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import {Topics} from '../../api/topics.js';
import {Conferences} from '../../api/conferences.js';
import {ConsolidatedTopics} from '../../api/consolidatedTopics.js';

import TopicConsolidate from "./TopicConsolidate";
import ConsolidatedTopic from "./ConsolidatedTopic";

class Consolidate extends Component {

    __conferenceSelect = undefined;

    constructor(props) {
        super(props);
        this.state = {
            selectedConference: null,
            consolidatedText: '',
            isLoaded: false
        };
    }

    setNewState(newVals) {
        let prevState = this.state;
        let newState = Object.assign(prevState, newVals);
        this.setState(newState);
    }

    componentDidUpdate() {
        if (!this.props.loading && !this.state.isLoaded) {
            $('.conference-select').material_select();
            this.setNewState({isLoaded: true});
        }
    }

    __onTopicClicked(text) {
        let selectedConference = this.state.selectedConference;
        let consolidatedText = this.state.consolidatedText + "\n---\n" + text;

        this.setNewState({
            selectedConference: selectedConference,
            consolidatedText: consolidatedText
        });
    }

    __renderTopics() {
        let filteredTopics = this.props.topics;
        if (this.props.conferences.length > 0) {
            let conference = this.props.conferences[0].name;
            if (this.state.selectedConference !== null) {
                conference = this.state.selectedConference;
            }
            filteredTopics = this.props.topics.filter(topic => topic.conference === conference);
        }
        return filteredTopics.map((topic) => {
            return (
                <TopicConsolidate key={topic._id} topic={topic}
                                  onClick={this.__onTopicClicked.bind(this)}/>
            );
        });
    }

    __createConferencesSelect() {
        return <select className="conference-select"
                       ref={(input) => this.__conferenceSelect = input}>
            {this.props.conferences.map((conference) => {
                return <option
                    key={conference._id}
                    data-conference={conference._id}
                    value={conference.name}>
                    {conference.name}
                </option>
            })}
        </select>
    }

    __onSaveConsolidated(event) {
        event.preventDefault();
        const allConfs = this.props.conferences;
        let selectedConference = this.state.selectedConference;
        if (selectedConference === null) {
            selectedConference = allConfs[0].name;
        }
        let consolidatedText = this.state.consolidatedText.trim();
        if (consolidatedText !== '') {
            Meteor.call('consolidatedTopics.insert', selectedConference, consolidatedText);
        }
        this.setNewState({
            consolidatedText: ''
        });
    }

    __onChange(event) {
        this.setNewState({
            consolidatedText: event.target.value
        });
    }

    __onClick(event) {
        event.preventDefault();
        let select = this.__conferenceSelect;
        let selectedConference = select.value;

        this.setNewState({
            selectedConference: selectedConference,
            consolidatedText: ''
        });
    }

    render() {
        return <div>
            <div className="row">
                <div className="col l6 s12">
                    <div className="row valign-wrapper">
                        <div className="input-field col md4 offset-m3">
                            {this.__createConferencesSelect()}
                        </div>
                        <div className="col md2">
                            <button className="pink lighten-1 waves-effect waves-light btn" type="submit"
                                    onClick={this.__onClick.bind(this)}>
                                Ver
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        {this.__renderTopics()}
                    </div>

                    <div className="row">
                        <form>
                            <div className="input-field col m12">
                        <textarea className="materialize-textarea consolidated-topic"
                                  onChange={this.__onChange.bind(this)}
                                  value={this.state.consolidatedText}/>
                                <label>Consolidado</label>
                            </div>
                            <button type="submit"
                                    className="waves-effect waves-light btn"
                                    onClick={this.__onSaveConsolidated.bind(this)}>
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col l6 s12">
                    <div className="row">
                        {this.props.consolidatedTopics.map(topic => {
                            return <ConsolidatedTopic key={topic._id} topic={topic}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    }
}

Consolidate.propTypes = {
    topics: PropTypes.array.isRequired,
    conferences: PropTypes.array.isRequired,
    consolidatedTopics: PropTypes.array,
    loading: PropTypes.bool.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('topics');
    Meteor.subscribe('consolidatedTopics');
    const conferencesSubscription = Meteor.subscribe('conferences');
    const loading = !conferencesSubscription.ready();
    return {
        topics: Topics.find({}, {sort: {conference: 1}}).fetch(),
        conferences: Conferences.find({}, {sort: {name: 1}}).fetch(),
        consolidatedTopics: ConsolidatedTopics.find({}, {sort: {conference: 1}}).fetch(),
        loading
    };
}, Consolidate);
