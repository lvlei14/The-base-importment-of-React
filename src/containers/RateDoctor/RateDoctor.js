import React, { PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./RateDoctor.scss');
import {createComment}from '../../redux/modules/comment';
import { showDiaglog } from '../../redux/modules/diaglog';
import { loadAppartNeedById } from '../../redux/modules/invitation';
import {DoctorCardWithIcon, Rate, /* DoctorDetailCard */} from '../../components';

// DoctorCardWithDetail

@connect((state) => ({
  ...state.comment,
  invitation: state.invitation && state.invitation.invitation}), {
    push,
    showDiaglog,
    createComment,
    loadAppartNeedById
  }
)
class RateDoctor extends React.Component {
  static propTypes = {
    push: PropTypes.func,
    createComment: PropTypes.func,
    routeParams: PropTypes.object,
    addCommentSuccess: PropTypes.bool,
    successMsg: PropTypes.string,
    invitation: PropTypes.object,
    loadAppartNeedById: PropTypes.func,
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
    const {id} = this.props.routeParams;
    this.props.loadAppartNeedById(id);
  }

  componentWillReceiveProps(nextProps) {
    const {id} = this.props.routeParams;
    if (!this.props.addCommentSuccess && nextProps.addCommentSuccess) {
      this.props.showDiaglog(nextProps.successMsg, '/appart-need-detail/' + id);
    }
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

  rateChange(state) {
    // console.log(state);
    this.setState({
      rates: state.rates,
      comment: state.comment
    });
  }

  render() {
    const {recipient, start_time, medicalCategory} = this.props.invitation;
    // console.log(recipient);
    const acceptedDoctor = recipient && recipient[0];
    return (
      <div>
        <HeadNaviBar>评价</HeadNaviBar>
        <div className={styles.container}>
          {/* 医生卡片式介绍 */}
          <div className={styles.needAppartDetailCardTwo}><DoctorCardWithIcon doctor={acceptedDoctor} /></div>
          <div className={styles.invitationDescContainer}>
            <div>
              <label>需求时间</label>
              <p>{start_time}</p>
            </div>
            <div>
              <label>医疗类型</label>
              <p>{medicalCategory}</p>
            </div>
            <div>
              <label>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</label>
              <p className={styles.completeStatus}>已完成</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.commentTip}>请为此次调度进行评价:</div>
            {/* 评论控件 */}
            <Rate rates={this.state.rates}
                  onChange={this.rateChange.bind(this)}
                  commentPlaceholder="请输入您对本次调度的建议或意见，最多200个字。"
                  initTextComment={this.state.comment}/>
          </div>
          <button className="mainBtn" onClick={this.submitRate.bind(this)}>发表评价</button>
        </div>
      </div>
    );
  }
}

export default RateDoctor;
