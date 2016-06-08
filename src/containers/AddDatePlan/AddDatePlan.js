import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { showDiaglog } from '../../redux/modules/diaglog';

import { loadTemplateItem } from '../../redux/modules/addDatePlan';
import { addDatePlan } from '../../redux/modules/addDatePlan';


const styles = require('./AddDatePlan.scss');
@connect(
  state => ({...state.addDatePlan}), {
    loadTemplateItem,
    addDatePlan,
    showDiaglog,
  }
)
export default class AddDatePlan extends Component {
  static propTypes = {
    template: PropTypes.array,
    routeParams: PropTypes.object,
    loadTemplateItem: PropTypes.func,
    showDiaglog: PropTypes.func,
    addDatePlan: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const templateId = this.props.routeParams.id;
    //  TODO 接口地址
    this.props.loadTemplateItem(templateId);
  }

  componentWillReceiveProps(nextProps) {
    this.props.showDiaglog(nextProps.msg, '/date-plan-detail');
  }

  clickAddBtn() {
    const template = this.props.template;
    const templateType = template[0].name;
    const templateCon = template && template[0] && template[0].content;
    const temItem = [];
    for (const iKey in templateCon) {
      if (!templateCon.hasOwnProperty(iKey)) continue;
      const obj = {
        label: templateCon[iKey].label,
        value: this.refs[templateCon[iKey].key].value
      };
      temItem.push(obj);
    }
    const tempObject = {
      name: temItem[0],
      type: {
        label: '日程类型',
        value: this.refs.templateTypeRef.value
      },
      is_inner: {
        label: '是否院内',
        value: this.refs.localRef.value === '院内' ? true : false
      },
      start_time: temItem[1],
      end_time: temItem[2],
      repeat: temItem[3],
      notice: temItem[4],
      content: {},
    };

    if (templateType === '查房') {
      tempObject.content = {
        location: temItem[5],
        participants: temItem[6]
      };
    } else if (templateType === '手术') {
      tempObject.content = {
        patientName: temItem[5],
        gender: temItem[6],
        age: temItem[7],
        operatingRoom: temItem[8],
        diagnosis: temItem[9],
        surgery: temItem[10],
        bodyCycle: temItem[11],
        bedNumber: temItem[12],
        accessStationInfo: temItem[13],
      };
    }else if (templateType === '会议') {
      tempObject.content = {
        type: temItem[5],
        meetLocation: temItem[6],
        meetParticipants: temItem[7]
      };
    }

    this.props.addDatePlan(tempObject);
  }

  showFormType(formItem) {
    if (formItem.type === 'input') {
      return (
        <div>
          <input type="text" ref={formItem.key} />
        </div>
      );
    }
    if (formItem.type === 'radio') {
      return (
        <div className="select">
          <select ref={formItem.key}>
              <option value="">请选择</option>
              {
                formItem && formItem.options && formItem.options.map((option) => {
                  return (
                    <option key={option} value={option}>{option}</option>
                  );
                })
              }
          </select>
          <p className="caret"></p>
        </div>
      );
    }
    if (formItem.type === 'textarea') {
      return (
        <div>
          <textarea className="cardBgRadius" ref={formItem.key}></textarea>
        </div>
      );
    }
  }

  showLocalSelect(templateType) {
    if (templateType === '其他') {
      return (
        <div className="select">
          <select ref="localRef">
            <option value="in">院内</option>
            <option value="out">院外</option>
          </select>
          <p className="caret"></p>
        </div>
      );
    } else {
      return (
        <div>
          <input ref="localRef" className={styles.selectNoCur} value="院内" readOnly="true" />
        </div>
      );
    }
  }

  render() {
    const template = this.props.template;
    const templateCon = template && template[0] && template[0].content;
    const templateType = template && template[0] && template[0].name;
    console.log(templateType);
    return (
      <div>
        <HeadNaviBar>添加日程</HeadNaviBar>
        <div className={ styles.addDatePlan}>
          <div>
            <ul className="cardBgRadius">
              <li>
                <label className={ styles.leftPlaceholder}>日程类型</label>
                <span className={ styles.mainIcon}>*</span>
                <div className={styles.scheduleType}>
                  {this.showLocalSelect(templateType)}
                  <div>
                    <input ref="templateTypeRef" className={styles.selectNoCur} value={templateType} readOnly="true" />
                  </div>
                </div>
              </li>
              {
                templateCon && templateCon.map((templateConItem) => {
                  return (
                    <li key={templateConItem.label}>
                      <label className={ styles.leftPlaceholder}>{templateConItem.label}</label>
                      {this.showFormType(templateConItem)}
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
