import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { loadGroupMsgList } from '../../redux/modules/groupList';
import { loadTemplates } from '../../redux/modules/datePlan';
import { Modal } from '../../components';

const styles = require('./GroupMsgList.scss');
const chafang = require('../../images/chafang.png');
const shoushu = require('../../images/shoushu.png');
const huiyi = require('../../images/huiyi.png');
const zidingyi = require('../../images/zidingyi.png');

@connect(
  state => ({...state.groupList, user: state.auth.user}), {
    pushState: push,
    loadGroupMsgList
  }
)
export default class GroupMsgList extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    routeParams: PropTypes.object,
    loadGroupMsgList: PropTypes.func,
    groupMsgLists: PropTypes.array,
    user: PropTypes.object,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {id} = this.props.routeParams;
    this.props.loadGroupMsgList(id);
  }

  formatDate(day) {
    const date = new Date(day);
    const splitLine = '-';
    return date.getFullYear() + splitLine + (date.getMonth() + 1) + splitLine + date.getDate();
  }

  formatTime(day) {
    const date = new Date(day);
    const splitLine = ':';
    return date.getHours() + splitLine + date.getMinutes();
  }

  goDatePlanDetail(id, typeVal) {
    this.props.pushState('/date-plan-detail/' + id + '/' + typeVal + '?groupAppartId=' + this.props.routeParams.id);
  }

  render() {
    const listImg = require('../../images/groupAppartImg.png');
    const {groupMsgLists} = this.props;
    return (
      <div>
        <HeadNaviBar>科室</HeadNaviBar>
        <div className={styles.groutMsgList}>
          {
            groupMsgLists && groupMsgLists.length > 0 ?
              groupMsgLists.map((groupMsgList) => {
                return (
                  <div key={groupMsgList._id} className={'cardBgRadius clearfix ' + styles.groupMsgItem}>
                    <div className="clearfix">
                      <article className={styles.groupMsgItemLeft}>
                        <img src={listImg} alt="" />
                        <p></p>
                      </article>
                      <div className={styles.groupMsgItemRight}>
                        <header className="clearfix">
                          <h3 className="left">{groupMsgList.name}</h3>
                          <article className="right">{this.formatDate(groupMsgList.created)}发布</article>
                        </header>
                        <p>{this.formatDate(groupMsgList.updated)}</p>
                        <p>{this.formatTime(groupMsgList.contentId.start_time)}-{this.formatTime(groupMsgList.contentId.end_time)}&nbsp;&nbsp;{groupMsgList.type}</p>
                      </div>
                    </div>
                    <footer>
                      <div onClick={() => this.goDatePlanDetail(groupMsgList._id, groupMsgList.type)}><i className="fa fa-angle-left right"></i><span className="right">查看详情</span></div>
                    </footer>
                  </div>
                );
              })
            : <div className={'cardBgRadius clearfix ' + styles.groupMsgItem}>暂无内容</div>
          }
        </div>
        <div style={{display: this.props.user && this.props.user.roles && this.props.user.roles.indexOf('apartment') !== -1 ? 'block' : 'none'}}>
          <AddPlan
            groupAppartId = {this.props.routeParams.id} />
        </div>
      </div>
    );
  }
}


/**
 * component: add paln btn
 */
@connect(
  state => ({templates: state.schedules.templates}),
  {
    pushState: push,
    loadTemplates,
  }
)
class AddPlan extends Component {

  static propTypes = {
    loadTemplates: PropTypes.func,
    templates: PropTypes.object,
    pushState: PropTypes.func,
    groupAppartId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      hideModalFooter: true,
    };
  }

  componentDidMount() {
  }

  addPlan() {
    this.props.loadTemplates();
    this.setState({
      showModal: true,
    });
  }

  goTemplatePage(templateId) {
    this.props.pushState('/add-date-plan/' + templateId + '?groupAppartId=' + this.props.groupAppartId);
  }

  templateImgSrc(template) {
    let imgSrc;
    if (template.name === '查房') {
      imgSrc = chafang;
    } else if (template.name === '会议') {
      imgSrc = huiyi;
    } else if (template.name === '手术') {
      imgSrc = shoushu;
    } else {
      imgSrc = zidingyi;
    }
    return imgSrc;
  }

  clickHideModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    const templates = this.props.templates.result;
    return (
      <div>
        <div className="addBigBtn" onClick={this.addPlan.bind(this)}></div>
        <div style = {{display: this.state.showModal ? 'block' : 'none'}}>
          <Modal
              title = {'添加日程'}
              hideModalFooter = {this.state.hideModalFooter}
              clickHideModal = {this.clickHideModal.bind(this)}
            >
            {
              templates && templates.map((template) => {
                return (
                  <dl key={template._id} className={styles.templateBtn} onClick={() => this.goTemplatePage(template._id)}>
                    <dt><img src={this.templateImgSrc(template)} /></dt>
                    <dd>{template.name}</dd>
                  </dl>
                );
              })
            }
          </Modal>
        </div>
      </div>
    );
  }
}
