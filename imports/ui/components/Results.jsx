import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import {ConsolidatedTopics} from '../../api/consolidatedTopics.js';
import ResultItem from "./ResultItem";

class Results extends Component {
    render() {
        return <div>
            <div className="row">
                <div className="col s12 xconf-title" style={{textAlign : 'left'}}>
                    Estos son los temas seleccionados por mayoría de votos.
                </div>
            </div>
            <div className="row">
                {this.props.consolidatedTopics.map((topic, index) => {
                    return <ResultItem key={topic._id} topic={topic} index={index}/>
                })}
            </div>
        </div>
    }
}

Results.propTypes = {
    consolidatedTopics : PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('consolidatedTopics');
    return {
        consolidatedTopics : ConsolidatedTopics.find({}, {sort : {votes : -1}}).fetch()
    };
}, Results);
