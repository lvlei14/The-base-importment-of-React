import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';

import CardBg from '../../components/CardBg/Card';
import { addPatientInfor } from '../../redux/modules/addPatient';
import { reduxForm } from 'redux-form';

const styles = require('./AddPatient.scss');

@connect(
  state => ({contact: state.form.contact}), {
    addPatientInfor,
  }
)
@reduxForm({
  form: 'contact',                           // a unique name for this form
  fields: ['name', 'gender', 'age', 'roomNum']
})
export default class AddPatient extends Component {
  static propTypes = {
    addPatientInfor: PropTypes.func,
    fields: PropTypes.object,
    values: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  clickAddBtn() {
    const {values} = this.props;
    console.log(values);
    // TODO 完善Api地址
    // this.props.addPatientInfor();
  }

  render() {
    const {fields: {name, gender, age, roomNum}} = this.props;
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
              <label className={ styles.leftPlaceholder}>年龄</label>
              <div>
                <input type="text" {...age} />
              </div>
            </div>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
              <label className={ styles.leftPlaceholder}>床号</label>
              <div>
                <input type="text" {...roomNum} />
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
