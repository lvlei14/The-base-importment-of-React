import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';


@connect(
  state => ({...state}),
  {pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <p>Hello World!</p>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
