import React, { Component } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';

const styles = require('./Home.scss');

export default class Home extends Component {
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
