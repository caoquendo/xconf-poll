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
            selectedConference: null
        }
    }

    renderTopics() {
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
                <TopicConsolidate key={topic._id} topic={topic}/>
            );
        });
    }

    componentDidMount() {
        Meteor.setTimeout(() => {
            const $this = this;
            $('select').on('change', (event) => {
                $this.setState({selectedConference: event.target.value});
            }).material_select();
        }, 20);
    }

    render() {
        return <div>
            <div className="row">
                <form>
                    <div className="input-field col md4 offset-m3">
                        <select>
                            {this.props.conferences.map((conf) => {
                                return <option
                                    key={conf._id}
                                    value={conf.name}>
                                    {conf.name}
                                </option>
                            })}
                        </select>
                    </div>
                </form>
            </div>

            <div className="row">
                {this.renderTopics()}
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
