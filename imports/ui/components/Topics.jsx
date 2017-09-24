import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

export default class Topics extends Component {

    __onClick = (event) => {
        event.preventDefault();
    };

    render() {
        return <div className="row">
            <div className="col s12 m7">
                <div className="card ">
                    <div className="card-image">
                        <img src="images/logo.svg"/>
                    </div>
                    <div className="card-content">
                        <span className="card-title xconf">Indícanos sobre qué te gustaría hablar más en el Open Space al final del día.</span>
                        <p>Puedes hacer tantos envíos como quieras.</p>
                        <form className="topic-form">
                            <div className="input-field">
                                <textarea className="materialize-textarea" ref="topicTextarea"></textarea>
                                <label>
                                    Tema, pregunta o idea
                                </label>
                            </div>
                            <div className="input-field">
                                <select ref="conferenceSelect">
                                    <option value="" disabled selected>Selecciona...</option>
                                </select>
                                <label>
                                    ¿A qué charla se relaciona?
                                    <small>(Esto nos ayudará a organizar mejor los temas)</small>
                                </label>
                            </div>

                            <button className="pink lighten-1 waves-effect waves-light btn" type="submit" onClick={this.__onClick.bind(this)}>
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
    }
}
