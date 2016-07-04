import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { showDiaglog } from '../../redux/modules/diaglog';
import DateTimeField from 'react-bootstrap-datetimepicker-hyt';
import '../AddDatePlan/DateTimePicker.scss';

import { loadTemplateItem, modifyScheduleById } from '../../redux/modules/datePlanInfo';
import { loadschedules } from '../../redux/modules/datePlan';
import { loadGroupInfoById, modifyGroupInfoById} from '../../redux/modules/groupInfo';


const styles = require('../AddDatePlan/AddDatePlan.scss');
@connect(
  state => ({...state.schedules, ...state.datePlanInfo, ...state.groupInfo}), {
    loadschedules,
    loadTemplateItem,
    modifyScheduleById,
    showDiaglog,
    loadGroupInfoById,
    modifyGroupInfoById
  }
)
export default class ModifyDatePlan extends Component {
  static propTypes = {
    loadschedules: PropTypes.func,
    loadTemplateItem: PropTypes.func,
    schedules: PropTypes.object,
    modifyScheduleSuccess: PropTypes.bool,
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string,
    routeParams: PropTypes.object,
    template: PropTypes.array,
    modifyScheduleById: PropTypes.func,
    showDiaglog: PropTypes.func,
    groupInfoItem: PropTypes.array,
    location: PropTypes.object,
    loadGroupInfoById: PropTypes.func,
    modifyGroupInfoById: PropTypes.func,
    modifyGroupNoticeSuccess: PropTypes.bool,
    groupSuccessMsg: PropTypes.string,
    groupErrorMsg: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const {groupAppartId} = this.props.location.query;
    let datePlanDetail;
    if (groupAppartId) {
      datePlanDetail = this.props.groupInfoItem && this.props.groupInfoItem[0] && this.props.groupInfoItem[0].contentId || {};
    } else {
      datePlanDetail = this.props.schedules && this.props.schedules[0] || {};
    }
    this.state = {
      inputFormat: 'YYYY-MM-DD h:mm A',
      startTime: new Date(datePlanDetail.start_time).getTime(),
      endTime: new Date(datePlanDetail.end_time).getTime(),
    };
  }

  componentDidMount() {
    const {id, tempId} = this.props.routeParams;
    const requires = {
      _id: id
    };
    const {groupAppartId} = this.props.location.query;
    if (groupAppartId) {
      this.props.loadGroupInfoById(id);
    } else {
      this.props.loadschedules(JSON.stringify(requires));
    }
    this.props.loadTemplateItem(tempId);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.modifyScheduleSuccess && nextProps.modifyScheduleSuccess) {
      if (!this.props.successMsg && nextProps.successMsg) {
        this.props.showDiaglog(nextProps.successMsg, '/date-plan');
      }
    }
    if (!this.props.modifyScheduleSuccess && !nextProps.modifyScheduleSuccess) {
      if (!this.props.errorMsg && nextProps.errorMsg) {
        this.props.showDiaglog(nextProps.errorMsg);
      }
    }
    const {groupAppartId} = this.props.location.query;
    if (!this.props.modifyGroupNoticeSuccess && nextProps.modifyGroupNoticeSuccess) {
      if (!this.props.groupSuccessMsg && nextProps.groupSuccessMsg) {
        this.props.showDiaglog(nextProps.groupSuccessMsg, '/group-msg-list/' + groupAppartId);
      }
    }
    if (!this.props.modifyGroupNoticeSuccess && !nextProps.modifyGroupNoticeSuccess) {
      if (!this.props.groupErrorMsg && nextProps.groupErrorMsg) {
        this.props.showDiaglog(nextProps.groupErrorMsg);
      }
    }
  }

  getNowFormatDate(day) {
    const date = new Date(day);
    const seperator1 = '-';
    const seperator2 = ':';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const strDate = date.getDate();
    const currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
  }

  mergeScheduleValueToTemDate() {
    const template = this.props.template;
    const templateCon = template && template[0] && template[0].content;
    const {groupAppartId} = this.props.location.query;
    let datePlanDetail;
    if (groupAppartId) {
      datePlanDetail = this.props.groupInfoItem && this.props.groupInfoItem[0] && this.props.groupInfoItem[0].contentId && this.props.groupInfoItem[0].contentId.content || {};
    } else {
      datePlanDetail = this.props.schedules && this.props.schedules[0] && this.props.schedules[0].content || {};
    }
    for (const scheduKey in datePlanDetail) {
      if (scheduKey) {
        for (const temPlateKey in templateCon) {
          if (datePlanDetail[scheduKey].label === templateCon[temPlateKey].label) {
            templateCon[temPlateKey].value = datePlanDetail[scheduKey].value;
          }
        }
      }
    }
    return templateCon;
  }
  clickAddBtn() {
    const template = this.props.template;
    const templateCon = template && template[0] && template[0].content;
    const temItem = [];
    const result = {};
    for (const iKey in templateCon) {
      if (!templateCon.hasOwnProperty(iKey)) continue;
      const objItem = {
        label: templateCon[iKey].label,
        value: this.refs[templateCon[iKey].key].value
      };
      const obj = {};
      obj[templateCon[iKey].key] = objItem;
      temItem.push(obj);
    }
    const type = {
      label: '日程类型',
      value: this.refs.templateTypeRef.value
    };
    const isInner = {
      label: '是否院内',
      value: this.refs.localRef.value === 'in' ? true : false
    };
    result.content = temItem;
    result.type = type;
    result.is_inner = isInner;
    result.start_time = this.getNowFormatDate(this.state.startTime);
    result.end_time = this.getNowFormatDate(this.state.endTime);
    const repeat = {
      label: '重复',
      value: this.refs.repeatRef && this.refs.repeatRef.value
    };
    result.repeat = repeat;
    const remind = {
      label: '提醒',
      value: this.refs.remindRef && this.refs.remindRef.value
    };
    result.remind = remind;
    result.template = template && template[0]._id;
    if (result.start_time === result.end_time) {
      this.props.showDiaglog('开始时间与结束时间不能相同');
      return;
    }
    if (result.start_time > result.end_time) {
      this.props.showDiaglog('开始时间不能大于结束时间');
      return;
    }
    const {groupAppartId} = this.props.location.query;
    if (groupAppartId) {
      const {id} = this.props.routeParams;
      this.props.modifyGroupInfoById(id, result);
    } else {
      const scheduleId = this.props.schedules && this.props.schedules[0] && this.props.schedules[0]._id;
      this.props.modifyScheduleById(scheduleId, result);
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

  showFormType(formItem) {
    if (formItem.type === 'input') {
      return (
        <div>
          <input type="text" ref={formItem.key} defaultValue={formItem.value} />
        </div>
      );
    }
    if (formItem.type === 'radio') {
      return (
        <div className="select">
          <select ref={formItem.key} defaultValue={formItem.value}>
              <option value="">请选择</option>
              {
                formItem && formItem.options && formItem.options.map((option) => {
                  return (
                    <option key={option} value={option}>{option}</option>
                  );
                })
              }
          </select>
          <p className="sanjiao-bt"></p>
        </div>
      );
    }
    if (formItem.type === 'textarea') {
      return (
        <div>
          <textarea ref={formItem.key} defaultValue={formItem.value}></textarea>
        </div>
      );
    }
  }

  render() {
    const template = this.props.template;
    const templateType = template && template[0] && template[0].name;
    const {groupAppartId} = this.props.location.query;
    let datePlanDetail;
    if (groupAppartId) {
      datePlanDetail = this.props.groupInfoItem && this.props.groupInfoItem[0] && this.props.groupInfoItem[0].contentId || {};
    } else {
      datePlanDetail = this.props.schedules && this.props.schedules[0] || {};
    }
    const {inputFormat, startTime, endTime} = this.state;
    const newData = this.mergeScheduleValueToTemDate();
    return (
      <div>
        <HeadNaviBar>修改日程</HeadNaviBar>
        <div className={ styles.addDatePlan}>
          <div>
            <ul className="cardBgRadius">
              <li>
                <label className={ styles.leftPlaceholder}>日程类型</label>
                <span className={ styles.mainIcon}>*</span>
                <div className={styles.scheduleType}>
                  <div className="select">
                    <select ref="localRef" defaultValue={datePlanDetail && datePlanDetail.is_inner && datePlanDetail.is_inner.value ? 'in' : 'out'}>
                      <option value="in">院内</option>
                      <option value="out">院外</option>
                    </select>
                    <p className="sanjiao-bt"></p>
                  </div>
                  <div>
                    <input ref="templateTypeRef"
                      className={styles.selectNoCur}
                      defaultValue={datePlanDetail.type && datePlanDetail.type.value}
                      readOnly="true" />
                  </div>
                </div>
              </li>
              <li className={styles.dateTimeFLiFirst}>
                <label className={ styles.leftPlaceholder}>开始时间</label>
                <div className={styles.scheduleType}>
                  <section className={styles.dateTimePicker}>
                    <DateTimeField
                      dateTime={startTime}
                      inputFormat={inputFormat}
                      onChange={this.handleChange} />
                  </section>
                </div>
              </li>
              <li className={styles.dateTimeFLiEnd}>
                <label className={ styles.leftPlaceholder}>结束时间</label>
                <div className={styles.scheduleType}>
                  <section className={styles.dateTimePicker}>
                    <DateTimeField
                      dateTime={endTime}
                      inputFormat={inputFormat}
                      onChange={this.handleChangeEndTime} />
                  </section>
                </div>
              </li>
              <li className={styles.liMarginTopZero} style={{display: templateType === '手术' ? 'none' : 'block'}}>
                <label className={ styles.leftPlaceholder}>重复</label>
                <div className="select">
                  <select ref="repeatRef" defaultValue={datePlanDetail.repeat && datePlanDetail.repeat.value}>
                      <option value="">请选择</option>
                      <option value="星期一">星期一</option>
                      <option value="星期二">星期二</option>
                      <option value="星期三">星期三</option>
                      <option value="星期四">星期四</option>
                      <option value="星期五">星期五</option>
                      <option value="星期六">星期六</option>
                      <option value="星期日">星期日</option>
                      <option value="工作日">工作日</option>
                      <option value="每天">每天</option>
                      <option value="每月">每月</option>
                  </select>
                  <p className="sanjiao-bt"></p>
                </div>
              </li>
              <li className={templateType === '手术' ? styles.liMarginTopZero : ''}>
                <label className={ styles.leftPlaceholder}>提醒</label>
                <div className="select">
                  <select ref="remindRef" defaultValue={datePlanDetail.remind && datePlanDetail.remind.value}>
                      <option value="">请选择</option>
                      <option value="5分钟">5分钟</option>
                      <option value="10分钟">10分钟</option>
                      <option value="30分钟">30分钟</option>
                      <option value="每小时">每小时</option>
                      <option value="一天">一天</option>
                      <option value="一周">一周</option>
                      <option value="一个月">星期日</option>
                      <option value="工作日">工作日</option>
                      <option value="每天">每天</option>
                      <option value="每月">每月</option>
                  </select>
                  <p className="sanjiao-bt"></p>
                </div>
              </li>
              {
                newData && newData.map((datePlanConItem) => {
                  return (
                    <li key={datePlanConItem.label}>
                      <label className={ styles.leftPlaceholder}>{datePlanConItem.label}</label>
                      {this.showFormType(datePlanConItem)}
                    </li>
                  );
                })
              }
            </ul>
            <button className="mainBtn" onClick={this.clickAddBtn.bind(this)}>完成</button>
          </div>
        </div>
      </div>
    );
  }
}

