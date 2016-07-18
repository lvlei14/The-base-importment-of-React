import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import { HeadNaviBar, Modal } from '../../components';
import DayPicker, {DateUtils} from 'react-day-picker';
require('moment/locale/zh-cn');
import LocaleUtils from 'react-day-picker/moment';
import { loaddutys, sendChangeDutyApply, selectMyWantChangeDuty } from '../../redux/modules/duty';
import { showDiaglog } from '../../redux/modules/diaglog';

const styles = require('./Duty.scss');

@connect(
  state => ({...state}), {
    pushState: push,
  }
)
export default class Duty extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    routeParams: PropTypes.object,
  };

  goChangeDutyRecord() {
    this.props.pushState('/change-duty-record');
  }

  showDutyPage() {
    const {pageType} = this.props.routeParams;
    const dutyPage = {};
    if (pageType === 'self') {
      dutyPage.headBarCon = '我的值班';
      dutyPage.pageComponent = <SelfDutyPage />;
    } else if (pageType === 'appartment') {
      dutyPage.headBarCon = '全部科室值班';
      dutyPage.pageComponent = <ApartDutyPage />;
    } else if (pageType === 'change-duty-apply') {
      dutyPage.headBarCon = '换班申请';
      dutyPage.pageComponent = <ChangeDutyApplyPage />;
    }
    return dutyPage;
  }

  render() {
    const dutyPage = this.showDutyPage();
    return (
      <div className={'duty ' + styles.duty}>
        <HeadNaviBar>{dutyPage.headBarCon}</HeadNaviBar>
        <div className={'select clearfix bodyBgWhiteZindex ' + styles.selectMonth}>
          <article className={'clearfix left ' + styles.changeDutyRecord} onClick={this.goChangeDutyRecord.bind(this)}>
            <i className="left"></i>
            <span className="left">日志</span>
          </article>
        </div>
        <section>
          <p className="bodyBgWhite"></p>
          <div className={'bodyBgWhiteZindex ' + styles.dutyTop}>
            {dutyPage.pageComponent}
          </div>
        </section>
      </div>
    );
  }
}

/**
  *component: 我的值班页面
  */
@connect(
  state => ({...state.dutys}), {
    pushState: push,
    loaddutys,
    selectMyWantChangeDuty,
  }
)
class SelfDutyPage extends Component {
  static propTypes = {
    loaddutys: PropTypes.func,
    selectMyWantChangeDuty: PropTypes.func,
    dutys: PropTypes.object,
    user: PropTypes.object,
    pushState: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {selectedDay: new Date()};
  }

  componentDidMount() {
    this.props.loaddutys('uid', moment().format('M'), moment().format('YYYY'), '', 'self');
  }

  onMonthChange(_date) {
    this.props.loaddutys('uid', moment(_date).format('M'), moment(_date).format('YYYY'), '', 'self');
  }

  clickSelectDay(day) {
    this.setState({selectedDay: day});
  }

  goChangeDutyPage(dutyId) {
    const {selectedDay} = this.state;
    this.props.pushState('/duty/change-duty-apply');
    this.props.selectMyWantChangeDuty(selectedDay, dutyId);
  }

  goAppartPage() {
    this.props.pushState('/duty/appartment');
  }

  showSingleDayItem(singleDayDutys) {
    return (
      singleDayDutys && singleDayDutys.map((dutyDayItem) => {
        return (
          <div className={styles.dateDayConFa} key={dutyDayItem._id} onClick={() => this.goChangeDutyPage(dutyDayItem._id)}>
            <article className={styles.dateAppart} style={{paddingTop: '.16rem'}}>{dutyDayItem.apartment && dutyDayItem.apartment.name}</article>
            <i className={styles.dateSelf}></i>
          </div>
        );
      })
    );
  }

  renderDay(day) {
    const date = moment(day).format('D');
    const {dutys} = this.props;
    return (
      <div className={styles.dutyItem}>
        <span className={styles.dutyItemDay}>{date}</span>
        <div>
          {dutys && this.showSingleDayItem(dutys[date])}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <DayPicker className={styles.dutyPicker}
          selectedDays={day => DateUtils.isSameDay(this.state.selectedDay, day)}
          onDayClick={(event, day) => this.clickSelectDay(day)}
          renderDay={this.renderDay.bind(this)}
          onMonthChange={this.onMonthChange.bind(this)}
          localeUtils={LocaleUtils}
          locale="zh-cn" />
        <footer className={styles.dutyFooterBtn}>
          <button className="mainBtn" onClick={this.goAppartPage.bind(this)}>查看科室值班表</button>
          <p className="tip">功能提示：点击自己的值班日期，可以申请换班哦~</p>
        </footer>
      </div>
    );
  }
}

/**
  * component: 全部科室值班页面
  */
@connect(
  state => ({...state.dutys, user: state.auth.user}), {
    pushState: push,
    loaddutys,
    selectMyWantChangeDuty,
  }
)
class ApartDutyPage extends Component {
  static propTypes = {
    loaddutys: PropTypes.func,
    selectMyWantChangeDuty: PropTypes.func,
    dutys: PropTypes.object,
    user: PropTypes.object,
    pushState: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {selectedDay: new Date()};
  }

  componentDidMount() {
    this.props.loaddutys('uid', moment().format('M'), moment().format('YYYY'), '', 'appartment');
  }

  onMonthChange(_date) {
    this.props.loaddutys('uid', moment(_date).format('M'), moment(_date).format('YYYY'), '', 'self');
  }

  clickSelectDay(day) {
    this.setState({selectedDay: day});
  }

  goChangeDutyPage(dutyId) {
    this.props.pushState('/duty/change-duty-apply');
    this.props.selectMyWantChangeDuty(this.state.selectedDay, dutyId);
  }

  goAppartPage() {
    this.props.pushState('/duty/appartment');
  }

  // 根据级别显示不同的图标
  loadLevel(level) {
    let levelDiv;
    if (level === 1) {
      levelDiv = (<i className={styles.levelFir}></i>);
    } else if (level === 2) {
      levelDiv = (<i className={styles.levelSec}></i>);
    }else if (level === 3) {
      levelDiv = (<i className={styles.levelThr}></i>);
    }else if (level === 4) {
      levelDiv = (<i className={styles.levelFour}></i>);
    }
    return levelDiv;
  }

  // 展示每天每天数据
  showSingleDaySingDuty(singleDayDutys) {
    const uid = this.props.user && this.props.user._id;
    return (
      singleDayDutys && singleDayDutys.map((dutyDayItem) => {
        return (
          <div>
          {
            dutyDayItem.doctor._id !== uid ?
              <div className={styles.dateDayFa} key={dutyDayItem._id}>
                <article className={'clearfix ' + styles.dateAppart}>
                  {
                    this.loadLevel(dutyDayItem.doctorLevel.number)
                  }
                  <span className="left">{dutyDayItem.doctor && dutyDayItem.doctor.name}</span>
                </article>
              </div>
            :
              <div className={styles.dateDayFa} key={dutyDayItem._id}>
                <article>
                  <i className={styles.dateSelf}></i>
                  <p></p>
                </article>
              </div>
          }
          </div>
        );
      })
    );
  }

  // 展示每天的数据
  showSingleDayItem(singleDayDutys) {
    const uid = this.props.user && this.props.user._id;
    // 筛选当天数据中，我的值班
    const myDutyDays = singleDayDutys && singleDayDutys.filter((item) => item.doctor && item.doctor._id === uid);
    if (myDutyDays && myDutyDays.length > 0) {
      // 如果当天有我的值班，点击跳到换班申请页面，并把我的值班id传过去
      return (<div className={styles.dateDayConFa} style={{minHeight: '.68rem', paddingTop: '.32rem'}} onClick={() => this.goChangeDutyPage(myDutyDays._id)}>
        {this.showSingleDaySingDuty(singleDayDutys)}
      </div>);
    } else if (myDutyDays && myDutyDays.length === 0) {
      return (<div className={styles.dateDayConFa} style={{minHeight: '.68rem', paddingTop: '.32rem'}}>
        {this.showSingleDaySingDuty(singleDayDutys)}
      </div>);
    }
  }

  renderDay(day) {
    const date = moment(day).format('D');
    const {dutys} = this.props;
    return (
      <div className={styles.dutyItem + ' ' + styles.appItem}>
        <span className={styles.dutyItemDay}>{date}</span>
        <div>
          {dutys && this.showSingleDayItem(dutys[date])}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <DayPicker className={styles.dutyPicker}
          selectedDays={day => DateUtils.isSameDay(this.state.selectedDay, day)}
          onDayClick={(event, day) => this.clickSelectDay(day)}
          renderDay={this.renderDay.bind(this)}
          onMonthChange={this.onMonthChange.bind(this)}
          localeUtils={LocaleUtils}
          locale="zh-cn" />
        <footer className={styles.dutyFooterBtn}>
          <p className="tip">功能提示：点击自己的值班日期，可以申请换班哦~</p>
        </footer>
      </div>
    );
  }
}

/**
  *
  */
@connect(
  state => ({...state.dutys, user: state.auth.user}), {
    pushState: push,
    loaddutys,
    sendChangeDutyApply,
    showDiaglog,
  }
)
class ChangeDutyApplyPage extends Component {
  static propTypes = {
    loaddutys: PropTypes.func,
    sendChangeDutyApply: PropTypes.func,
    dutys: PropTypes.object,
    user: PropTypes.object,
    pushState: PropTypes.func,
    mySeletedDuty: PropTypes.object,
    sendIsSuccessMeg: PropTypes.string,
    showDiaglog: PropTypes.func,
    errorMeg: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: new Date(),
      showModal: false,
      selectedChangeDuty: {
        doctor: {},
        dutyId: '',
      },
    };
  }

  componentDidMount() {
    this.props.loaddutys('uid', moment().format('M'), moment().format('YYYY'), '01', 'appartment');
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.sendIsSuccessMeg && nextProps.sendIsSuccessMeg) {
      this.props.showDiaglog(nextProps.sendIsSuccessMeg, '/change-duty-record');
    } else if (!this.props.errorMeg && nextProps.errorMeg) {
      this.props.showDiaglog(nextProps.errorMeg, '/duty/change-duty-apply');
    }
  }

  // 切换月份
  onMonthChange(_date) {
    this.props.loaddutys('uid', moment(_date).format('M'), moment(_date).format('YYYY'), '', 'self');
  }

  // 日历点击某天
  clickSelectDay(day) {
    this.setState({selectedDay: day});
  }

  // 发送换班申请请求
  sendChangeDutyApply() {
    this.setState({
      showModal: false
    });
    const {mySeletedDuty} = this.props;
    const {selectedChangeDuty} = this.state;
    this.props.sendChangeDutyApply('uid', mySeletedDuty.id, selectedChangeDuty.dutyId, selectedChangeDuty.doctor._id);
  }

  clickShowModal() {
    const {selectedChangeDuty} = this.state;
    if (!selectedChangeDuty.dutyId) {
      this.props.showDiaglog('请选择想要交换的日期！');
      return;
    }
    this.setState({showModal: true});
  }

  clickHideModal() {this.setState({showModal: false});}

  // 选择交换日期
  selectChangeDuty(dutyId, dutyDoctor) {
    this.setState({
      selectedChangeDuty: {...this.state.selectedChangeDuty, dutyId: dutyId, doctor: dutyDoctor}
    });
  }

  // 根据级别显示不同的图标
  loadLevel(level) {
    let levelDiv;
    if (level === 1) {
      levelDiv = (<i className={styles.levelFir}></i>);
    } else if (level === 2) {
      levelDiv = (<i className={styles.levelSec}></i>);
    }else if (level === 3) {
      levelDiv = (<i className={styles.levelThr}></i>);
    }else if (level === 4) {
      levelDiv = (<i className={styles.levelFour}></i>);
    }
    return levelDiv;
  }

  showSingleDayItem(singleDayDutys) {
    const uid = this.props.user && this.props.user._id;
    return (
      singleDayDutys && singleDayDutys.map((dutyDayItem) => {
        return (
          <div key={dutyDayItem._id}>
          {
            dutyDayItem.doctor._id !== uid ?
              <div className={styles.dateDayFa} onClick={() => this.selectChangeDuty(dutyDayItem._id, dutyDayItem.doctor)}>
                <article className={'clearfix ' + styles.dateAppart}>
                  {
                    this.loadLevel(dutyDayItem.doctorLevel.number)
                  }
                  <span className="left">{dutyDayItem.doctor && dutyDayItem.doctor.name}</span>
                </article>
              </div>
            :
              <div className={styles.dateDayFa} onClick={(event) => event.stopPropagation()}>
                <article>
                  <i className={styles.dateSelf}></i>
                  <p className = {styles.selfDayBg}></p>
                </article>
              </div>
          }
          </div>
        );
      })
    );
  }

  renderDay(day) {
    const date = moment(day).format('D');
    const {dutys} = this.props;
    return (
      <div className={styles.dutyItem}>
        <span className={styles.dutyItemDay}>{date}</span>
        <div className={styles.dateDayConFa}>
          {dutys && this.showSingleDayItem(dutys[date])}
        </div>
      </div>
    );
  }
  render() {
    const {mySeletedDuty} = this.props;
    const {selectedDay, selectedChangeDuty} = this.state;
    return (
      <div>
        <DayPicker className={styles.dutyPicker}
          selectedDays={day => DateUtils.isSameDay(this.state.selectedDay, day)}
          onDayClick={(event, day) => this.clickSelectDay(day)}
          renderDay={this.renderDay.bind(this)}
          onMonthChange={this.onMonthChange.bind(this)}
          localeUtils={LocaleUtils}
          locale="zh-cn" />
        <footer className={styles.dutyFooterBtn}>
          <button className="mainBtn" onClick={this.clickShowModal.bind(this)}>交换</button>
          <p className="tip">功能提示：点击想要交换的值班日期，可以申请换班哦~</p>
        </footer>
        <div style={{display: this.state.showModal ? 'block' : 'none'}}>
          <Modal
            title = {'换班申请'}
            clickHideModal = {this.clickHideModal.bind(this)}
            clickConfirm = {this.sendChangeDutyApply.bind(this)}
            clickCancel = {this.clickHideModal.bind(this)}>
            您 <i className={styles.dutyJzFColor}>{mySeletedDuty && moment(mySeletedDuty.date).format('YYYY-MM-DD')}</i> 确定要与
                 <i className={styles.dutyJzFColor}>{selectedChangeDuty.doctor && selectedChangeDuty.doctor.name}{moment(selectedDay).format('YYYY-MM-DD')}</i>
                 进行换班吗？
          </Modal>
        </div>
      </div>
    );
  }
}
