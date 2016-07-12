import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { DoctorDetailCard, DividerLine, InvitationDetail, HeadNaviBar, Rate } from '../../components';

import { loadAppartNeedById } from '../../redux/modules/invitation';

const styles = require('./NeedApartmentDetail.scss');

@connect(
  state => ({...state.invitation}), {
    pushState: push,
    loadAppartNeedById,
  }
)
export default class NeedApartmentDetail extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadAppartNeedById: PropTypes.func,
    invitation: PropTypes.object,
    routeParams: PropTypes.object,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {id} = this.props.routeParams;
    this.props.loadAppartNeedById(id);
  }

  componentWillReceiveProps(nextProps) {
    const comment = nextProps.invitation && nextProps.invitation.comment;
    this.state = {
      dataCom: nextProps.invitation && nextProps.invitation.comment,
      rates: [
        {name: '医学水平', field: 'skill', score: comment && comment.skill},
        {name: '服务态度', field: 'attitude', score: comment && comment.attitude},
        {name: '时间保障', field: 'timeEffort', score: comment && comment.timeEffort},
      ],
      comment: comment && comment.desc
    };
  }

  clickGoToComment(id) {
    this.props.pushState('/rate/' + id);
  }

  render() {
    const {status} = this.props.location.query;
    const { id } = this.props.routeParams;
    const invitation = this.props.invitation || {};
    invitation.status = status;
    let doctors;
    if (status === '待接受' || invitation.operation === '取消' && invitation.recipient && invitation.recipient.length === 0) {
      doctors = invitation.doctors;
    } else if (status === '已拒绝') {
      doctors = invitation.rejection;
    } else {
      doctors = invitation.recipient;
    }
    return (
      <div>
        <HeadNaviBar>需求详情</HeadNaviBar>
        <div className={styles.needAppartDetail}>
          {
            invitation.operation === '取消' && invitation.recipient && invitation.recipient.length === 0 ?
              <dl className={styles.needAppartDetailCard}>
                <dt className={styles.conflict}><i>!</i>该需求已被专家取消！</dt>
                <dd>取消原因：{invitation && invitation.reason}</dd>
              </dl>
            : ''
          }
          <div style={{display: !invitation.comment ? 'block' : 'none'}} className={styles.needAppartDetailCardTwo}>
            <InvitationDetail need={invitation} />
          </div>
          <div className={styles.needAppartDetailCardTwo}>
            {
              doctors && doctors.map((doctorItem) => {
                return (
                  <div key={doctorItem._id} className={styles.needDetailMargin}><DoctorDetailCard doctor={doctorItem} /></div>
                );
              })
            }
          </div>
          {
            invitation.comment ?
              <div className={styles.needAppartDetailCardTwo}>
                <InvitationDetail need={invitation} />
                <DividerLine text={'评价'} />
                <Rate rates={this.state.rates}
                  editable = {false}
                  initTextComment={this.state.comment}/>
              </div>
            : invitation.operation === '结束' ? <button className="mainBtn" onClick={() => this.clickGoToComment(id)}>去评价</button> : ''
          }
        </div>
      </div>
    );
  }
}

