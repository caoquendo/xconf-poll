import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
            consolidated: ""
        };
    }

    componentDidMount() {
        Meteor.setTimeout(() => {
            const $this = this;
            $('select').on('change', (event) => {
                let selectedConference = event.target.value;
                $this.setState({
                    selectedConference: selectedConference,
                    consolidated: ""
                });
            }).material_select();
        }, 20);
    }

    __onTopicClicked(text) {
        let sc = this.state.selectedConference;
        let c = this.state.consolidated;
        console.log(this.state, text);
        this.setState({
            selectedConference: sc,
            consolidated: c + "\n---\n" + text
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
        return <select>
            {this.props.conferences.map((conf) => {
                return <option
                    key={conf._id}
                    value={conf.name}>
                    {conf.name}
                </option>
            })}
        </select>;
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
                        <textarea className="materialize-textarea consolidated-topic" value={this.state.consolidated}/>
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
