import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import Modal from '../../components/Modal/Modal';
import DayPicker, {DateUtils} from 'react-day-picker';
require('moment/locale/zh-cn');
import LocaleUtils from 'react-day-picker/moment';
import { loaddutys } from '../../redux/modules/duty';
import { sendChangeDutyRequest } from '../../redux/modules/duty';
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
    user: PropTypes.object,
    routeParams: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  goChangeDutyRecord() {
    this.props.pushState('/change-duty-record');
  }

  showHeadBarCon() {
    const {pageType} = this.props.routeParams;
    let headBarCon;
    if (pageType === 'self') {
      headBarCon = '我的值班';
    } else if (pageType === 'appartment') {
      headBarCon = '全部科室值班';
    } else if (pageType === 'appart-level') {
      headBarCon = '换班申请';
    }
    return headBarCon;
  }

  render() {
    const {pageType} = this.props.routeParams;
    return (
      <div className={'duty ' + styles.duty}>
        <HeadNaviBar>{this.showHeadBarCon()}</HeadNaviBar>
        <div className={'select clearfix bodyBgWhiteZindex ' + styles.selectMonth}>
          <article className={'clearfix left ' + styles.changeDutyRecord} onClick={this.goChangeDutyRecord.bind(this)}>
            <i className="left"></i>
            <span className="left">日志</span>
          </article>
        </div>
        <section>
          <p className="bodyBgWhite"></p>
          <div className={'bodyBgWhiteZindex ' + styles.dutyTop}>
            <Calendar
              pageType = {pageType} />
          </div>
        </section>
      </div>
    );
  }
}

/**
  *component: duty three page content
  */
@connect(
  state => ({...state.dutys, user: state.auth.user}), {
    pushState: push,
    loaddutys,
    sendChangeDutyRequest,
    showDiaglog,
  }
)
class Calendar extends Component {
  static propTypes = {
    loaddutys: PropTypes.func,
    user: PropTypes.object,
    dutys: PropTypes.object,
    sendChangeDutyRequest: PropTypes.func,
    pageType: PropTypes.string,
    pushState: PropTypes.func,
    showDiaglog: PropTypes.func,
    sendIsSuccessMeg: PropTypes.string,
    errorMeg: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectDay: '',
      selNoFormatDay: '',
      selChaPageDay: '',
      selRealChaDate: '',
      selectedYear: (new Date()).getFullYear(),
      selectedMonth: (new Date()).getMonth() + 1,
      selChaDutyId: '',
      mySelChaDutyId: '',
      showModal: false,
      selDoctor: {
        _id: '',
        name: '',
      }
    };
  }

  componentDidMount() {
    console.log('用户信息');
    console.log(this.props.user);
    this.loadMonthDutysBypage(this.state.selectedMonth, this.state.selectedYear);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.sendIsSuccessMeg && nextProps.sendIsSuccessMeg) {
      this.props.showDiaglog(nextProps.sendIsSuccessMeg, '/change-duty-record');
    } else if (!this.props.errorMeg && nextProps.errorMeg) {
      this.props.showDiaglog(nextProps.errorMeg, '/duty/appart-level');
    }
  }

  onMonthChange(_date) {
    this.loadMonthDutysBypage(moment(_date).format('M'), moment(_date).format('YYYY'));
  }

  // 判断当前页面哪个页面，调不同的接口
  loadMonthDutysBypage(month, year) {
    const {pageType} = this.props;
    let level;
    let type;
    if (pageType === 'self') {
      level = '';
      type = 'self';
    } else if (pageType === 'appartment') {
      level = '';
      type = 'appartment';
    } else if (pageType === 'appart-level') {
      level = '01';
      type = 'appartment';
    }
    this.props.loaddutys('00203', month, year, level, type);
  }

  clickSelectDay(day) {
    this.setState({
      selNoFormatDay: day,
    });
    const {pageType} = this.props;
    const date = new Date(day);
    const datetow = date.toISOString().substring(0, 10);
    if (pageType === 'appart-level') {
      this.setState({
        selChaPageDay: datetow,
      });
    } else {
      this.setState({
        selectDay: datetow,
      });
    }
  }

  // send request
  sendChangeDutyRequest() {
    this.setState({
      showModal: false
    });
    const uid = this.props.user && this.props.user._id;
    const {mySelChaDutyId, selChaDutyId, selDoctor} = this.state;
    this.props.sendChangeDutyRequest(uid, mySelChaDutyId, selChaDutyId, selDoctor._id);
  }

  clickShowModal() {
    const uid = this.props.user && this.props.user._id;
    const {selChaDutyId, selDoctor, selRealChaDate, selChaPageDay} = this.state;
    if (selDoctor._id === uid) {
      this.props.showDiaglog('不可与已有自己值班的日期进行交换');
      return;
    }
    if (!selChaDutyId || selChaPageDay !== selRealChaDate) {  // 后面条件：防止用户当前选择的是没有数据的日期，因为点击没有数据的日期selChaDutyId不会更新
      this.props.showDiaglog('请选择想要交换的日期！');
      return;
    }
    this.setState({
      showModal: true,
    });
  }

  changeSelChDutyId(changeId, selDoctor, selRealChaDate) {
    this.setState({
      selChaDutyId: changeId,
      selDoctor: selDoctor,
      selRealChaDate: selRealChaDate,
    });
  }

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

  appLevelDayItem(dutyDayItem) {
    const uid = this.props.user && this.props.user._id;
    return (
      <div>
      {
        dutyDayItem.doctor._id !== uid ?
          <div className={styles.dateDayFa} key={dutyDayItem._id} onClick={() => this.changeSelChDutyId(dutyDayItem._id, dutyDayItem.doctor, dutyDayItem.date)}>
            <article className={'clearfix ' + styles.dateAppart}>
              {
                this.loadLevel(dutyDayItem.doctorLevel.number)
              }
              <span className="left">{dutyDayItem.doctor && dutyDayItem.doctor.name}</span>
            </article>
          </div>
        :
          <div className={styles.dateDayFa} key={dutyDayItem._id} onClick={(event) => event.stopPropagation()}>
            <article>
              <i className={styles.dateSelf}></i>
              <p className = {styles.selfDayBg}></p>
            </article>
          </div>
      }
      </div>
    );
  }

  appartDayItem(dutyDayItem) {
    const uid = this.props.user && this.props.user._id;
    return (
      <div onClick={() => this.goChangeDuty(dutyDayItem._id)}>
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
              <p className = {styles.selfDayBg}></p>
            </article>
          </div>
      }
      </div>
    );
  }

  goChangeDuty(myDutyId) {
    console.log('将要跳转换班申请');
    this.setState({
      mySelChaDutyId: myDutyId
    });
    this.props.pushState('/duty/appart-level');
    const level = '01';
    const type = 'appartment';
    this.props.loaddutys('00203', this.state.selectedMonth, this.state.selectedYear, level, type);
  }

  goAppartPage() {
    this.props.pushState('/duty/appartment');
    const level = '';
    const type = 'appartment';
    this.props.loaddutys('00203', this.state.selectedMonth, this.state.selectedYear, level, type);
  }

  selfDayItem(dutyDayItem) {
    return (
      <div className={styles.dateDayFa} key={dutyDayItem._id} onClick={() => this.goChangeDuty(dutyDayItem._id)}>
        <article className={styles.dateAppart}>{dutyDayItem.apartment && dutyDayItem.apartment.name}</article>
        <i className={styles.dateSelf}></i>
      </div>
    );
  }

  noInforDutyDay() {
    return (
      <div onClick={(event) => {event.stopPropagation(); console.log('clicked');}}>00</div>
    );
  }

  showSingleDayItem(dutyDay) {
    const pageType = this.props.pageType;
    // const uid = this.props.user && this.props.user._id;
    // const appartmentMyDutyNum = [];
    // if (pageType === 'appartment') {
    //   appartmentMyDutyNum = dutyDay && dutyDay.filter((item) => item.doctor._id === uid);
    // }
    let DayItem;
    return (
      dutyDay && dutyDay.map((dutyDayItem) => {
        if (pageType === 'self') {
          DayItem = this.selfDayItem(dutyDayItem);
        } else if (pageType === 'appartment') {
          DayItem = this.appartDayItem(dutyDayItem);
        } else {
          DayItem = this.appLevelDayItem(dutyDayItem);
        }
        return DayItem;
      })
    );
  }
  clickHideModal() {
    this.setState({
      showModal: false
    });
  }

  renderDay(day) {
    const date = day.getDate().toString();
    const dutys = this.props.dutys;
    const pageType = this.props.pageType;
    return (
      <div className={pageType === 'appartment' ? styles.appItem + ' ' + styles.dutyItem : styles.dutyItem}>
        <span className={styles.dutyItemDay}>{date}</span>
        <div>
          {dutys && this.showSingleDayItem(dutys[date])}
        </div>
      </div>
    );
  }

  render() {
    console.log('我选择的日期');
    console.log(this.state.selectDay);
    return (
      <div>
        <div className={styles.dutyPicker}>
          <DayPicker
            selectedDays={day => DateUtils.isSameDay(this.state.selNoFormatDay, day)}
            onDayClick={(event, day) => this.clickSelectDay(day)}
            renderDay={this.renderDay.bind(this)}
            onMonthChange={this.onMonthChange.bind(this)}
            localeUtils={LocaleUtils}
            locale="zh-cn" />
        </div>
        <footer className={styles.dutyFooterBtn} style={{display: this.props.pageType === 'appart-level' ? 'block' : 'none'}}>
          <button className="mainBtn" onClick={this.clickShowModal.bind(this)}>交换</button>
          <p className="tip">功能提示：点击想要交换的值班日期，可以申请换班哦~</p>
        </footer>
        <footer className={styles.dutyFooterBtn}>
          <button style={{display: this.props.pageType === 'self' ? 'block' : 'none'}} className="mainBtn" onClick={this.goAppartPage.bind(this)}>查看科室值班表</button>
          <p style={{display: this.props.pageType !== 'appart-level' ? 'block' : 'none'}} className="tip">功能提示：点击自己的值班日期，可以申请换班哦~</p>
        </footer>
        <div style={{display: this.state.showModal ? 'block' : 'none'}}>
          <Modal
            title = {'换班申请'}
            clickHideModal = {this.clickHideModal.bind(this)}
            clickConfirm = {this.sendChangeDutyRequest.bind(this)}
            clickCancel = {this.clickHideModal.bind(this)}>
            您 <i className={styles.dutyJzFColor}>{this.state.selectDay}</i> 确定要与
                 <i className={styles.dutyJzFColor}>{this.state.selDoctor && this.state.selDoctor.name}{this.state.selRealChaDate}</i>
                 进行换班吗？
          </Modal>
        </div>
      </div>
    );
  }
}

