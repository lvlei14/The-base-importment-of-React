import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import Modal from '../../components/Modal/Modal';
import DateTimeField from 'react-bootstrap-datetimepicker-hyt';
import '../AddDatePlan/DateTimePicker.scss';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import { showDiaglog } from '../../redux/modules/diaglog';


const styles = require('./NeedApartAdd.scss');

let loadPageCurTime;
@connect(
  state => ({contact: state.form.contact}), {
    // pushState: push,
    showDiaglog
  }
)
@reduxForm({
  form: 'creatApartNeed',                           // a unique name for this form
  fields: ['doctor', 'type', 'start_time', 'end_time', 'telNum', 'address', 'tripWay', 'mark']
})
export default class NeedApartAdd extends Component {
  static propTypes = {
    // pushState: PropTypes.func,
    values: PropTypes.object,
    fields: PropTypes.object,
    showDiaglog: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      startTime: '',
      endTime: '',
      inputFormat: 'YYYY-MM-DD HH:mm',
      showModal: true,
      selectDoctors: '',
    };
  }

  componentDidMount() {
    loadPageCurTime = new Date().getTime();
  }


  handleChange = (newDate) => {
    const newDateNew = new Date(parseInt(newDate, 10));
    this.setState({
      startTime: newDateNew
    });
  }

  handleChangeEndTime = (newDate) => {
    const newDateNew = new Date(parseInt(newDate, 10));
    this.setState({
      endTime: newDateNew
    });
  }

  formatDate(day) {
    return moment(day).format('YYYY-MM-DD HH:mm:ss');
  }

  clickAddNeed() {
    const {values} = this.props;
    values.start_time = this.state.startTime ? this.formatDate(this.state.startTime) : this.formatDate(loadPageCurTime);
    values.end_time = this.state.endTime;
    values.doctor = this.state.selectDoctors;
    if (!this.state.selectDoctors) {
      this.props.showDiaglog('请选择医生');
      return;
    }
    if (values && !values.type) {
      this.props.showDiaglog('请选择医疗类别');
      return;
    }
    if (values && !values.telNum) {
      this.props.showDiaglog('请选择医疗类');
      return;
    }
    if (values && !values.telNum) {
      this.props.showDiaglog('请输入手机号码');
      return;
    }
    console.log(this.props.values);
  }

  clickShowModal() {
    this.setState({
      showModal: true,
    });
  }

  clickHideModal() {
    this.setState({
      showModal: false,
    });
  }

  clickConfrimDoctor() {
    console.log('点击确定');
    console.log(this.refs.aaa1.value);
  }

  render() {
    const {inputFormat} = this.state;
    const {fields: {type, telNum, address, tripWay, mark}} = this.props;
    return (
      <div className={styles.addNeed}>
        <HeadNaviBar>发布需求</HeadNaviBar>
        <div className="addPage">
          <header>基本信息</header>
          <ul className="cardBgRadius">
            <li>
              <label className="leftPlaceholder">专家</label>
              <span className="mainIcon">*</span>
              <div className="select" onClick={this.clickShowModal.bind(this)}>
                <input value={this.state.selectDoctors} />
              </div>
            </li>
            <li>
              <label className="leftPlaceholder">医疗类别</label>
              <span className="mainIcon">*</span>
              <div className="select">
                <select {...type}>
                  <option value="">请选择</option>
                  <option value="门诊指导">门诊指导</option>
                  <option value="急诊指导">急诊指导</option>
                  <option value="教学">教学</option>
                  <option value="手术指导">手术指导</option>
                </select>
                <p className="sanjiao-bt"></p>
              </div>
            </li>
            <li>
              <label className="leftPlaceholder">开始时间</label>
              <div>
                <section className={styles.dateTimePicker + ' AddappartNeed'}>
                  <DateTimeField
                    inputFormat={inputFormat}
                    onChange={this.handleChange} />
                </section>
              </div>
            </li>
            <li>
              <label className="leftPlaceholder">结束时间</label>
              <div>
                <section className={styles.dateTimePicker + ' AddappartNeed'}>
                  <DateTimeField
                    defaultText="请选择结束时间"
                    inputFormat={inputFormat}
                    onChange={this.handleChangeEndTime} />
                </section>
              </div>
            </li>
            <li>
              <label className="leftPlaceholder">联系电话</label>
              <span className="mainIcon">*</span>
              <div className="select">
                <input type="tel" {...telNum} />
              </div>
            </li>
            <li>
              <label className="leftPlaceholder">地点</label>
              <div className="select">
                <input type="text" {...address} />
              </div>
            </li>
            <li>
              <label className="leftPlaceholder">出行方式</label>
              <span className="mainIcon">*</span>
              <div className="select">
                <select {...tripWay}>
                  <option value="飞机">飞机</option>
                  <option value="火车">火车</option>
                  <option value="其他">其他</option>
                </select>
                <p className="sanjiao-bt"></p>
              </div>
            </li>
          </ul>
          <header>备注信息</header>
          <textarea {...mark}></textarea>
        </div>
        <footer style={{margin: '0 .15rem'}}><button className="mainBtn" onClick={this.clickAddNeed.bind(this)}>发布需求</button></footer>
        <div style={{display: this.state.showModal ? 'block' : 'none'}}>
          <DoctorsModal
            clickHideModal = {this.clickHideModal.bind(this)}
            clickAddNeed = {this.clickAddNeed.bind(this)} />
        </div>
      </div>
    );
  }
}


/**
  * component: select doctors modal
  */
class DoctorsModal extends Component {
  static propTypes = {
    clickHideModal: PropTypes.func,
    clickAddNeed: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      selectDoctors: [],
    };
  }

  componentDidMount() {
  }

  changeSelectDoctor(id, value) {
    console.log('-----changeSelectDoctor');
    const selectDoctorItem = {id: id, value: value};
    console.log(selectDoctorItem);
    this.setState({
      selectDoctors: this.state.selectDoctors.push(selectDoctorItem)
    });
  }

  render() {
    console.log('00000');
    console.log(this.state.selectDoctors);
    return (
      <div>
        <Modal
            title = {'选择医生'}
            clickHideModal = {this.props.clickHideModal}
            clickConfirm = {this.props.clickAddNeed}
            clickCancel = {this.props.clickHideModal}
          >
          <div className={styles.baseList + ' clearfix'}>
            <header>wangwu</header>
            <p>beijing</p>
            <div className={'checkbox ' + styles.checkbox}>
              <input type="checkbox" value="1" id="checkboxOneInput" name="" onChange={() => this.changeSelectDoctor('000', 'input0')} />
              <label htmlFor="checkboxOneInput"></label>
            </div>
          </div>
          <div className={styles.baseList + ' clearfix'}>
            <header>wangwu</header>
            <p>beijing</p>
            <div className={'checkbox ' + styles.checkbox}>
              <input type="checkbox" value="2" id="checkboxOneInput2" name="" onChange={() => this.changeSelectDoctor('001', 'input1')} />
              <label htmlFor="checkboxOneInput2"></label>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
