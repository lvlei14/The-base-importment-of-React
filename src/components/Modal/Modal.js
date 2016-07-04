import React, { Component, PropTypes } from 'react';

const styles = require('./Modal.scss');

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.array,
    title: PropTypes.string,
    clickHideModal: PropTypes.func,
    clickConfirm: PropTypes.func,
    clickCancel: PropTypes.func,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    hideHideModalBtn: PropTypes.bool,
    hideModalFooter: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps() {
  }

  render() {
    const {confirmText, cancelText} = this.props;
    let confirmTextCon;
    let cancelTextCon;
    if (confirmText) {
      confirmTextCon = confirmText;
    } else {
      confirmTextCon = '确定';
    }
    if (cancelText) {
      cancelTextCon = cancelText;
    } else {
      cancelTextCon = '取消';
    }
    return (
      <div>
        <div className={styles.modalFa}>
          <div className={styles.modal}>
            <p className={'bodyBgWhite ' + styles.modalBg}></p>
            <div className={'bodyBgWhiteZindex ' + styles.modalSection}>
              <header className={'clearfix ' + styles.modalTitle}>
                <h3>{this.props.title}</h3>
                <span style={{display: this.props.hideHideModalBtn ? 'none' : 'block'}} onClick={this.props.clickHideModal}></span>
              </header>
              <section className={styles.modalSectionSection}>{this.props.children}</section>
              <footer style={{display: this.props.hideModalFooter ? 'none' : 'block'}} className={styles.modalButton + ' clearfix'}>
                <button className="left" onClick={this.props.clickCancel}>{cancelTextCon}</button>
                <button className={'right ' + styles.modalConfirm} onClick={this.props.clickConfirm}>{confirmTextCon}</button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

