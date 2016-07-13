import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { HeadNaviBar, Modal, SearchBar } from '../../components';
import DateTimeField from 'react-bootstrap-datetimepicker-hyt';
import '../AddDatePlan/DateTimePicker.scss';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import { showDiaglog } from '../../redux/modules/diaglog';
import { loadDoctors, addAppartNeed } from '../../redux/modules/invitation';
import { search, clearSearchResult } from '../../redux/modules/search';

const styles = require('./NeedApartAdd.scss');

let loadPageCurTime;
@connect(
  state => ({contact: state.form.contact, ...state.invitation}), {
    pushState: push,
    showDiaglog,
    loadDoctors,
    addAppartNeed,
  }
)
@reduxForm({
  form: 'creatApartNeed',
  fields: ['doctors', 'medicalCategory', 'start_time', 'end_time', 'mobile', 'address', 'transportation', 'remark']
})
export default class NeedApartAdd extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    values: PropTypes.object,
    fields: PropTypes.object,
    showDiaglog: PropTypes.func,
    loadDoctors: PropTypes.func,
    addAppartNeed: PropTypes.func,
    addAppartNeedSuccess: PropTypes.bool,
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string,
    localStorage: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      startTime: '',
      endTime: '',
      inputFormat: 'YYYY-MM-DD HH:mm',
      showModal: false,
      selectDoctors: JSON.parse(localStorage.getItem('doctors')) || [],
    };
  }

  componentDidMount() {
    loadPageCurTime = new Date().getTime();
    this.props.loadDoctors();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.addAppartNeedSuccess && nextProps.addAppartNeedSuccess) {
      if (!this.props.successMsg && nextProps.successMsg) {
        localStorage.removeItem('doctors');
        localStorage.setItem('addNeedApartTab', 0);
        this.props.showDiaglog(nextProps.successMsg, '/appart-my-need');
      }
    }
    if (!this.props.addAppartNeedSuccess && !nextProps.addAppartNeedSuccess) {
      if (!this.props.errorMsg && nextProps.errorMsg) {
        this.props.showDiaglog(nextProps.errorMsg);
      }
    }
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

  // click add
  clickAddNeed() {
    const {values} = this.props;
    const {startTime, endTime, selectDoctors} = this.state;
    values.start_time = startTime ? this.formatDate(startTime) : this.formatDate(loadPageCurTime);
    values.end_time = endTime;
    values.doctors = selectDoctors.map((doctor) => doctor._id);
    if (values && !values.medicalCategory) {
      this.props.showDiaglog('请选择医疗类别');
      return;
    }
    if (values && !values.mobile) {
      this.props.showDiaglog('请输入手机号码');
      return;
    }
    this.props.addAppartNeed(values);
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

  // confrim select doctor
  clickConfrimDoctor() {
    const {selectDoctors} = this.state;
    if (!selectDoctors || selectDoctors.length === 0) {
      this.props.showDiaglog('请至少选择一名医生');
      return;
    }
    this.clickHideModal();
  }

  // checkbox text
  changeSelectDoctor(id, value, event) {
    const checkboxchecked = event.target.checked;
    const selectDoctorItem = {_id: id, name: value};
    const nowSelectedDoctors = this.state.selectDoctors;
    if (!checkboxchecked) {
      const selectedDoctorsId = this.state.selectDoctors.map((doctor) => doctor._id);
      if (selectedDoctorsId.indexOf(id) >= 0) {
        nowSelectedDoctors.splice(selectedDoctorsId.indexOf(id), 1);
        this.setState({
          selectDoctors: nowSelectedDoctors
        });
      }
    } else {
      nowSelectedDoctors.push(selectDoctorItem);
      this.setState({
        selectDoctors: nowSelectedDoctors
      });
    }
  }

  render() {
    const {inputFormat, selectDoctors} = this.state;
    const {fields: {medicalCategory, mobile, address, transportation, remark}} = this.props;
    const selectedDoctorsText = selectDoctors && selectDoctors.map((doctor) => doctor.name);
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
                <articel className={styles.doctorText}>
                  {
                    selectedDoctorsText && selectedDoctorsText.map((selectDoctor) => {
                      return (
                        <p key={selectDoctor}>
                          <span>{selectDoctor}</span>
                          <i>、</i>
                        </p>
                      );
                    })
                  }
                </articel>
              </div>
            </li>
            <li>
              <label className="leftPlaceholder">医疗类别</label>
              <span className="mainIcon">*</span>
              <div className="select">
                <select {...medicalCategory}>
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
                <input type="tel" {...mobile} />
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
              <div className="select">
                <select {...transportation}>
                  <option value="">请选择</option>
                  <option value="飞机">飞机</option>
                  <option value="火车">火车</option>
                  <option value="其他">其他</option>
                </select>
                <p className="sanjiao-bt"></p>
              </div>
            </li>
          </ul>
          <header>备注信息</header>
          <textarea {...remark}></textarea>
        </div>
        <footer style={{margin: '0 .15rem'}}><button className="mainBtn" onClick={this.clickAddNeed.bind(this)}>发布需求</button></footer>
        <div style={{display: this.state.showModal ? 'block' : 'none'}}>
          <DoctorsModal
            clickHideModal = {this.clickHideModal.bind(this)}
            clickConfrimDoctor = {this.clickConfrimDoctor.bind(this)}
            changeSelectDoctor = {this.changeSelectDoctor.bind(this)}
            selectDoctors = {this.state.selectDoctors} />
        </div>
      </div>
    );
  }
}


/**
  * component: select doctors modal
  */
@connect(
  state => ({doctors: state.invitation.doctors, ...state.searchResults}), {
    search,
    clearSearchResult,
    showDiaglog
  }
)
class DoctorsModal extends Component {
  static propTypes = {
    clickHideModal: PropTypes.func,
    clickConfrimDoctor: PropTypes.func,
    changeSelectDoctor: PropTypes.func,
    loadDoctors: PropTypes.func,
    doctors: PropTypes.array,
    search: PropTypes.func,
    searchResults: PropTypes.array,
    clearSearchResult: PropTypes.func,
    selectDoctors: PropTypes.array,
    showDiaglog: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchBtnClicked: false,
    };
  }

  changeSelectDoctor(id, value, event) {
    this.props.changeSelectDoctor(id, value, event);
  }

  changeSearchText(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  clickSearchBtn() {
    if (!this.state.searchText) {
      this.props.showDiaglog('请输入医生名称');
      return;
    }
    this.setState({searchBtnClicked: true});
    this.props.search(this.state.searchText);
  }

  clearSearchResult() {
    this.props.clearSearchResult();
    this.setState({
      searchBtnClicked: false,
      searchText: ''
    });
  }

  render() {
    let doctorResults;
    const {doctors, searchResults, selectDoctors} = this.props;
    if (this.state.searchBtnClicked) {
      doctorResults = searchResults;
    } else {
      doctorResults = doctors;
    }
    const selectedDoctorsId = selectDoctors.map((doctor) => doctor._id);
    return (
      <div>
        <Modal
            title = {'选择医生'}
            clickHideModal = {this.props.clickHideModal}
            clickConfirm = {this.props.clickConfrimDoctor}
            clickCancel = {this.props.clickHideModal}
          >
          <SearchBar
            placeholder="请输入医生名称"
            searchText={this.state.searchText}
            changeSearchText={this.changeSearchText.bind(this)}
            clickSearchBtn={this.clickSearchBtn.bind(this)} />
          <div className={styles.doctorModalCon}>
            <p style={{display: this.state.searchBtnClicked ? 'block' : 'none'}} className={styles.searchUndo} onClick={this.clearSearchResult.bind(this)}>
              <i className="fa fa-undo"></i>返回
            </p>
            {
              doctorResults && doctorResults.length > 0 ?
                doctorResults.map((doctor) => {
                  return (
                    <div key={doctor._id} className={styles.baseList + ' clearfix'}>
                      <header>{doctor.name}</header>
                      <p>{doctor.hospital && doctor.hospital.name}&nbsp;{doctor.apartment && doctor.apartment.name}&nbsp;{doctor.level && doctor.level.name}</p>
                      <div className={'checkbox ' + styles.checkbox}>
                        {
                          selectedDoctorsId.indexOf(doctor._id) >= 0 ?
                            <input type="checkbox" id={doctor._id}
                              checked
                              onChange={(event) => this.changeSelectDoctor(doctor._id, doctor.name, event)} />
                          :
                            <input type="checkbox" id={doctor._id}
                              onChange={(event) => this.changeSelectDoctor(doctor._id, doctor.name, event)} />
                        }
                        <label htmlFor={doctor._id}></label>
                      </div>
                    </div>
                  );
                })
              : <div className={styles.baseList + ' clearfix'}>无内容</div>
            }
          </div>
        </Modal>
      </div>
    );
  }
}
