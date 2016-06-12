import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { hideDiaglog } from '../../redux/modules/diaglog';

let timer = null;

@connect(
  () => ({}),
  { hideDiaglog, pushState: push})
export default class Diaglog extends Component {
  static propTypes = {
    text: PropTypes.string,
    hideDiaglog: PropTypes.func,
    pushState: PropTypes.func,
    redirectUrl: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  componentDidMount() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.setState({show: false}, () => {
        this.props.hideDiaglog();
      });
      if (this.props.redirectUrl) {
        console.log(this.props.redirectUrl);
        this.props.pushState(this.props.redirectUrl);
      }
    }, 3000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text) {
      console.log(nextProps.text);
      this.setState({show: true});
    }
  }

  componentWillUpdate() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.setState({show: false}, () => {
        this.props.hideDiaglog();
      });
      if (this.props.redirectUrl) {
        console.log(this.props.redirectUrl);
        this.props.pushState(this.props.redirectUrl);
      }
    }, 3000);
  }

  componentWillUnMount() {
    clearTimeout(timer);
  }

  render() {
    const styles = require('./Diaglog.scss');
    return (
      <div className={styles.diagLog}>
        {
          this.props.text && this.state.show && this.props.redirectUrl ?
            <div className={styles.loading}>
              <div className={styles.tipWithRedirectUrl}>{this.props.text}</div>
              <div className={styles.redirectUrl}>即将跳转...</div>
            </div> : ''
        }
        {
          this.props.text && this.state.show && !this.props.redirectUrl ?
            <div className={styles.loading}>
              <div className={styles.tipWithNoRedirectUrl}>{this.props.text}</div>
            </div> : ''
        }
      </div>
    );
  }
}
