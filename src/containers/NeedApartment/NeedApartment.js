import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Modal from '../../components/Modal/Modal';
import { showDiaglog } from '../../redux/modules/diaglog';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { loadNeedAppartLists, changeNeedAppartStatus } from '../../redux/modules/invitation';

const styles = require('./NeedApartment.scss');
let cancelNeedItem;

@connect(
  state => ({...state.invitation}), {
    pushState: push,
    loadNeedAppartLists,
    changeNeedAppartStatus,
    showDiaglog
  }
)
export default class NeedApartment extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadNeedAppartLists: PropTypes.func,
    needAppartLists: PropTypes.object,
    changeNeedAppartStatus: PropTypes.func,
    changeNeedAppartStatusSuccess: PropTypes.bool,
    showDiaglog: PropTypes.func,
    successMsg: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalTabIndex: null,
    };
  }

  componentDidMount() {
    this.props.loadNeedAppartLists();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.changeNeedAppartStatusSuccess && nextProps.changeNeedAppartStatusSuccess) {
      this.props.showDiaglog(nextProps.successMsg, '/appart-my-need');
      this.props.loadNeedAppartLists();
      localStorage.setItem('needAppartTab', 2);
    }
  }

  changeTab(index) {
    localStorage.removeItem('addNeedApartTab');
    localStorage.setItem('needAppartTab', index); // changeTab 不接受setState方法。所以，不能把下面的按钮写在一个组件上
  }

  goAddAppartNeed() {
    this.props.pushState('/add-appart-need');
  }

  clickHideModal() {
    this.setState({
      showModal: false
    });
  }

  clickShowModal(item, modalTabIndex) {
    cancelNeedItem = item;
    this.setState({
      showModal: true,
      modalTabIndex: modalTabIndex
    });
  }

  clickGoToComment(id) {
    this.props.pushState('/rate/' + id);
  }

  clickConfirm() {
    let cancelNeedText = '';
    let operation = '结束';
    if (this.state.modalTabIndex === 0) {
      operation = '取消';
      cancelNeedText = this.refs.cancelNeedText.value;
    }
    this.props.changeNeedAppartStatus(cancelNeedItem._id, operation, cancelNeedText, cancelNeedItem.status);
    this.clickHideModal();
  }

  goNeedAppartDetail(item) {
    this.props.pushState('/appart-need-detail/' + item._id + '?status=' + item.status);
  }

  clickGoToAddNeed(doctors) {
    localStorage.setItem('doctors', JSON.stringify(doctors));
    this.props.pushState('/add-appart-need');
  }

  needListItem(item) {
    return (
      <div className="list" onClick={() => this.goNeedAppartDetail(item)}>
        <section className="left">
          <header className={styles.listHeader}>
          {
            item.doctors && item.doctors.map((doctor) => {
              return (<span key={doctor._id}>{doctor && doctor.name}<i>、</i></span>);
            })
          }
          </header>
          <p>医疗类别：{item.medicalCategory}</p>
          <p>需求时间：{item.start_time}</p>
        </section>
        <article className="listNextIcon right"><i className="fa fa-angle-right"></i></article>
      </div>
    );
  }

  render() {
    const {receptionWait, reception, completed} = this.props.needAppartLists || {};
    const needAppartTabIndex = parseInt(localStorage.getItem('addNeedApartTab'), 10) || parseInt(localStorage.getItem('needAppartTab'), 10);
    console.log(parseInt(localStorage.getItem('addNeedApartTab'), 10));
    console.log(needAppartTabIndex);
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
                  <div key={receptionWaitItem._id} className={'topCardBg clearfix ' + styles.needApartListCon}>
                    {
                      this.needListItem(receptionWaitItem)
                    }
                    <footer>
                      <button onClick={() => this.clickShowModal(receptionWaitItem, 0)} className="cancelBtn">取消</button>
                    </footer>
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
                    {
                      this.needListItem(receptionItem)
                    }
                    <footer>
                      <button onClick={() => this.clickShowModal(receptionItem, 1)} className="cancelBtn" style={{marginRight: '10px'}}>结束</button>
                      <button className="mainXsBtn"><a href="tel:15701609247">拨打电话</a></button>
                    </footer>
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
                    {
                      this.needListItem(completedItem)
                    }
                    <footer>
                      <button className="cancelBtn" onClick={() => this.clickGoToAddNeed(completedItem.doctors)} style={{marginRight: '10px'}}>再次邀请</button>
                      {
                        completedItem && completedItem.comment ?
                          <div className="mainXsBtn" style={{color: '#fff', background: '#b4b4b4'}}>已评价</div>
                        : completedItem.operation === '结束' ?
                          <button className="mainXsBtn" onClick={() => this.clickGoToComment(completedItem._id)}>去评价</button>
                          : ''
                      }
                    </footer>
                  </div>
                );
              })
            }
          </TabPanel>
        </Tabs>
        <div className="addBigBtn" onClick={this.goAddAppartNeed.bind(this)}></div>
        <div style={{display: this.state.showModal ? 'block' : 'none'}}>
          <Modal
            title = {this.state.modalTabIndex === 0 ? '取消需求' : '结束需求'}
            clickHideModal = {this.clickHideModal.bind(this)}
            clickConfirm = {this.clickConfirm.bind(this)}
            clickCancel = {this.clickHideModal.bind(this)}>
            {
              this.state.modalTabIndex === 0 ?
                <textarea className={styles.cancelNeedText} ref="cancelNeedText" placeholder="请输入内容"></textarea>
              : <div>您确定要取消此需求吗？</div>
            }
          </Modal>
        </div>
      </div>
    );
  }
}
