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
    };
  }

  componentDidMount() {
    //  TODO 接口地址
    //  this.props.loadtypes();
  }

  selectIsout(event) {
    const isoutValue = event.target.value;
    this.setState({
      isout: isoutValue,
      scheduleType: this.props.scheduleTypes[isoutValue][0].ywname
    });
  }

  selectType(event) {
    this.setState({
      scheduleType: event.target.value
    });
  }

  clickAddBtn() {
    // const options = {
    //   title: this.refs.title.value,
    //   isout: this.state.isout,
    //   scheduleType: this.state.scheduleType,
    //   startTime: this.refs.startTime.value,
    //   endTime: this.refs.endTime.value,
    //   cycle: this.refs.cycle.value,
    //   notice: this.refs.notice.value,
    //   remark: this.refs.remark.value
    // };

    // if(options.startTime > options.endTime){
    //   //TODO 弹窗提示：开始时间不能大于结束时间
    //   return;
    // }

    // let otherOptions;
    // if (this.state.isout === 'in') {
    //   if(this.state.scheduleType === 'opera') {
    //     otherOptions = {
              //  TODO 填充内容
    //     };
    //     options.cycle = '';
    //   }
    //   if(this.state.scheduleType === 'metting') {
    //     otherOptions = {
    //         types: this.refs.mettingInfor.state.types,
    //         address: this.refs.mettingInfor.state.address,
    //         otherMan: this.refs.mettingInfor.state.otherMan
    //     };
    //   }
    //   if(this.state.scheduleType === 'check') {
    //     otherOptions = {
    //         address: this.refs.checkRef.state.address,
    //         otherMan: this.refs.checkRef.state.otherMan
    //     };
    //   }
    // }
    //  this.props.addDatePlan(options + otherOptions);
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
                  <input type="text" ref="title" />
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>日程类型</label>
                <span className={ styles.mainIcon}>*</span>
                <div className={styles.scheduleType}>
                  <div className="select">
                    <select onChange={this.selectIsout.bind(this)} value={this.state.isout}>
                      <option value="in">院内</option>
                      <option value="out">院外</option>
                    </select>
                    <p className="caret"></p>
                  </div>
                  <div className="select">
                    <select onChange={this.selectType.bind(this)} value={this.state.scheduleType}>
                      <span></span>
                      {
                        scheduleTypes[isout].map((type) => {
                          return (
                            <option key={type.ywname} value={type.ywname}>{type.zwname}</option>
                          );
                        })
                      }
                    </select>
                    <p className="caret"></p>
                  </div>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>开始时间</label>
                <div>
                  <input type="date" ref="startTime" />
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>结束时间</label>
                <div>
                  <input type="date" ref="endTime" />
                </div>
              </li>
              <li style={{display: this.state.scheduleType === 'opera' ? 'none' : 'block'}}>
                <label className={ styles.leftPlaceholder}>重复</label>
                <div>
                  <select ref="cycle" >
                    <option value="1">仅一次</option>
                    <option value="2">两次</option>
                  </select>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>提醒</label>
                <div>
                  <select ref="notice">
                    <option value="1">提前5分钟</option>
                    <option value="2">提前30分钟</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>

          <div style={{display: this.state.scheduleType === 'opera' ? 'block' : 'none'}}>
            <header className={styles.headTitle}>手术信息</header>
            <ul className="cardBgRadius">
              <OperaType ref="patientRef" operaInfor={operaInfor} />
            </ul>
          </div>

          <div style={{display: this.state.scheduleType === 'metting' ? 'block' : 'none'}}>
            <header className={styles.headTitle}>会议信息</header>
            <ul className="cardBgRadius">
              <MettingType ref="mettingRef" mettingInfor={mettingInfor} />
            </ul>
          </div>

          <div style={{display: this.state.scheduleType === 'check' ? 'block' : 'none'}}>
            <header className={styles.headTitle}>查房详情</header>
            <ul className="cardBgRadius">
              <CheckType ref="checkRef" />
            </ul>
          </div>

          <div>
            <header className={styles.headTitle}>备注</header>
            <textarea className="cardBgRadius" ref="remark"></textarea>
          </div>
          <button className="mainBtn" onClick={this.clickAddBtn.bind(this)}>完成</button>
        </div>
      </div>
    );
  }
}

//  component: opera information
export class OperaType extends Component {
  static propTypes = {
    operaInfor: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sex: '',
      address: '',
      diagno: '',
      operaName: '',
      isCycle: '01',
      number: '',
      otherInfor: ''
    };
  }

  inputOperaName(event) {
    this.setState({
      name: event.target.value
    });
  }

  changeOperaSex(event) {
    this.setState({
      sex: event.target.value
    });
  }

  changeOperaAddress(event) {
    this.setState({
      address: event.target.value
    });
  }

  changeOperaDiagno(event) {
    this.setState({
      diagno: event.target.value
    });
  }

  changeOperaName(event) {
    this.setState({
      operaName: event.target.value
    });
  }

  changeOperaCycle(event) {
    this.setState({
      isCycle: event.target.value
    });
  }

  inputOperaNumber(event) {
    this.setState({
      number: event.target.value
    });
  }

  inputOtherInfor(event) {
    this.setState({
      otherInfor: event.target.value
    });
  }

  render() {
    const operaInfor = this.props.operaInfor || {};
    return (
      <div>
        <li>
          <label className={ styles.leftPlaceholder}>患者姓名</label>
          <div>
            <input type="text" onChange={this.inputOperaName.bind(this)} value={this.state.name}/>
          </div>
        </li>
        <li>
          <label className={ styles.leftPlaceholder}>性别</label>
          <div>
            <select onChange={this.changeOperaSex.bind(this)} value={this.state.sex}>
              <option value="01">男</option>
              <option value="02">女</option>
            </select>
          </div>
        </li>
        <li>
          <label className={ styles.leftPlaceholder}>手术室</label>
          <div>
            <select onChange={this.changeOperaAddress.bind(this)} value={this.state.address}>
              {
                operaInfor && operaInfor.address && operaInfor.address.map((address) => {
                  return (<option key={address} value={address}>{address}</option>);
                })
              }
            </select>
          </div>
        </li>
        <li>
          <label className={ styles.leftPlaceholder}>诊断</label>
          <div>
            <select onChange={this.changeOperaDiagno.bind(this)} value={this.state.diagno}>
              {
                operaInfor && operaInfor.diagnos && operaInfor.diagnos.map((diagno) => {
                  return (<option key={diagno} value={diagno}>{diagno}</option>);
                })
              }
            </select>
          </div>
        </li>
        <li>
          <label className={ styles.leftPlaceholder}>执行手术</label>
          <div>
            <select onChange={this.changeOperaName.bind(this)} value={this.state.operaName}>
              {
                operaInfor && operaInfor.operaNames && operaInfor.operaNames.map((operaName) => {
                  return (<option key={operaName} value={operaName}>{operaName}</option>);
                })
              }
            </select>
          </div>
        </li>
        <li>
          <label className={ styles.leftPlaceholder}>体外循环</label>
          <div>
            <select onChange={this.changeOperaCycle.bind(this)} value={this.state.isCycle}>
              <option value="01">是</option>
              <option value="02">否</option>
            </select>
          </div>
        </li>
        <li>
          <label className={ styles.leftPlaceholder}>床号</label>
          <div>
            <input type="text" onChange={this.inputOperaNumber.bind(this)} value={this.state.number}/>
          </div>
        </li>
        <li>
          <label className={ styles.leftPlaceholder}>接台信息</label>
          <div>
            <input type="text" onChange={this.inputOtherInfor.bind(this)} value={this.state.otherInfor}/>
          </div>
        </li>
      </div>
    );
  }
}

//  component: metting information
export class MettingType extends Component {
  static propTypes = {
    mettingInfor: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      types: '',
      address: '',
      otherMan: ''
    };
  }

  changeMettingName(event) {
    this.setState({
      types: event.target.value
    });
  }

  changeMettingAddress(event) {
    this.setState({
      address: event.target.value
    });
  }

  inputMettingMan(event) {
    this.setState({
      otherMan: event.target.value
    });
  }

  render() {
    const mettingInfor = this.props.mettingInfor || {};
    return (
      <div>
        <li>
          <label className={ styles.leftPlaceholder}>会议类别</label>
          <div>
            <select onChange={this.changeMettingName.bind(this)} value={this.state.types}>
              {
                mettingInfor && mettingInfor.types && mettingInfor.types.map((type) => {
                  return (<option key={type} value={type}>{type}</option>);
                })
              }
            </select>
          </div>
        </li>
        <li>
          <label className={ styles.leftPlaceholder}>会议地点</label>
          <div>
            <select onChange={this.changeMettingAddress.bind(this)} value={this.state.address}>
              {
                mettingInfor && mettingInfor.address && mettingInfor.address.map((address) => {
                  return (<option key={address} value={address}>{address}</option>);
                })
              }
            </select>
          </div>
        </li>
        <li>
          <label className={ styles.leftPlaceholder}>参会人员</label>
          <div>
            <input onChange={this.inputMettingMan.bind(this)} value={this.state.otherMan} type="text"/>
          </div>
        </li>
      </div>
    );
  }
}

//  component: check information
export class CheckType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      otherMan: ''
    };
  }

  inputCheckAddress(event) {
    this.setState({
      address: event.target.value
    });
  }

  inputCheckMan(event) {
    this.setState({
      otherMan: event.target.value
    });
  }

  render() {
    return (
      <div>
        <li>
          <label className={ styles.leftPlaceholder}>地点</label>
          <div>
            <input onChange={this.inputCheckAddress.bind(this)} value={this.state.address} type="text"/>
          </div>
        </li>

        <li>
          <label className={ styles.leftPlaceholder}>参与人员</label>
          <div>
            <input onChange={this.inputCheckMan.bind(this)} value={this.state.otherMan} type="text"/>
          </div>
        </li>
      </div>
    );
  }
}
