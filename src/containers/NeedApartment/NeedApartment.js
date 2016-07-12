import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { HeadNaviBar, Modal, Loading } from '../../components';
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
    loading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalTabIndex: null,
      tabIndex: 0,
    };
  }

  componentDidMount() {
    this.props.loadNeedAppartLists();
    localStorage.removeItem('doctors'); // 防止用户，点击再次邀请后，但又返回列表页，直接点添加
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.changeNeedAppartStatusSuccess && nextProps.changeNeedAppartStatusSuccess) {
      this.props.showDiaglog(nextProps.successMsg, '/appart-my-need');
      this.props.loadNeedAppartLists();
      localStorage.setItem('needAppartTab', 2);
    }
  }

  changeTab(index) {
    this.setState({tabIndex: index});
    localStorage.removeItem('addNeedApartTab');
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

  showListItemBtn(list) {
    const tabIndexString = localStorage.getItem('addNeedApartTab') || localStorage.getItem('needAppartTab');
    let listBtn;
    if (tabIndexString === '0') {
      listBtn = (<button onClick={() => this.clickShowModal(list, 0)} className="cancelBtn">取消</button>);
    } else if (tabIndexString === '1') {
      listBtn = (
        <div>
          <button onClick={() => this.clickShowModal(list, 1)} className="cancelBtn" style={{marginRight: '10px'}}>结束</button>
          <button className="mainXsBtn"><a href="tel:15701609247">拨打电话</a></button>
        </div>
        );
    } else if (tabIndexString === '2') {
      listBtn = (
        <div>
          <button className="cancelBtn" onClick={() => this.clickGoToAddNeed(list.doctors)} style={{marginRight: '10px'}}>再次邀请</button>
          {
            list && list.comment ?
              <button className="mainXsBtn" style={{color: '#fff', background: '#b4b4b4'}}>已评价</button>
            : list.operation === '结束' ?
              <button className="mainXsBtn" onClick={() => this.clickGoToComment(list._id)}>去评价</button>
              : ''
          }
        </div>
      );
    }
    return listBtn;
  }

  needLists(lists) {
    let needLists;
    if (lists && lists.length === 0) {
      needLists = (<div className="noResult">暂无内容</div>);
    } else {
      needLists = lists && lists.map((list) => {
        return (
          <div key={list._id} className={'topCardBg clearfix ' + styles.needApartListCon}>
            <div className="list" onClick={() => this.goNeedAppartDetail(list)}>
              <section className="left">
                <header className={styles.listHeader}>
                {
                  list.doctors && list.doctors.map((doctor) => {
                    return (<span key={doctor._id}>{doctor && doctor.name}<i>、</i></span>);
                  })
                }
                </header>
                <p>医疗类别：{list.medicalCategory}</p>
                <p>需求时间：{list.start_time}</p>
              </section>
              <article className="listNextIcon right"><i className="fa fa-angle-right"></i></article>
            </div>
            <footer>
              {this.showListItemBtn(list)}
            </footer>
          </div>
        );
      });
    }
    return needLists;
  }

  render() {
    const {receptionWait, reception, completed} = this.props.needAppartLists || {};
    const tabIndexString = localStorage.getItem('addNeedApartTab') || localStorage.getItem('needAppartTab');
    const needAppartTabIndex = parseInt(tabIndexString, 10);
    return (
      <div className={styles.needAppart}>
        <HeadNaviBar>我的需求</HeadNaviBar>
        <Loading showLoading={this.props.loading} />
        <Tabs className="tabs" onSelect={this.changeTab.bind(this)} selectedIndex={needAppartTabIndex}>
          <TabList style={{marginBottom: 0}} className="tabList tabList3" activeTabClassName="tabListOn">
            <Tab>待接受({receptionWait && receptionWait.length || 0}条)</Tab>
            <Tab>已接受({reception && reception.length || 0}条)</Tab>
            <Tab>已完成</Tab>
          </TabList>

          <TabPanel>
            {
              this.needLists(receptionWait)
            }
          </TabPanel>
          <TabPanel>
            {
              this.needLists(reception)
            }
          </TabPanel>
          <TabPanel>
            {
              this.needLists(completed)
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
