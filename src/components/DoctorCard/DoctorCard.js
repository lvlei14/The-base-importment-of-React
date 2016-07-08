import React, {PropTypes} from 'react';

const styles = require('./DoctorCard.scss');

export function DoctorCardWithIcon(props) {
  const doctor = props.doctor || {};
  return (
    <div className={styles.doctorIntroCardContainer}>
      <div className={styles.doctorName}>
        {doctor.name || '匿名'}
      </div>
      <div className={styles.doctorTitle}>
        主治医师；副教授；博士研究生；
      </div>
      <div className={styles.doctorBelong}>
        北大人民医院；神经内科
      </div>
      <img src="http://wx.qlogo.cn/mmopen/ZvwXw6l6MvicibiaAwEdfqxETJj9mnKvn4icXEVj3oeA960e1qV3WicCTAF8B4ZuBYgsqtCtvS7TRWd36cia1t3EAcicNhPm6feiaxYN/0"/>
    </div>
  );
}

export function DoctorCardWithDetail(props) {
  const doctor = props.doctor || {};
  return (
    <div className={styles.DoctorDescContainer}>
      <div>
        <label>性别</label>
        <p>{doctor.gender}</p>
      </div>
      <div>
        <label>年龄</label>
        <p>40</p>
      </div>
      <div>
        <label>所在城市</label>
        <p>北京市</p>
      </div>
      <div>
        <label>联系电话</label>
        <p>18514007293</p>
      </div>
      <div>
        <label>擅长领域</label>
        <p>神经科</p>
      </div>
      <div>
        <label>职业经历</label>
        <p>2016惺惺惜惺惺惺惺惜惺惺</p>
      </div>
    </div>
  );
}


export function InvitationDetail(props) {
  return (
    <div className={styles.DoctorDescContainer}>
      <div>
        <label>需求时间</label>
        <p>2016-06-07 06：30</p>
      </div>
      <div>
        <label>医疗类型</label>
        <p>门诊</p>
      </div>
      <div>
        <label>医院地址</label>
        <p>北京市---------</p>
      </div>
      <div>
        <label>科室电话</label>
        <p>99329321</p>
      </div>
      <div>
        <label>出行方式</label>
        <p>飞机</p>
      </div>
      <div>
        <label>备注</label>
        <p>无</p>
      </div>
      <div>
        <label>状态</label>
        <p>已完成</p>
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
  // TODO propTypes
};
