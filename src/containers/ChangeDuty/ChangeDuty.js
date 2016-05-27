import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';

import { loadChangeDutys } from '../../redux/modules/changeDuty';
const styles = require('./ChangeDuty.scss');
@connect(
  state => ({...state.changeDutys}), {
    loadChangeDutys
  }
)
export default class ChangeDuty extends Component {
  static propTypes = {
    loadChangeDutys: PropTypes.func,
    changeDutys: PropTypes.array,
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

  loadLevel(level) {
    if (level === '1') {
      return (
        <i className={styles.levelFir}>1</i>
      );
    } else if (level === '2') {
      return (
        <i className={styles.levelSec}>2</i>
      );
    }else if (level === '3') {
      return (
        <i className={styles.levelThr}>3</i>
      );
    }
  }

  render() {
    const changeDutys = this.props.changeDutys;
    const monthChangeDutys = changeDutys && changeDutys.filter((item) => item.month === this.state.monthState);
    console.log(monthChangeDutys);
    return (
      <div className={styles.duty}>
        <HeadNaviBar>
          换班申请
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
                monthChangeDutys && monthChangeDutys.map((monthChangeDuty) => {
                  return (
                    <td key={monthChangeDuty.id}>
                      <div>
                        <section className={styles.dateDay}>{monthChangeDuty.day}</section>
                        <article className={styles.dateAppart}>
                          {/*
                            TODO 在return写if语句，用来判断是哪个级别
                          {
                            this.loadLevel(monthChangeDuty.level)
                          }*/}
                          {monthChangeDuty.doctor}
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
