import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';

import { loadAppartDutys } from '../../redux/modules/appartDuty';
const styles = require('./AppartDuty.scss');
@connect(
  state => ({...state.appartDutys}), {
    loadAppartDutys
  }
)
export default class AppartDuty extends Component {
  static propTypes = {
    loadAppartDutys: PropTypes.func,
    appartDutys: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      monthState: '3'
    };
  }

  componentDidMount() {
    // TODO 完善接口地址
    // this.props.loaddutys();
  }

  changeMonth(event) {
    this.setState({
      monthState: event.target.value
    });
  }

  render() {
    const appartDutys = this.props.appartDutys;
    const monthAppartDutys = appartDutys && appartDutys.filter((item) => item.month === this.state.monthState);
    console.log(monthAppartDutys);
    return (
      <div className={styles.duty}>
        <HeadNaviBar>
          XX科室值班表
          <div className={'select ' + styles.selectMonth}>
            <select value={this.state.monthState} onChange={this.changeMonth.bind(this)}>
              <option value="3">3月</option>
              <option value="4">4月</option>
            </select>
            <p className="caret"></p>
          </div>
        </HeadNaviBar>
        <section className={styles.dutyTop}>
          <table>
            <tbody>
            <tr>
              <th>周日</th>
              <th>周一</th>
              <th>周二</th>
              <th>周三</th>
              <th>周四</th>
              <th>周五</th>
              <th>周六</th>
            </tr>
            <tr>
              {
                monthAppartDutys && monthAppartDutys.map((monthAppartDuty) => {
                  return (
                    <td key={monthAppartDuty.id}>
                      <div>
                        <section className={styles.dateDay}>{monthAppartDuty.day}</section>
                        <article className={styles.dateAppart}>
                          {/*
                            TODO 在return写if语句，用来判断是哪个级别
                          {
                            this.loadLevel(monthAppartDuty.level)
                          }*/}
                          {monthAppartDuty.doctor}
                        </article>
                        <i className={styles.dateSelf}></i>
                      </div>
                    </td>
                  );
                })
              }
            </tr>
            </tbody>
          </table>
        </section>
        <footer>
          <button className="mainBtn">交换</button>
          <p className="tip">功能提示：点击想要交换的值班日期，可以申请换班哦~~</p>
        </footer>
      </div>
    );
  }
}
