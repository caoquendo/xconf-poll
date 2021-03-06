import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import {Feedbacks} from '../../api/feedbacks.js';

class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
            text : '',
            face : '',
            message : null
        };
    }

    setNewState(newVals) {
        let prevState = this.state;
        let newState = Object.assign(prevState, newVals);
        this.setState(newState);
    }

    __onClickFeedback() {
        this.setNewState({isOpen : !this.state.isOpen});
    }

    __onFeedbackWritten(event) {
        this.setNewState({text : event.target.value});
    }

    __onFeedbackFaceClicked(type) {
        this.setNewState({face : type});
    }

    __onSaveClicked(event) {
        event.preventDefault();
        const textToSave = this.state.text.trim();
        const faceToSave = this.state.face;
        if (textToSave !== '') {
            Meteor.call('feedbacks.insert', textToSave, faceToSave, (error, result) => {
                let message = null;
                if (!error) {
                    message = <div>
                        <p className="message-title">¡Gracias!</p>
                        <p>Tus comentarios fueron registrados.</p>
                    </div>;
                    this.setNewState({text: '', face: ''});
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

    __renderMessage() {
        if (this.state.message === null) {
            return null;
        }
        return <div className="alert-message teal lighten-3">
            {this.state.message}
        </div>
    }

    __renderContent() {
        if (!this.state.isOpen) {
            return null;
        }
        return <div className="card-content">
            <form className="feedback-container">
                <div className="feedback-prompt center-align">
                    <small><strong>Esta información es anónima</strong>.<br />
                        Puedes enviar tu opinión o comentarios sobre las charlas o el evento las veces que quieras.</small>
                </div>
                {this.__renderMessage()}
                <div className="feedback-feelings">
                    <label>¿Cómo te sientes?</label>
                    <div className="row">
                        <div className="col m12 feedback-faces">
                            {this.__renderFace('sad')}
                            {this.__renderFace('medium')}
                            {this.__renderFace('happy')}
                        </div>
                    </div>
                </div>
                <div className="input-field">
                    <textarea className="materialize-textarea"
                              value={this.state.text}
                              onChange={this.__onFeedbackWritten.bind(this)}/>
                    <label>Dinos qué piensas</label>
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
