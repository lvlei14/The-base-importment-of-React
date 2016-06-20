import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import {push} from 'react-router-redux';
import CardBg from '../../components/CardBg/Card';
import { createPatient } from '../../redux/modules/patient';
import { reduxForm } from 'redux-form';

const styles = require('./AddPatient.scss');

@connect(state => ({
  contact: state.form.contact,
  ...state.patient}), {
    createPatient,
    push
  }
)
@reduxForm({
  form: 'addPatient',                           // a unique name for this form
  fields: ['name', 'gender', 'age', 'bedNumber', 'mark', 'mobile']
})
export default class AddPatient extends Component {
  static propTypes = {
    createPatient: PropTypes.func,
    addPatientSuccess: PropTypes.bool,
    loading: PropTypes.bool,
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string,
    fields: PropTypes.object,
    values: PropTypes.object,
    push: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.addPatientSuccess && nextProps.addPatientSuccess) {
      this.props.push('/opera-patient');
      alert(nextProps.successMsg);
    }
  }

  clickAddBtn() {
    const {values} = this.props;
    console.log(values);
    this.props.createPatient(values);
  }

  render() {
    const {fields: {name, gender, age, bedNumber, mobile, mark}} = this.props;
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
          <button className="mainBtn" onClick={this.clickAddBtn.bind(this)}>确认</button>
        </footer>
      </div>
    );
  }
}
