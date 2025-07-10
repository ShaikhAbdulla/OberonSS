import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { t } from '../../constants/utils/Localization';
import { formatAmount } from '../../Utils';

const BillDetailModal = ({ visible, onClose, billData, onSave, onShare }) => {
  if (!billData) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{t('bill_details')}</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{t('bill_no')}:</Text>
            <Text style={styles.value}>{billData.billNo}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{t('bill_date')}:</Text>
            <Text style={styles.value}>{billData.billDate}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{t('bill_amount')}:</Text>
            <Text style={styles.value}>₹ {formatAmount(billData.billAmount)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{t('receipt_amount')}:</Text>
            <Text style={styles.value}>₹ {billData.receiptAmount}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{t('balance_amount')}:</Text>
            <Text style={styles.value}>₹ {formatAmount(billData.balanceAmount)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{t('due_date')}:</Text>
            <Text style={styles.value}>{billData.dueDate}</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onSave} style={styles.saveBtn}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare} style={styles.shareBtn}>
              <Text style={styles.btnText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BillDetailModal;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  close: {
    color: '#333',
    fontSize: 18,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    color: '#444',
    fontWeight: '600',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 10,
    padding: 20,
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  shareBtn: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    color: '#000',
  },
});
