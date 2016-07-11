import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import Modal from '../../components/Modal/Modal';
import { DoctorDetailCard, InvitationDetail, HeadNaviBar} from '../../components';
// import { showDiaglog } from '../../redux/modules/diaglog';

import { loadAppartNeedById } from '../../redux/modules/invitation';

const styles = require('./NeedApartmentDetail.scss');

@connect(
  state => ({...state.invitation}), {
    pushState: push,
    loadAppartNeedById,
    // showDiaglog
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
          <div className={styles.needDetailMargin}>
            <InvitationDetail need={invitation} />
          </div>
          {
            doctors && doctors.map((doctorItem) => {
              return (
                <div className={styles.needDetailMargin}><DoctorDetailCard key={doctorItem._id} doctor={doctorItem} /></div>
              );
            })
          }
          {
            invitation.operation === '结束' ? <button className="mainBtn" onClick={() => this.clickGoToComment(id)}>去评价</button> : ''
          }
        </div>
      </div>
    );
  }
}

