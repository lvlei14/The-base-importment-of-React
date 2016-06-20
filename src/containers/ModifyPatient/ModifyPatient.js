import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';

import CardBg from '../../components/CardBg/Card';
import { modifyPatientInfor, loadPatientInformation } from '../../redux/modules/patient';
import { reduxForm } from 'redux-form';
import { loadAccount } from '../../redux/modules/account';

const styles = require('../AddPatient/AddPatient.scss');
@connect(
  state => ({...state.patientInfor, initialValues: state.account.data}), {
    modifyPatientInfor,
    loadPatientInformation,
    load: loadAccount
  }
)
@reduxForm({
  form: 'initializing',                           // a unique name for this form
  fields: [ 'id', 'name', 'gender', 'age', 'roomNum' ],
})
export default class ModifyPatient extends Component {
  static propTypes = {
    patientInfor: PropTypes.object,
    modifyPatientInfor: PropTypes.func,
    loadPatientInformation: PropTypes.func,
    fields: PropTypes.object,
    values: PropTypes.object,
    load: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: this.props.patientInfor.id,
        name: this.props.patientInfor.name,
        gender: this.props.patientInfor.gender,
        age: this.props.patientInfor.age,
        roomNum: this.props.patientInfor.roomNum,
      }
    };
  }

  componentDidMount() {
    // TODO 完善Api地址
    // this.props.loadPatientInformation();
    this.props.load(this.state.data);
  }

  clickAddBtn() {
    // TODO 完善Api地址
    // this.props.modifyPatientInfor();
    console.log('----');
    console.log(this.props.values);
  }

  render() {
    const { fields: { name, gender, age, roomNum }} = this.props;
    return (
      <div className={styles.addPatient}>
        <HeadNaviBar>修改患者信息</HeadNaviBar>
        <section>
          <CardBg>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
              <label className={ styles.leftPlaceholder}>患者姓名</label>
              <div>
                <input type="text" value={name.value} {...name} />
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>性别</label>
              <div className={styles.textALi}>
                <dl className={'clearfix ' + styles.SexLi}>
                  <dt className="left clearfix">
                    <input type="radio" {...gender} checked={gender.value === 'male'} value="male" className="left" />
                    <span className="left">男</span>
                  </dt>
                  <dd className="left clearfix">
                    <input type="radio" value="female" {...gender} checked={gender.value === 'female'} className="left" />
                    <span className="left">女</span>
                  </dd>
                </dl>
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>年龄</label>
              <div>
                <input type="text" {...age} value={age.value} />
              </div>
            </div>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
              <label className={ styles.leftPlaceholder}>床号</label>
              <div>
                <input type="text" {...roomNum} value={roomNum.value} />
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
