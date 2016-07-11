import React, {PropTypes} from 'react';
// import moment from 'moment';

const styles = require('./DoctorCard.scss');

export function DoctorCardWithIcon(props) {
  const doctor = props.doctor || {};
  return (
    <div className={styles.doctorIntroCardContainer}>
      <div className={styles.doctorName}>
        {doctor.name || '匿名'}
      </div>
      <div className={styles.doctorTitle}>
        {doctor.level && doctor.level.name}
      </div>
      <div className={styles.doctorBelong}>
        {doctor.hospital && doctor.hospital.name}&nbsp;{doctor.apartment && doctor.apartment.name}
      </div>
      <img src={doctor.avatar} />
    </div>
  );
}

export function DoctorCardWithDetail(props) {
  const doctor = props.doctor || {};
  return (
    <div className={styles.DoctorDescContainer}>
      <div>
        <label>性别</label>
        <p>{doctor.gender === 'male' ? '男' : '女'}</p>
      </div>
      <div>
        <label>年龄</label>
        <p>{doctor.age}</p>
      </div>
      <div>
        <label>所在城市</label>
        <p>{doctor.hospital && doctor.hospital.name}</p>
      </div>
      <div>
        <label>联系电话</label>
        <p>{doctor.mobile}</p>
      </div>
      <div>
        <label>擅长领域</label>
        <p>{doctor.expertField}</p>
      </div>
      <div>
        <label>执业经历</label>
        <p>{doctor.professionalExperience}</p>
      </div>
    </div>
  );
}


export function ShowStatusText(props) {
  let statusText;
  const need = props && props.need || {};
  if (need.status === '待接受') {
    statusText = (<span style={{color: '#CA3922'}}>{need.status}</span>);
  } else if (need.status === '处理中') {
    statusText = (<span style={{color: '#41C299'}}>已接受</span>);
  } else {
    statusText = (<span style={{color: '#B4B4B4'}}>{need.status}</span>);
  }
  return statusText;
}

export function InvitationDetail(props) {
  const need = props.need || {};
  return (
    <div className={styles.DoctorDescContainer}>
      <div style={{color: '#41C299'}}>
        <label>需求时间</label>
        <p>{need.start_time}</p>
      </div>
      <div style={{color: '#41C299'}}>
        <label>医疗类型</label>
        <p>{need.medicalCategory}</p>
      </div>
      <div>
        <label>医院地址</label>
        <p>{need.address || '无'}</p>
      </div>
      <div>
        <label>联系电话</label>
        <p>{need.mobile || '无'}</p>
      </div>
      <div>
        <label>出行方式</label>
        <p>{need.transportation || '无'}</p>
      </div>
      <div>
        <label>备注</label>
        <p>{need.remark || '无'}</p>
      </div>
      <div>
        <label>状态</label>
        <p><ShowStatusText need = {need} /></p>
      </div>
    </div>
  );
}


export function DividerLine(props) {
  const {text} = props;
  return (
    <div className={styles.dividerContainer}>
      <div className={styles.divider}></div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}


export function DoctorDetailCard(props) {
  const {doctor} = props;
  return (
    <div className={styles.doctorCardDetailContainer}>
      <DoctorCardWithIcon doctor={doctor} />
      <DividerLine text="专家简介" />
      <DoctorCardWithDetail doctor={doctor} />
    </div>
  );
}

// 带头像
DoctorCardWithIcon.propTypes = {
  doctor: PropTypes.object
};

// 性别，手机号码等
DoctorCardWithDetail.propTypes = {
  doctor: PropTypes.object
};

// DoctorCardWithIcon  DoctorCardWithDetail DividerLine 合在一块
DoctorDetailCard.propTypes = {
  doctor: PropTypes.object
};

// 分界线
DividerLine.propTypes = {
  text: PropTypes.string
};

// 邀请详情
InvitationDetail.propTypes = {
  need: PropTypes.object
};
