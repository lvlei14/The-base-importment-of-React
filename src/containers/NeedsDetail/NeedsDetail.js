import React, {Component, PropTypes} from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import {connect} from 'react-redux';


const styles = require('./NeedsDetail.scss');

export default class NeedsDetail extends Component {
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
    const star = require('../../images/starNeedsDetail.png');

    return (
      <div>
        <HeadNaviBar>我的需求</HeadNaviBar>
        <div className={styles.bigView}>
          <div className={styles.smallView}>

            <div className={styles.topView}>
              <img src="/mui/images/YCbanner.png"/>
              <p>鲁中医院心外科</p>
              <div className={styles.star}>
                <img src={star}/>
                <p>收藏</p>
              </div>

            </div>

            <div className={styles.middleView}>
              <p className={styles.timeP}>需求时间:&nbsp;&nbsp;2016-06-07&nbsp;&nbsp;16:00</p>
              <p className={styles.leiXingP}>医疗类型:&nbsp;&nbsp;门诊</p>
              <p className={styles.diZhiP}>医院地址:&nbsp;&nbsp;山东省淄博市某区某街道莫地址莫栋某号</p>
              <p className={styles.diZhiP}>科室简介:&nbsp;&nbsp;山东大学齐鲁医院心血管外科创建于1959年，是山东省最早创立的该类专业。50余年来，经先后四代人的探索和努力，现已形成具有巨大优势和学术特色的专业科室，医疗水平和工作规模位居全国综合性医院前列，在国内享有较高的知名度，在山东省心血管外科专业中处于绝对领先地位，为山东省及我国的心血管外科事业的发展做出了应有的贡献。</p>

            </div>

            <div className={styles.btnDiv}>
              <button className={styles.accepd}>接受邀约</button>
              <button className={styles.refuse}>拒绝邀约</button>
            </div>
          </div>


        </div>

      </div>
    );
  }
}

