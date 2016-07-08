import React, { PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const Rate = require('rc-rate');
const styles = require('./RateDoctor.scss');
import {createComment}from '../../redux/modules/comment';
import { showDiaglog } from '../../redux/modules/diaglog';


@connect((state) => ({
  ...state.comment}), {
    push,
    showDiaglog,
    createComment
  }
)
class RateDoctor extends React.Component {
  static propTypes = {
    push: PropTypes.func,
    createComment: PropTypes.func,
    routeParams: PropTypes.object,
    addCommentSuccess: PropTypes.bool,
    successMsg: PropTypes.string,
    showDiaglog: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      rates: [
        {name: '医学水平', field: 'skill', score: 0},
        {name: '服务态度', field: 'attitude', score: 0},
        {name: '时间保障', field: 'timeEffort', score: 0},
      ],
      comment: ''
    };
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.addCommentSuccess && nextProps.addCommentSuccess) {
      this.props.showDiaglog(nextProps.successMsg);
    }
  }

  clickRateStar(score, index) {
    const rates = this.state.rates;
    this.setState({
      rates: [...rates.slice(0, index), {...rates[index], score: score}, ...rates.slice(index + 1)]
    });
  }

  showTips(score) {
    let tips = '';
    if (score <= 0) {
      tips = <i style={{fontStyle: 'normal', color: '#CA3922'}}>尚未评价</i>;
    } else if (score > 0 && score <= 3) {
      tips = '任需努力';
    } else {
      tips = '很好';
    }
    return tips;
  }

  submitRate() {
    const {rates} = this.state;
    // 检查是否有未评价的栏目
    if (rates.reduce((sum, rate) => sum + rate.score, 0) < rates.length) {
      this.props.showDiaglog('请评价');
      return;
    }
    const comment = this.state.rates.reduce((obj, rate) => {
      obj[rate.field] = rate.score;
      return obj;
    }, {});
    comment.desc = this.state.comment;
    comment.invitation = this.props.routeParams && this.props.routeParams.id;
    console.log(comment);
    this.props.createComment(comment);
  }

  handleCommentInput(event) {
    this.setState({
      comment: event.target.value
    });
  }

  render() {
    return (
      <div>
        <HeadNaviBar>评价</HeadNaviBar>
        <div className={styles.container}>
          <div className={styles.doctorIntroCardContainer}>
            <div className={styles.doctorName}>
              王红
            </div>
            <div className={styles.doctorTitle}>
              主治医师；副教授；博士研究生；
            </div>
            <div className={styles.doctorBelong}>
              北大人民医院；神经内科
            </div>
            <img src="http://wx.qlogo.cn/mmopen/ZvwXw6l6MvicibiaAwEdfqxETJj9mnKvn4icXEVj3oeA960e1qV3WicCTAF8B4ZuBYgsqtCtvS7TRWd36cia1t3EAcicNhPm6feiaxYN/0"/>
          </div>

          <div className={styles.invitationDescContainer}>
            <div>
              <label>需求时间</label>
              <p>2016-06-04 16:00</p>
            </div>
            <div>
              <label>医疗类型</label>
              <p>门诊</p>
            </div>
            <div>
              <label>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</label>
              <p className={styles.completeStatus}>已完成</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.commentTip}>请为此次调度进行评价:</div>
            <div className={styles.rateContainer}>
              {
                this.state.rates.map((rate, index) => {
                  return (
                    <div>
                      <p>{rate.name}</p>
                      <Rate value={rate.score} onChange={(score) => this.clickRateStar(score, index)}/>
                      <span>{this.showTips(rate.score)}</span>
                    </div>
                  );
                })
              }
            </div>

            <div className={styles.commentContainer}>
              <textarea placeholder="请输入您对本次调度的建议或意见，最多200个字。"
                        value={this.state.comment}
                        onChange={this.handleCommentInput.bind(this)} />
            </div>
          </div>
          <button className="mainBtn" onClick={this.submitRate.bind(this)}>发表评价</button>
        </div>
      </div>
    );
  }
}

export default RateDoctor;
