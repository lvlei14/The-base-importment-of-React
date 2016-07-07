import React, {Component, PropTypes} from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import {connect} from 'react-redux';


const styles = require('./MyNeeds.scss');

export default class MyNeeds extends Component {
  // static propTypes = {
  //
  // };

  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  render() {
    const moreArrow = require('../../images/moreArrow.png');

    return (
      <div>
        <HeadNaviBar>我的需求</HeadNaviBar>

        <div id="underView" className={styles.bigUnderView}>
          <div className={styles.underView}>
              <img src="/mui/images/YCbanner.png"/>
              <div className={styles.rightText}>
                <div className={styles.doctorName}>
                  <p className={styles.name}>鲁中医院心外科</p>
                </div>
                <p className={styles.hospital}>医疗类型:&nbsp;&nbsp;门诊</p>
                <p className={styles.jobTitle}>需求时间:&nbsp;&nbsp;2016-06-07&nbsp;&nbsp;16:00</p>
                <div className={styles.phoneNum}>
                  <p className={styles.Num}>联系电话:&nbsp;&nbsp;8888888</p>
                  <div className={styles.dial}>拨打电话</div>
                </div>
              </div>
              <img className={styles.rightMore} src={moreArrow}/>
          </div>
        </div>
      </div>
    );
  }
}

