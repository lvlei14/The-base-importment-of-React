import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import Modal from '../../components/Modal/Modal';
import { showDiaglog } from '../../redux/modules/diaglog';

import { loadAppartNeedById } from '../../redux/modules/invitation';

const styles = require('./NeedApartmentDetail.scss');

@connect(
  state => ({...state.invitation}), {
    // pushState: push,
    loadAppartNeedById,
    showDiaglog
  }
)
export default class NeedApartmentDetail extends Component {
  static propTypes = {
    // pushState: PropTypes.func,
    loadAppartNeedById: PropTypes.func,
    invitation: PropTypes.object,
    routeParams: PropTypes.object,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {id} = this.props.routeParams;
    this.props.loadAppartNeedById(id);
  }

  render() {
    console.log(this.props.invitation);
    const {status, operation} = this.props.location.query;
    return (
      <div className={'duty ' + styles.duty}>
        <HeadNaviBar>需求详情</HeadNaviBar>
      </div>
    );
  }
}

