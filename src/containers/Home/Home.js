import React, { Component, PropTypes } from 'react';
import DayPicker from 'react-day-picker';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { getPassword } from '../../redux/modules/auth';

import { Modal } from '../../components';

const styles = require('./Home.scss');


@connect(
  state => ({user: state.auth.user}),
  { getPassword }
)
export default class Home extends Component {
  static propTypes = {
    getPassword: PropTypes.func,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  componentDidMount() {
    console.log(this.props.user);
    this.props.getPassword(this.props.user && this.props.user._id);
  }

  clickShowModal() {
    this.setState({
      showModal: true
    });
  }

  clickConfirm() {
    alert('点击确定按钮');
    this.setState({
      showModal: false
    });
  }


  render() {
    return (
      <div>
        <HeadNaviBar>首页</HeadNaviBar>
        <div className={ styles.home}>
          首页
          <Link to="/duty">值班</Link>
          <Link to="/opera">手术</Link>
          <div>
            <p onClick={this.clickShowModal.bind(this)}>弹窗</p>
            <Modal
              showModal= {this.state.showModal}
              title= {'弹窗titile'}
              clickConfirm = {this.clickConfirm.bind(this)}
            >
              弹窗内容
            </Modal>
          </div>
          <DayPicker
            enableOutsideDays
            onDayClick={(event, day) => alert(day)} />
        </div>
      </div>
    );
  }
}
