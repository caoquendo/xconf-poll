import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import {Topics} from '../../api/topics.js';
import {Conferences} from '../../api/conferences.js';
import TopicConsolidate from "./TopicConsolidate";

class Consolidate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedConference: null,
            selectedConferenceId: null,
            selectedConferenceText: ''
        };
    }

    setNewState(newVals) {
        let prevState = this.state;
        let newState = Object.assign(prevState, newVals);
        this.setState(newState);
    }

    componentDidMount() {
        Meteor.setTimeout(() => {
            const allConfs = this.props.conferences;
            let selectedConference = this.state.selectedConference;
            let selectedConferenceId = this.state.selectedConferenceId;
            if (selectedConferenceId === null) {
                selectedConferenceId = allConfs[0]._id;
            }
            let conferences = allConfs.filter(c => c._id === selectedConferenceId);
            let consolidated = "";
            if (conferences.length === 1) {
                consolidated = conferences[0].consolidated;
            }
            this.setNewState({
                selectedConference: selectedConference,
                selectedConferenceId: selectedConferenceId,
                selectedConferenceText: consolidated
            });
            const that = this;
            $('select').on('change', (event) => {
                const allConfs = that.props.conferences;
                let select = event.target;
                let selectedConference = select.value;
                let selectedConferenceId = $(select.options[select.selectedIndex]).data("conference");
                let conferences = allConfs.filter(c => c._id === `${selectedConferenceId}`);
                let consolidated = "";
                if (conferences.length === 1) {
                    consolidated = conferences[0].consolidated;
                }
                if (typeof consolidated === 'undefined') {
                    consolidated = '';
                }
                that.setNewState({
                    selectedConference: selectedConference,
                    selectedConferenceId: selectedConferenceId,
                    selectedConferenceText: consolidated
                });
            }).material_select();
        }, 200);
    }

    __onTopicClicked(text) {
        let conference = this.props.conferences[0];
        if (this.state.selectedConference !== null) {
            conference = this.state.selectedConference;
        }
        let selectedConference = this.state.selectedConference;
        let selectedConferenceId = this.state.selectedConferenceId;
        let consolidatedText = this.state.selectedConferenceText + "\n---\n" + text;

        if (selectedConferenceId === null) {
            selectedConferenceId = conference._id;
            selectedConference = conference.name;
        }

        this.setNewState({
            selectedConferenceId: selectedConferenceId,
            selectedConference: selectedConference,
            selectedConferenceText: consolidatedText
        });
        Meteor.call('conferences.setConsolidated', `${selectedConferenceId}`, consolidatedText);
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
        return <select>
            {this.props.conferences.map((conf) => {
                return <option
                    key={conf._id}
                    data-conference={conf._id}
                    value={conf.name}>
                    {conf.name}
                </option>
            })}
        </select>;
    }

    __onSaveConsolidated(event) {
        const allConfs = this.props.conferences;
        let selectedConferenceId = this.state.selectedConferenceId;
        if (selectedConferenceId === null) {
            selectedConferenceId = allConfs[0]._id;
        }
        let consolidatedText = event.target.value;
        Meteor.call('conferences.setConsolidated', `${selectedConferenceId}`, consolidatedText);
    }

    __onChange(event) {
        this.setNewState({
            selectedConferenceText: event.target.value
        });
    }

    render() {
        return <div>
            <div className="row">
                <form>
                    <div className="input-field col md4 offset-m3">
                        {this.__createConferencesSelect()}
                    </div>
                </form>
            </div>

            <div className="row">
                {this.__renderTopics()}
            </div>

            <div className="row">
                <form>
                    <div className="input-field col m12">
                        <textarea className="materialize-textarea consolidated-topic"
                                  onChange={this.__onChange.bind(this)}
                                  onBlur={this.__onSaveConsolidated.bind(this)}
                                  value={this.state.selectedConferenceText}
                        />
                        <label>Consolidado</label>
                    </div>
                </form>
            </div>
        </div>
    }
}

Consolidate.propTypes = {
    topics: PropTypes.array.isRequired,
    conferences: PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('topics');
    Meteor.subscribe('conferences');
    return {
        topics: Topics.find({}, {sort: {conference: 1}}).fetch(),
        conferences: Conferences.find({}, {sort: {name: 1}}).fetch()
    };
}, Consolidate);
