import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Modal from '../../components/Modal/Modal';
import { showDiaglog } from '../../redux/modules/diaglog';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { loadNeedAppartLists, cancelAppartNeed } from '../../redux/modules/needAppartList';

const styles = require('./NeedApartment.scss');
let cancelNeedId;

@connect(
  state => ({...state.needAppartLists}), {
    pushState: push,
    loadNeedAppartLists,
    cancelAppartNeed,
    showDiaglog
  }
)
export default class NeedApartment extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadNeedAppartLists: PropTypes.func,
    needAppartLists: PropTypes.object,
    cancelAppartNeed: PropTypes.func,
    cancelNeedAppartSuccess: PropTypes.bool,
    showDiaglog: PropTypes.func,
    successMsg: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    this.props.loadNeedAppartLists();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.cancelNeedAppartSuccess && nextProps.cancelNeedAppartSuccess) {
      this.props.showDiaglog(nextProps.successMsg, '/appart-my-need');
      this.props.loadNeedAppartLists();
      localStorage.setItem('needAppartTab', 2);
    }
  }

  changeTab(index) {
    localStorage.setItem('needAppartTab', index);
  }

  goAddAppartNeed() {
    this.props.pushState('/add-appart-need');
  }

  clickHideModal() {
    this.setState({
      showModal: false
    });
  }

  clickShowModal(id) {
    cancelNeedId = id;
    this.setState({
      showModal: true
    });
  }

  clickConfirm() {
    const cancelNeedText = this.refs.cancelNeedText.value;
    const operation = '取消';
    this.props.cancelAppartNeed(cancelNeedId, operation, cancelNeedText);
    this.clickHideModal();
  }

  render() {
    const {receptionWait, reception, completed} = this.props.needAppartLists || {};
    const needAppartTabIndex = parseInt(localStorage.getItem('needAppartTab'), 10);
    return (
      <div className={styles.needAppart}>
        <HeadNaviBar>我的需求</HeadNaviBar>
        <Tabs className="tabs" onSelect={this.changeTab} selectedIndex={needAppartTabIndex}>
          <TabList style={{marginBottom: 0}} className="tabList tabList3" activeTabClassName="tabListOn">
            <Tab>待接受({receptionWait && receptionWait.length}条)</Tab>
            <Tab>已接受({reception && reception.length}条)</Tab>
            <Tab>已完成</Tab>
          </TabList>

          <TabPanel>
            {
              receptionWait && receptionWait.map((receptionWaitItem) => {
                return (
                  <div key={receptionWaitItem._id} className={'topCardBg list clearfix ' + styles.needApartListCon}>
                    <div className="left">
                      <header>
                      {
                        receptionWaitItem.doctors && receptionWaitItem.doctors.map((doctor) => {
                          return (<span>{doctor.name}、</span>);
                        })
                      }
                      </header>
                      <p>医疗类别：{receptionWaitItem.medicalCategory}</p>
                      <p>需求时间：{receptionWaitItem.start_time}</p>
                      <footer style={{marginTop: '16px'}}>
                        <button onClick={() => this.clickShowModal(receptionWaitItem._id)} className="cancelBtn">取消</button>
                      </footer>
                    </div>
                    <article className="listNextIcon right"><i className="fa fa-angle-right"></i></article>
                  </div>
                );
              })
            }
          </TabPanel>
          <TabPanel>
            {
              reception && reception.map((receptionItem) => {
                return (
                  <div key={receptionItem._id} className={'topCardBg list clearfix ' + styles.needApartListCon}>
                    <div className="left">
                      <header>
                      {
                        receptionItem.doctors && receptionItem.doctors.map((doctor) => {
                          return (<span>{doctor.name}、</span>);
                        })
                      }
                      </header>
                      <p>医疗类别：{receptionItem.medicalCategory}</p>
                      <p>需求时间：{receptionItem.start_time}</p>
                      <p>医疗类别：{receptionItem.medicalCategory}</p>
                      <p>需求时间：{receptionItem.start_time}</p>
                      <footer style={{marginTop: '16px'}}>
                        <button className="cancelBtn">结束</button>
                        <button className="mainXsBtn">拨打电话</button>
                      </footer>
                    </div>
                    <article className="listNextIcon right"><i className="fa fa-angle-right"></i></article>
                  </div>
                );
              })
            }
          </TabPanel>
          <TabPanel>
            {
              completed && completed.map((completedItem) => {
                return (
                  <div key={completedItem._id} className={'topCardBg list clearfix ' + styles.needApartListCon}>
                    <div className="left">
                      <header>
                      {
                        completedItem.doctors && completedItem.doctors.map((doctor) => {
                          return (<span>{doctor.name}、</span>);
                        })
                      }
                      </header>
                      <p>医疗类别：{completedItem.medicalCategory}</p>
                      <p>需求时间：{completedItem.start_time}</p>
                      <p>医疗类别：{completedItem.medicalCategory}</p>
                      <p>需求时间：{completedItem.start_time}</p>
                      <footer style={{marginTop: '16px'}}>
                        <button className="cancelBtn">再次邀请</button>
                        <button className="mainXsBtn">去评价</button>
                      </footer>
                    </div>
                    <article className="listNextIcon right"><i className="fa fa-angle-right"></i></article>
                  </div>
                );
              })
            }
          </TabPanel>
        </Tabs>
        <div className="addBigBtn" onClick={this.goAddAppartNeed.bind(this)}></div>
        <div style={{display: this.state.showModal ? 'block' : 'none'}}>
          <Modal
            title = {"取消需求"}
            clickHideModal = {this.clickHideModal.bind(this)}
            clickConfirm = {this.clickConfirm.bind(this)}
            clickCancel = {this.clickHideModal.bind(this)}>
            <textarea ref="cancelNeedText" placeholder="请输入内容"></textarea>
          </Modal>
        </div>
      </div>
    );
  }
}

