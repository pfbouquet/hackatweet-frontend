// SignUpModal.js
import React from 'react';
import { Modal, Input, Button } from 'antd';
import styles from '../styles/SignUpModal.module.css';

const SignUpModal = ({ visible, onCancel }) => {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      closable={true}
      className={styles.modal}
      centered
    >
      <div className={styles.content}>
        <img src="/logo_white.webp" alt="Logo" className={styles.logo} />
        <h2>Create ton kick account</h2>
        <Input className={styles.input} placeholder="Premiername" />
        <Input placeholder="Kickername" className={styles.input} />
        <Input.Password placeholder="JCVDMDP" className={styles.input} />
        <Button type="primary" className={styles.signupButton}>
          Kick up
        </Button>
      </div>
    </Modal>
  );
};

export default SignUpModal;