import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';

import { connect } from 'react-redux';
import { getPassword } from '../../redux/modules/auth';


const styles = require('./Home.scss');


@connect(
  state => ({user: state.auth.user}),
  { getPassword }
)
export default class Home extends Component {
  static propTypes = {
    getPassword: PropTypes.func,
    user: PropTypes.obj
  };

  componentDidMount() {
    console.log(this.props.user);
    this.props.getPassword(this.props.user && this.props.user._id);
  }

  render() {
    return (
      <div>
        <HeadNaviBar>首页</HeadNaviBar>
        <div className={ styles.home}>
          首页
        </div>
      </div>
    );
  }
}
