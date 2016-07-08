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
    // changeTab 不接受setState方法。所以，不能把下面的按钮写在一个组件上
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

  clickShowModal(item, modalTabIndex) {
    cancelNeedItem = item;
    this.setState({
      showModal: true,
      modalTabIndex: modalTabIndex
    });
  }

  clickGoToComment(id) {
    console.log(id);
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
    this.props.pushState('/appart-need-detail/' + item._id + '?status=' + item.status + '?operation=' + item.operation);
  }

  needListItem(item) {
    return (
      <section onClick={() => this.goNeedAppartDetail(item)}>
        <header>
        {
          item.doctors && item.doctors.map((doctor) => {
            return (<span>{doctor && doctor.name}、</span>);
          })
        }
        </header>
        <p>医疗类别：{item.medicalCategory}</p>
        <p>需求时间：{item.start_time}</p>
      </section>
    );
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
                      {
                        this.needListItem(receptionWaitItem)
                      }
                      <footer style={{marginTop: '16px'}}>
                        <button onClick={() => this.clickShowModal(receptionWaitItem, 0)} className="cancelBtn">取消</button>
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
                      {
                        this.needListItem(receptionItem)
                      }
                      <footer style={{marginTop: '16px'}}>
                        <button onClick={() => this.clickShowModal(receptionItem, 1)} className="cancelBtn" style={{marginRight: '10px'}}>结束</button>
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
                      {
                        this.needListItem(completedItem)
                      }
                      <footer style={{marginTop: '16px'}}>
                        <button className="cancelBtn" style={{marginRight: '10px'}}>再次邀请</button>
                        {
                          completedItem.operation === '结束' ? <button className="mainXsBtn" onClick={() => this.clickGoToComment(completedItem._id)}>去评价</button> : ''
                        }
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
