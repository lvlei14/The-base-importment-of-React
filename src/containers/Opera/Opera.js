import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DayPicker from 'react-day-picker';


import { loadOperas } from '../../redux/modules/opera';
const styles = require('./Opera.scss');
@connect(
  state => ({...state.operas}), {
    pushState: push,
    loadOperas
  }
)
export default class Opera extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadOperas: PropTypes.func,
    operas: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectDay: this.getNowFormatDate(),
      showDayPicker: false,
    };
  }

  componentDidMount() {
    // TODO 完善接口地址
    // this.props.loadOperas();
  }

  getNowFormatDate() {
    const date = new Date();
    const seperator1 = '-';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const strDate = date.getDate();
    const currentdate = year + seperator1 + month + seperator1 + strDate;
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
      showDayPicker: true,
    });
  }

  goAddSurgery() {
    this.props.pushState('/add-surgery');
  }
  clickSelectDay(day) {
    const date = new Date(day);
    const datetow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.setState({
      showDayPicker: false,
      selectDay: datetow,
    });
  }

  render() {
    const initOperas = this.props.operas;
    const operas = initOperas && initOperas.filter((item) => item.date === this.state.selectDay);
    console.log(this.state.selectDay);
    return (
      <div>
        <HeadNaviBar>心外科手术安排</HeadNaviBar>
        <div className={styles.opera}>
          <header className={'clearfix topCardBg ' + styles.operaHeader}>
            <div className="left clearfix" onClick={this.clickShowDayPicker.bind(this)}>
              <span className="left">{this.state.selectDay}</span>
              <p className="left sanjiao-bt"></p>
            </div>
            <div style={{display: this.state.showDayPicker ? 'block' : 'none'}} className={styles.operaPicker}>
              <section className="bodyBgWhiteZindex">
                <DayPicker
                  enableOutsideDays
                  onDayClick={(event, day) => this.clickSelectDay(day)} />
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
            operas && operas.map((opear) => {
              return (
                <section className="topCardBg" key={opear.operatingRoom.id}>
                  <header className="clearfix">
                    <span className="left">{opear.operatingRoom && opear.operatingRoom.name}</span>
                    <p className={this.state[opear.operatingRoom.id] ? 'right sanjiao-right' : 'right sanjiao-bt ' + styles.curP } onClick={() => this.clickToggleList(opear.operatingRoom.id)}></p>
                  </header>
                  <ul style={{display: this.state[opear.operatingRoom.id] ? 'none' : 'block'}}>
                    {
                      opear && opear.surgeries && opear.surgeries.map((surgery) => {
                        return (
                          <li className="clearfix" key={surgery.seq}>
                            <i className="left">{surgery.seq}.</i>
                            <p className="left">
                              {surgery.patient && surgery.patient.name}（{
                                surgery.patient.gender === 'female' ? '女' : '男'
                              }）{surgery.patient && surgery.patient.age} {surgery.name}
                            </p>
                            <article className="right">{surgery.doctor}</article>
                          </li>
                        );
                      })
                    }
                  </ul>
                </section>
              );
            })
          }
        </div>
      </div>
    );
  }
}
