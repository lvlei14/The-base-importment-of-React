import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import {push} from 'react-router-redux';
import { reduxForm } from 'redux-form';
import CardBg from '../../components/CardBg/Card';

import { createPatient, getPatientById, modifyPatientById, clearInitPatient } from '../../redux/modules/patient';

const styles = require('./AddPatient.scss');

@connect(state => ({
  contact: state.form.contact,
  ...state.patient}), {
    createPatient,
    getPatientById,
    modifyPatientById,
    clearInitPatient,
    push
  }
)
@reduxForm({
  form: 'addPatient',                           // a unique name for this form
  fields: ['name', 'gender', 'age', 'bedNumber', 'mark', 'mobile']
}, state => ({
  initialValues: state.patient.patient // will pull state into form's initialValues
}))
export default class AddPatient extends Component {
  static propTypes = {
    createPatient: PropTypes.func,
    addPatientSuccess: PropTypes.bool,
    modifyPatientSuccess: PropTypes.bool,
    loading: PropTypes.bool,
    location: PropTypes.object,
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string,
    fields: PropTypes.object,
    values: PropTypes.object,
    push: PropTypes.func,
    getPatientById: PropTypes.func,
    modifyPatientById: PropTypes.func,
    clearInitPatient: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {id} = this.props.location.query;
    if (id) {
      this.props.getPatientById(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.addPatientSuccess && nextProps.addPatientSuccess) {
      this.props.push('/opera-patient');
      alert(nextProps.successMsg);
    }
    if (!this.props.modifyPatientSuccess && nextProps.modifyPatientSuccess) {
      this.props.push('/opera-patient');
      this.props.clearInitPatient();
      alert(nextProps.successMsg);
    }
    if (!this.props.errorMsg && nextProps.errorMsg) {
      alert(nextProps.errorMsg);
    }
  }

  clickAddBtn() {
    const {values} = this.props;
    console.log(values);
    this.props.createPatient(values);
  }

  clickModifyBtn() {
    const {values} = this.props;
    const {id} = this.props.location.query;
    this.props.modifyPatientById(id, values);
  }

  render() {
    const {fields: {name, gender, age, bedNumber, mobile, mark}} = this.props;
    const {id} = this.props.location.query;
    return (
      <div className={styles.addPatient}>
        <HeadNaviBar>添加患者</HeadNaviBar>
        <section>
          <CardBg>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
              <label className={ styles.leftPlaceholder}>患者姓名</label>
              <div>
                <input type="text" {...name} />
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>性别</label>
              <div className={styles.textALi}>
                <dl className={'clearfix ' + styles.SexLi}>
                  <dt className="left clearfix">
                    <input type="radio" {...gender} value="male" checked={gender.value === 'male'} className="left" />
                    <span className="left">男</span>
                  </dt>
                  <dd className="left clearfix">
                    <input type="radio" {...gender} value="female" checked={gender.value === 'female'} className="left" />
                    <span className="left">女</span>
                  </dd>
                </dl>
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>电话</label>
              <div>
                <input type="text" {...mobile} />
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>年龄</label>
              <div>
                <input type="text" {...age} />
              </div>
            </div>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
              <label className={ styles.leftPlaceholder}>床号</label>
              <div>
                <input type="text" {...bedNumber} />
              </div>
            </div>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
              <label className={ styles.leftPlaceholder}>备注</label>
              <div>
                <input type="text" {...mark} />
              </div>
            </div>
          </CardBg>
        </section>
        <footer>
          {
            !id ?
              <button className="mainBtn" onClick={this.clickAddBtn.bind(this)}>确认</button>
              :
              <button className="mainBtn" onClick={this.clickModifyBtn.bind(this)}>修改</button>
          }
        </footer>
      </div>
    );
  }
}
