import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loadAppartDutys } from '../../redux/modules/appartDuty';
const styles = require('../Duty/Duty.scss');
@connect(
  state => ({...state.appartDutys}), {
    pushState: push,
    loadAppartDutys
  }
)
export default class AppartDuty extends Component {
  static propTypes = {
    pushState: PropTypes.func,
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

  loadLevel(level) {
    if (level === '1') {
      return (
        <i className={styles.levelFir}></i>
      );
    } else if (level === '2') {
      return (
        <i className={styles.levelSec}></i>
      );
    }else if (level === '3') {
      return (
        <i className={styles.levelThr}></i>
      );
    }else if (level === '4') {
      return (
        <i className={styles.levelFour}></i>
      );
    }
  }

  goChangeDuty() {
    this.props.pushState('/change-duty');
  }

  render() {
    const appartDutys = this.props.appartDutys;
    const monthAppartDutys = appartDutys && appartDutys.filter((item) => item.month === this.state.monthState);
    console.log(monthAppartDutys);
    return (
      <div className={styles.duty + ' ' + styles.appartDuty}>
        <HeadNaviBar>
          XX科室值班表
        </HeadNaviBar>
        <div className={'select clearfix ' + styles.selectMonth}>
          <select className="left" value={this.state.monthState} onChange={this.changeMonth.bind(this)}>
            <option value="3">3月</option>
            <option value="4">4月</option>
          </select>
          <p className="right"></p>
        </div>
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
                      <div onClick={this.goChangeDuty.bind(this)}>
                        <section className={styles.dateDay}>{monthAppartDuty.day}</section>
                        <article className={styles.dateAppart}>
                          {
                            this.loadLevel(monthAppartDuty.level)
                          }
                          <span className="left">{monthAppartDuty.doctor}</span>
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
          <p className="tip">功能提示：点击想要交换的值班日期，可以申请换班哦~~</p>
        </footer>
      </div>
    );
  }
}
