import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DayPicker from 'react-day-picker';
require('moment/locale/zh-cn');
import LocaleUtils from 'react-day-picker/moment';

import { loadSurgeryByDateAndRoom } from '../../redux/modules/surgery';
const styles = require('./Opera.scss');
@connect(
  state => ({surgeries: state.surgery.roomFormatedSurgeries,
    user: state.auth.user}), {
      pushState: push,
      loadSurgeryByDateAndRoom
    }
)
export default class Opera extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadSurgeryByDateAndRoom: PropTypes.func,
    surgeries: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectDay: this.formatDate(new Date()),
      showDayPicker: false,
    };
  }

  componentDidMount() {
    this.props.loadSurgeryByDateAndRoom(this.formatDate(new Date()));
  }

  formatDate(date) {
    const seperator1 = '-';
    const year = date.getFullYear();
    const _month = date.getMonth() + 1;
    const month = _month < 10 ? '0' + _month : _month;
    const _day = date.getDate();
    const day = _day < 10 ? '0' + _day : _day;
    const currentdate = year + seperator1 + month + seperator1 + day;
    return currentdate;
  }

  goOperaPatient() {
    this.props.pushState('/opera-patient');
  }

  clickToggleList(id) {
    const curId = this.state[id];
    this.setState({
      [id]: !curId
    });
  }

  clickShowDayPicker() {
    this.setState({
      showDayPicker: !this.state.showDayPicker,
    });
  }

  goAddSurgery() {
    this.props.pushState('/patient-have-bed-list');
  }

  clickSelectDay(day) {
    const date = new Date(day);
    const datetow = this.formatDate(date);
    this.setState({
      showDayPicker: false,
      selectDay: datetow,
    });
    this.props.loadSurgeryByDateAndRoom(datetow);
  }

  goSurgeryDetail(id) {
    this.props.pushState(`surgery/${id}`);
  }

  render() {
    const {surgeries} = this.props;
    return (
      <div>
        <HeadNaviBar>心外科手术安排</HeadNaviBar>
        <div className={styles.opera}>
          <header className={'clearfix topCardBg ' + styles.operaHeader}>
            <div className="left clearfix" style={{padding: '0 .14rem'}} onClick={this.clickShowDayPicker.bind(this)}>
              <span className="left">{this.state.selectDay}</span>
              <p className={this.state.showDayPicker ? 'left ' + styles.operaSanjiaoOn : 'left ' + styles.operaSanjiao}></p>
            </div>
            <div className={this.state.showDayPicker ? styles.operaPickerShow + ' ' + styles.operaPicker : styles.operaPicker}>
              <section className="bodyBgWhiteZindex">
                <DayPicker
                  enableOutsideDays
                  onDayClick={(event, day) => this.clickSelectDay(day)}
                  localeUtils={LocaleUtils}
                  locale="zh-cn" />
              </section>
              <p></p>
            </div>
            <article className={'clearfix right ' + styles.addOpear} onClick={this.goAddSurgery.bind(this)}>
              + 添加手术
            </article>
            <article className="right clearfix" onClick={this.goOperaPatient.bind(this)}>
              <i className="left"></i>
              <span className="left">病患信息</span>
            </article>
          </header>
          {
            surgeries && surgeries.length ? surgeries.map((opear) => {
              return (
                <section className={'topCardBg ' + styles.opearCon} key={opear.operatingRoom._id}>
                  <header className="clearfix">
                    <span className="left">{opear.operatingRoom && opear.operatingRoom.name}</span>
                    <p className={this.state[opear.operatingRoom._id] ? 'right sanjiao-right' : 'right sanjiao-bt ' + styles.curP }
                      onClick={() => this.clickToggleList(opear.operatingRoom._id)}>
                    </p>
                  </header>
                  <ul style={{display: this.state[opear.operatingRoom._id] ? 'none' : 'block'}}>
                    {
                      opear && opear.surgeries && opear.surgeries.map((surgery) => {
                        return (
                          <li className="clearfix" key={surgery._id} onClick={() => this.goSurgeryDetail(surgery._id)}>
                            <i className="left">{surgery.seq}.</i>
                            <p className="left">
                              {surgery.patient && surgery.patient.name}（{
                                surgery.patient && surgery.patient.gender === 'female' ? '女' : '男'
                              }）{surgery.patient && surgery.patient.age} {surgery.patient && surgery.patient.name}
                            </p>
                            <article className="right">{surgery.doctor && surgery.doctor.name}</article>
                          </li>
                        );
                      })
                    }
                  </ul>
                </section>
              );
            }) : <div className="noResult">当天暂无手术数据</div>
          }
        </div>
      </div>
    );
  }
}
