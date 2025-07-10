import React from 'react';
import { Platform, PermissionsAndroid, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { image } from './constants/ImageConstants';
import {scaleHeight, scaleWidth } from './Utils';
import { colors } from './constants/ColorConstants';
import { t } from './constants/utils/Localization';

const PDFBillShareButton = async ({ bills, clientData }) => {

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const generateHTML = (bills) => {
    let totalDue = 0;
    let totalOutstanding = 0;

    const formatDate = (date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const currentDate = formatDate(new Date());
    const pdfLogo = clientData?.profileImage ? clientData.profileImage : "https://oberonss.com/images/logo_oberonss.webp"
    const rows = bills.map(bill => {
      totalDue += parseFloat(bill.billAmount) || 0;
      totalOutstanding += parseFloat(bill.balanceAmount) || 0;
      return `
      <tr>
        <td>${bill.billNo}</td>
        <td>${bill.billDate}</td>
                <td style="text-align:right;">${bill.billAmount}</td>
        <td>${bill.receiptAmount}</td>
        <td style="text-align:right;">${bill.balanceAmount}</td>
         <td style="text-align:right;">${bill.dueDate}</td>
          <td style="text-align:right;">${bill.dueDays}</td>
      </tr>
    `;
    }).join('');

    return `
    <html>
    <head>
      <style>
        body { font-family: sans-serif; font-size: 14px; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
        th { background-color: #f4f4f4; }
        h1, h2, h3, h4, p { margin: 4px 0; }
        .header { text-align: center; margin-top: 10px; }
        .content { margin-top: 20px; }
        .footer { margin-top: 30px; line-height: 1.5; }
        tfoot td { font-weight: bold; }
        .right { text-align: right; }
        .logo-container { text-align: center; margin-bottom: 10px; }
        .logo-container img { max-width: 150px; }
      </style>
    </head>
    <body>
      <div class="logo-container">
        <img src=${pdfLogo} alt="Company Logo" />
      </div>

      <div class="header">
        <h2>OUTSTANDING STATEMENT</h2>
        <p><strong>Credit Period:</strong> NIL</p>
        <p><strong>${clientData?.companyAddress}
        </strong>       
        </p>
      </div>
<div style="margin-top:100px">
      <div class="content">
        <p style="margin-top:20px;margin-bottom:20px">Dear Sir/ Madam,</p>
        <p style="margin-top:20px;margin-bottom:20px"><strong>SUB: OUTSTANDING STATEMENT AS OF DATE ${currentDate}</strong></p>
        <p style="margin-top:20px;margin-bottom:20px">
          Kindly find the outstanding statement below, as per our books as on ${currentDate}.<br />
          We request you to clear the payment of <strong>INR ${totalOutstanding.toFixed(2)}/-</strong> at the earliest.
        </p>
        <p style="margin-top:20px;margin-bottom:20px">
          In case you have paid for any of the below bills, kindly arrange to forward us the payment details so we can update our records accordingly.
        </p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Bill No</th>
            <th>Date</th>
            <th>Amount</th>
              <th>Receipt</th>
            <th>Balance</th>
             <th>Due Date</th>
              <th>Due Days</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Total</td>
            <td class="right">${totalDue.toFixed(2)}</td>
            <td class="right">${totalOutstanding.toFixed(2)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div class="footer">
        <h4>RTGS / NEFT DETAILS</h4>
        <p>
          <strong>Acct. Name :</strong> ${clientData?.companyName}<br />
          <strong>Acct. No :</strong> ${clientData?.companyAccountNo}<br />
          <strong>Bank Name :</strong> ${clientData?.companyBankName}<br />
          <strong>SWIFT Code :</strong> ${clientData?.companySwiftCode}
        </p>
        <p style="margin-top:50px">Regards,</p>
        <p style="margin-top:0px;"><strong>Accounts Department</strong><br />
        ${clientData?.companyName}</p>
         </div>
      </div>
    </body>
    </html>
  `;
  };

  const createAndSharePDF = async () => {
    // const permission = await requestPermission();
    try {
      const html = generateHTML(bills);
      // const pdfFilePath = `${RNFS.CachesDirectoryPath}/BillSummary.pdf`;

      const file = await RNHTMLtoPDF.convert({
        html,
        fileName: 'BillSummary',
        base64: false,
        directory: 'Cache',
      });

      const filePath = file.filePath;
      await Share.open({
        title: 'Send Bill Summary',
        subject: 'Bill Summary PDF',
        email: 'abdullahydershaikh@gmail.com',
        message: 'Please find attached your bill summary.',
        url: Platform.OS === 'android' ? `file://${filePath}` : filePath,
        social: Share.Social.EMAIL,
      });
      // Auto-delete the PDF after sharing
      setTimeout(() => {
        RNFS.unlink(filePath)
          .then(() => console.log('Temporary PDF deleted.'))
          .catch(err => console.log('Failed to delete PDF:', err));
      }, 1000);
    } catch (error) {
      console.error('Error creating/sharing PDF:', error);
    }
  };

  return (
    <TouchableOpacity onPress={createAndSharePDF} style={styles.actionButton}>
      <Image style={styles.actionIcon} source={image.billCard.share} />
      <Text style={styles.actionText}>{t('share_all')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#e0f1f1',
    borderColor: '#007777',
    borderRadius: 6,
    borderWidth: 0.1,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  actionIcon: {
    height: scaleHeight(15),
    tintColor: colors.buttonTeal,
    width: scaleWidth(15)
  },
  actionText: {
    color: '#007777',
    fontWeight: '500',
    marginLeft: scaleWidth(5)

  }
})

export default PDFBillShareButton;