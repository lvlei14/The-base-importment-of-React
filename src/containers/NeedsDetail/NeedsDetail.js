import React, {Component, PropTypes} from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import Modal from '../../components/Modal/Modal';
import { showDiaglog } from '../../redux/modules/diaglog';

const styles = require('./NeedsDetail.scss');
import { loadExpertInvitationDetail, acceptAnInvitation, refusetAnInvitation } from '../../redux/modules/needsdetail';


@connect(
  state => ({...state.needsdetail,
  }), {
    pushState: push,
    loadExpertInvitationDetail,
    acceptAnInvitation,
    refusetAnInvitation,
    showDiaglog,
  }
)

export default class needsdetail extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadExpertInvitationDetail: PropTypes.func,
    acceptAnInvitation: PropTypes.func,
    refusetAnInvitation: PropTypes.func,
    showDiaglog: PropTypes.func,
    routeParams: PropTypes.object,

  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  componentDidMount() {
    const id = this.props.routeParams.id;
    this.props.loadExpertInvitationDetail(id);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.refuseSuccess && nextProps.refuseSuccess) {
      this.props.pushState('/my-needs/');
      return;
    }

    if (!this.props.acceptSuccess && nextProps.acceptSuccess) {
      this.props.pushState('/my-needs/');
      return;
    }
  }

  acceptAnInvitation(id, result, reason, status) {
    console.log(status + '打印');
    this.props.acceptAnInvitation(id, result, reason, status);
  }

  refusetAnInvitation() {
    this.setState({
      showModal: true
    });
  }

  clickHideModal() {
    this.setState({
      showModal: false,
    });
  }

  clickdeny() {
    this.clickHideModal();
  }

  clickaccept() {
    console.log(this.props.routeParams.status + '偶尔发武汉');
    this.clickHideModal();
    this.props.refusetAnInvitation(this.props.details._id && this.props.details._id, '取消', this.refs.refuseText.value, this.props.routeParams && this.props.routeParams.status);
  }

  acceptAndRefuseBtn(type, status) {
    if (type === '1') {
      return <div className={styles.btnDiv}>
        <button className={styles.accepd} onClick={() => this.acceptAnInvitation(details && details._id, '接受', 'reason', this.props.routeParams && this.props.routeParams.status)}>接受邀约</button>
        <button className={styles.refuse} onClick={() => this.acceptAnInvitation(details && details._id, '拒绝', 'reason', this.props.routeParams && this.props.routeParams.status)}>拒绝邀约</button>
      </div> ;

    }else if (type === '2' && status === '已取消') {

      return <div className={styles.btnDiv}>
      </div> ;
    }else {
      return <div className={styles.btnDiv}><button className={styles.cancel} onClick={() => this.refusetAnInvitation()}>取消需求</button>
      </div> ;
    }
  }

  render() {
    const star = require('../../images/starNeedsDetail.png');
    const needsBg = require('../../images/needsBg.png');
    const details = this.props.details;

    return (
        <div>
          <HeadNaviBar>我的需求</HeadNaviBar>
          <div className={styles.bigView}>
            <div className={styles.smallView}>

              <div className={styles.topView}>
                <img src={needsBg}/>
                <p>{details.apartment && details.apartment.name}</p>
                <div className={styles.star}>
                  <img src={star}/>
                  <p>收藏</p>
                </div>

              </div>

              <div className={styles.middleView}>
                <p className={styles.timeP}>需求时间:&nbsp;&nbsp;{details && details.start_time}</p>
                <p className={styles.leiXingP}>医疗类型:&nbsp;&nbsp;{details && details.medicalCategory}</p>
                <p className={styles.diZhiP}>医院地址:&nbsp;&nbsp;{details && details.address}</p>
                <p className={styles.diZhiP}>科室简介:&nbsp;&nbsp;{details.apartment && details.apartment.desc}</p>

              </div>
              {
                this.acceptAndRefuseBtn(this.props.routeParams && this.props.routeParams.type, this.props.routeParams && this.props.routeParams.status)
              }

            </div>


          </div>

          <div style={{display: this.state.showModal ? 'block' : 'none'}}>
            <Modal
              title = {'取消需求'}
              confirmText = {'提交'}
              cancelText = {'放弃'}
              clickHideModal = {this.clickHideModal.bind(this)}
              clickConfirm = {this.clickaccept.bind(this)}
              clickCancel = {this.clickdeny.bind(this)} >
              <textarea ref="refuseText"></textarea>
            </Modal>
          </div>

        </div>
    );
  }
}

