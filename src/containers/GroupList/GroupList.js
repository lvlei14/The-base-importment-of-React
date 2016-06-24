import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
// import { loaddutys } from '../../redux/modules/duty';
// import { sendChangeDutyRequest } from '../../redux/modules/duty';
// import { showDiaglog } from '../../redux/modules/diaglog';

const styles = require('./GroupList.scss');

// @connect(
//   state => ({...state, user: state.auth.user}), {
//     pushState: push,
//   }
// )
export default class GroupList extends Component {
  static propTypes = {
    pushState: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const addGroupListBg = require('../../images/addGroupListBg.png');
    return (
      <div>
        <HeadNaviBar>群组列表</HeadNaviBar>
        <div className={styles.groutList}>
          <SearchBar
            placeholder = "请输入群组名称、组员姓名" />
          <img style={{display: 'none'}} className={styles.addGroupListBg} src={addGroupListBg} alt="" />
          <div>
            <GroupResultList />
          </div>
          <AddPlan />
        </div>
      </div>
    );
  }
}


/**
 * component: group list  or search result list
 */
// @connect(
//   state => ({...state}),
//   {
//   }
// )
class GroupResultList extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const listImg = require('../../images/userHeadPortrait.png');
    return (
      <div className="topCardBg">
        <ul>
          <li className="clearfix">
            <img className="left" src={listImg} alt="" />
            <dl>
              <dt></dt>
              <dd></dd>
            </dl>
          </li>
        </ul>
      </div>
    );
  }
}


/**
 * component: add paln btn
 */
// @connect(
//   state => ({...state}),
//   {
//   }
// )
class AddPlan extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className={styles.addBigBtn}>+</div>
      </div>
    );
  }
}
