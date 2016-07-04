import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { loadGroupAppartList } from '../../redux/modules/groupList';
// import { sendChangeDutyRequest } from '../../redux/modules/duty';
// import { showDiaglog } from '../../redux/modules/diaglog';

const styles = require('./GroupList.scss');

@connect(
  state => ({...state.groupList}), {
    pushState: push,
    loadGroupAppartList,
  }
)
export default class GroupList extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadGroupAppartList: PropTypes.func,
    groupAppartLists: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.loadGroupAppartList();
  }

  goGroupMsgList(groupAppartId, groupAppartName) {
    this.props.pushState('/group-msg-list/' + groupAppartId + '?groupAppartName=' + groupAppartName);
  }

  render() {
    const {groupAppartLists} = this.props;
    const listImg = require('../../images/groupAppartImg.png');
    return (
      <div>
        <HeadNaviBar>群组列表</HeadNaviBar>
        <div className={styles.groutList}>
          <ul className="topCardBg">
            {
              groupAppartLists && groupAppartLists.map((groupAppartList) => {
                return (
                  <li key={groupAppartList.id} className="clearfix" onClick={() => this.goGroupMsgList(groupAppartList.id, groupAppartList.name)}>
                    <img className="left" src={listImg} alt="" />
                    <dl>
                      <dt>{groupAppartList.name}</dt>
                      <dd className="clearfix">
                        <span className="left"></span>
                        <span className="right"></span>
                      </dd>
                    </dl>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

