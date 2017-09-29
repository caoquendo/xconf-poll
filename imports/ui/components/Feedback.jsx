import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import {Feedbacks} from '../../api/feedbacks.js';

class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            text: '',
            face: 'medium'
        };
    }

    setNewState(newVals) {
        let prevState = this.state;
        let newState = Object.assign(prevState, newVals);
        this.setState(newState);
    }

    __onClickFeedback() {
        this.setNewState({isOpen: !this.state.isOpen});
    }

    __onFeedbackWritten(event) {
        this.setNewState({text: event.target.value});
    }

    __onFeedbackFaceClicked(type) {
        this.setNewState({face: type});
    }

    __onSaveClicked(event) {
        event.preventDefault();
        const textToSave = this.state.text.trim();
        const faceToSave = this.state.face;
        if (textToSave !== '') {
            Meteor.call('feedbacks.insert', textToSave, faceToSave, (error, result) => {
                if (!error) {
                    alert("¡Gracias por tu feedback!");
                    this.setNewState({text: '', face: 'medium'});
                } else {
                    alert("Ocurrió un error inesperado. Vuelve a intentar.");
                }
            });
        }
    }

    __renderFace(type) {
        let imageName = `images/face_${type}`;
        if (this.state.face !== type) {
            imageName += '_disabled';
        }
        imageName += '.svg';

        return <img src={imageName}
                    onClick={() => this.__onFeedbackFaceClicked(type)}
                    className="feedback-icon"/>
    }

    __renderContent() {
        if (!this.state.isOpen) {
            return null;
        }
        return <div className="card-content">
            <form>
                <div className="row">
                    <div className="col m12 feedback-faces">
                        {this.__renderFace('sad')}
                        {this.__renderFace('medium')}
                        {this.__renderFace('happy')}
                    </div>
                </div>
                <div className="input-field">
                    <textarea className="materialize-textarea"
                              value={this.state.text}
                              onChange={this.__onFeedbackWritten.bind(this)}/>
                    <label>
                        Dinos qué piensas
                        <small>(Tus comentarios son anónimos)</small>
                    </label>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button className="pink lighten-1 waves-effect waves-light btn-large right" type="submit"
                                onClick={this.__onSaveClicked.bind(this)}>
                            Enviar
                        </button>
                    </div>
                </div>
            </form>
        </div>;
    }

    render() {
        return <div className="row">
            <div className="col s12">
                <div className="card">
                    <nav onClick={this.__onClickFeedback.bind(this)}>
                        <div className="nav-wrapper deep-purple lighten-4 center-align deep-purple-text">
                            <img src="images/tap.svg" className="tap-icon"/>
                            Con tu feedback ¡ayúdanos a mejorar!
                        </div>
                    </nav>
                    {this.__renderContent()}
                </div>
            </div>
        </div>
    }
}

export default createContainer(() => {
    Meteor.subscribe('feedbacks');
    return {};
}, Feedback);
