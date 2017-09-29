import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import XconfCard from "./XconfCard";
import ErrorMessage from "./ErrorMessage";

export default class Credits extends Component {

    render() {
        let iconAuthors =[
            <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons" target="_blank">Smashicons</a>,
            <a href="http://www.freepik.com" title="Freepik" target="_blank">Freepik</a>,
            <a href="https://www.flaticon.com/authors/alfredo-hernandez" title="Alfredo Hernandez" target="_blank">Alfredo Hernandez</a>
        ];
        let iconSource = <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">www.flaticon.com</a>;
        let ccLicense = <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>;

        return <div className="credits center-align">
            <p><strong>Thought</strong>Works Ecuador, 2017</p>
            <div className="authors">
                <p>Iconos por {iconAuthors[0]}, {iconAuthors[1]} y {iconAuthors[2]} de {iconSource}. Con licencia {ccLicense}.</p>
            </div>
        </div>;
    }
}
