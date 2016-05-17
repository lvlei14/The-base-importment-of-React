import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';

import { loadtypes } from '../../redux/modules/datePlan';
import { addDatePlan } from '../../redux/modules/addDatePlan';
import { loadMettingInformation } from '../../redux/modules/addDatePlan';
import { loadOperaInformation } from '../../redux/modules/addDatePlan';

const styles = require('./AddDatePlan.scss');
@connect(
  state => ({...state.schedules, ...state.addDatePlan}), {
    loadtypes,
    addDatePlan,
    loadMettingInformation,
    loadOperaInformation
  }
)
export default class AddDatePlan extends Component {
  static propTypes = {
    scheduleTypes: PropTypes.object,
    metting: PropTypes.object,
    opera: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isout: 'in',
      scheduleType: this.props.scheduleTypes.in[0].ywname,
      operaInfor: {
        name: '',
        sex: '',
        address: '',
        diagno: '',
        operaName: '',
        isCycle: '01',
        number: '',
        otherInfor: ''
      },
    };
  }

  componentDidMount() {
    //  TODO 接口地址
    //  this.props.loadtypes();
  }

  selectIsout(event) {
    this.setState({
      isout: event.target.value
    });
  }

  selectType(event) {
    this.setState({
      scheduleType: event.target.value
    });
  }

  clickAddBtn() {
    // const options = {};
    //  TODO 提交添加信息
    //  this.props.addDatePlan(options);
  }

  inputOperaName(event) {
    this.setState({
      operaInfor: Object.assign({}, this.state.operaInfor, {name: event.target.value})
    });
  }

  changeOperaSex(event) {
    this.setState({
      operaInfor: Object.assign({}, this.state.operaInfor, {sex: event.target.value})
    });
  }

  render() {
    const scheduleTypes = this.props.scheduleTypes;
    const mettingInfor = this.props.metting;
    const operaInfor = this.props.opera;
    const isout = this.state.isout;

    return (
      <div>
        <HeadNaviBar>添加日程</HeadNaviBar>
        <div className={ styles.addDatePlan}>
          <div>
            <header className={styles.headTitle}>基本信息</header>
            <ul className="cardBgRadius">
              <li>
                <label className={ styles.leftPlaceholder}>标题</label>
                <div>
                  <input type="text"/>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>日程类型</label>
                <span className={ styles.mainIcon}>*</span>
                <div className={styles.scheduleType}>
                  <select onChange={this.selectIsout.bind(this)} value={this.state.isout}>
                    <option value="in">院内</option>
                    <option value="out">院外</option>
                  </select>
                  <select onChange={this.selectType.bind(this)} value={this.state.scheduleType}>
                    {
                      scheduleTypes[isout].map((type) => {
                        return (
                          <option value={type.ywname}>{type.zwname}</option>
                        );
                      })
                    }
                  </select>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>开始时间</label>
                <div>
                  <input type="date"/>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>结束时间</label>
                <div>
                  <input type="date"/>
                </div>
              </li>
              <li style={{display: this.state.scheduleType === 'opera' ? 'none' : 'block'}}>
                <label className={ styles.leftPlaceholder}>重复</label>
                <div>
                  <input type="date"/>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>提醒</label>
                <div>
                  <input type="date"/>
                </div>
              </li>
            </ul>
          </div>

          <div style={{display: this.state.scheduleType === 'opera' ? 'block' : 'none'}}>
            <header className={styles.headTitle}>手术信息</header>
            <ul className="cardBgRadius">
              <li>
                <label className={ styles.leftPlaceholder}>患者姓名</label>
                <div>
                  <input type="text" onChange={this.inputOperaName.bind(this)} value={this.state.operaInfor.name}/>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>性别</label>
                <div>
                  <select onChange={this.changeOperaSex.bind(this)} value={this.state.operaInfor.sex}>
                    <option value="01">男</option>
                    <option value="02">女</option>
                  </select>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>手术室</label>
                <div>
                  <select>
                    {
                      operaInfor && operaInfor.address && operaInfor.address.map((address) => {
                        return (<option value={address}>{address}</option>);
                      })
                    }
                  </select>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>诊断</label>
                <div>
                  <select>
                    {
                      operaInfor && operaInfor.diagnos && operaInfor.diagnos.map((diagno) => {
                        return (<option value={diagno}>{diagno}</option>);
                      })
                    }
                  </select>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>执行手术</label>
                <div>
                  <select>
                    {
                      operaInfor && operaInfor.operaNames && operaInfor.operaNames.map((operaName) => {
                        return (<option value={operaName}>{operaName}</option>);
                      })
                    }
                  </select>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>体外循环</label>
                <div>
                  <select>
                    <option value="01">是</option>
                    <option value="02">否</option>
                  </select>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>床号</label>
                <div>
                  <input type="text" onChange={this.inputOperaName.bind(this)} value={this.state.operaName}/>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>接台信息</label>
                <div>
                  <input type="text" onChange={this.inputOperaName.bind(this)} value={this.state.operaName}/>
                </div>
              </li>
            </ul>
          </div>

          <div style={{display: this.state.scheduleType === 'metting' ? 'block' : 'none'}}>
            <header className={styles.headTitle}>会议信息</header>
            <ul className="cardBgRadius">
              <li>
                <label className={ styles.leftPlaceholder}>会议类别</label>
                <div>
                  <select>
                    {
                      mettingInfor && mettingInfor.types && mettingInfor.types.map((type) => {
                        return (<option value={type}>{type}</option>);
                      })
                    }
                  </select>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>会议地点</label>
                <div>
                  <select>
                    {
                      mettingInfor && mettingInfor.address && mettingInfor.address.map((address) => {
                        return (<option value={address}>{address}</option>);
                      })
                    }
                  </select>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>参会人员</label>
                <div>
                  <input type="text"/>
                </div>
              </li>
            </ul>
          </div>

          <div style={{display: this.state.scheduleType === 'check' ? 'block' : 'none'}}>
            <header className={styles.headTitle}>查房详情</header>
            <ul className="cardBgRadius">
              <li>
                <label className={ styles.leftPlaceholder}>地点</label>
                <div>
                  <input type="text"/>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>参与人员</label>
                <div>
                  <input type="text"/>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <header className={styles.headTitle}>备注</header>
            <textarea className="cardBgRadius"></textarea>
          </div>
          <button className="mainBtn" onClick={this.clickAddBtn.bind(this)}>完成</button>
        </div>
      </div>
    );
  }
}

// TODO 复合组件
export class OperaType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operaName: ''
    };
  }

  inputOperaName(event) {
    this.setState({
      operaName: event.target.value
    });
    console.log('修 改');
  }

  render() {
    return (
      <div>
        <header className={styles.headTitle}>手术信息</header>
        <ul className="cardBgRadius">
          <li>
            <label className={ styles.leftPlaceholder}>患者姓名</label>
            <div>
              <input type="text" onChange={this.inputOperaName.bind(this)} value={this.state.operaName}/>
            </div>
          </li>
          <li>
            <label className={ styles.leftPlaceholder}>性别</label>
            <div>
              <select>
                <option value="01">男</option>
                <option value="02">女</option>
              </select>
            </div>
          </li>
          <li>
            <label className={ styles.leftPlaceholder}>手术室</label>
            <div>
              <input type="date"/>
            </div>
          </li>
          <li>
            <label className={ styles.leftPlaceholder}>诊断</label>
            <div>
              <input type="date"/>
            </div>
          </li>
          <li>
            <label className={ styles.leftPlaceholder}>重复</label>
            <div>
              <input type="date"/>
            </div>
          </li>
          <li>
            <label className={ styles.leftPlaceholder}>提醒</label>
            <div>
              <input type="date"/>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
