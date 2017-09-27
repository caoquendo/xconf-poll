import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

class ConsolidateWait extends Component {

    render() {
        return (
            <div className="row">
                <div className="col s12 m7">
                    <div className="card">
                        <nav>
                            <div className="nav-wrapper">
                                <a href="#" className="brand-logo">
                                    Hola {this.props.currentUser.username}
                                </a>
                            </div>
                        </nav>

                        <div className="card-image" style={{marginTop: 16}}>
                            <img src="images/logo.svg"/>
                        </div>
                        <div className="card-content">
                            <span className="card-title xconf">
                                Estamos consolidando los temas enviados.
                                En pocos momentos podrás votar por tus favoritos!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ConsolidateWait.propTypes = {
    currentUser: PropTypes.object
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, ConsolidateWait);
