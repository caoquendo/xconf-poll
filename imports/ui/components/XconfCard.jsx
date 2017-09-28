import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

class XconfCard extends Component {

    __navBar() {
        if (this.props.currentUser) {
            return (<nav>
                <div className="nav-wrapper deep-purple lighten-4 center-align">
                    ¡Hola <strong>{this.props.currentUser.username}</strong>!
                </div>
            </nav>);
        }
    }

    render() {
        return <div className="row">
            <div className="col s12">
                <div className="card ">
                    {this.__navBar()}

                    <div className="card-header">
                        <img src="images/logo.svg" className="xconf-logo"/>
                    </div>

                    <div className="card-content">
                        {this.props.content}
                    </div>
                </div>
            </div>
        </div>;
    }
}

XconfCard.propTypes = {
    currentUser : PropTypes.object,
    content : PropTypes.element.isRequired
};

export default createContainer(() => {
    return {
        currentUser : Meteor.user()
    };
}, XconfCard);
