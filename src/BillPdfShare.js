import { Alert, Platform, PermissionsAndroid } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { ToastMessage } from './Utils';

export const BillPdfGenerate = async (data, userData, download) => {

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version <= 29) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to save PDF files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const formatINR = (amount) => {
    return `₹${parseFloat(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const generateInvoiceHTML = (data) => {
    // const today = new Date().toLocaleDateString('en-GB');

    const rows = data.billDetails
      .map((item, idx) => {
        const amount = item.charge * item.qty;
        const total = amount + (data.sgsT9 || 0) + (data.cgsT9 || 0);

        return `
        <tr>
          <td>${idx + 1}</td>
          <td>${item.billHead}</td>
          <td>${item.bhsacCode}</td>
          <td class="right">${formatINR(item.charge)}</td>
          <td class="right">${item.qty}</td>
          <td>${item.currency}</td>
          <td class="right">${formatINR(amount)}</td>
          <td class="right">${formatINR(data.sgsT9 || 0)}</td>
          <td class="right">${formatINR(data.cgsT9 || 0)}</td>
          <td class="right">${formatINR(total)}</td>
        </tr>
      `;
      })
      .join('');

    const customerAddress = [
      data.customerAddress1,
      data.customerAddress2,
      data.customerAddress3,
      data.customerAddress4,
    ].filter(Boolean).join(', ');

    return `
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; font-size: 13px; padding: 20px; }
      table { width: 100%; border-collapse: collapse; margin-top: 10px; page-break-inside: auto; }
      th, td { border: 1px solid #333; padding: 5px; text-align: left; vertical-align: top; }
      th { background: #f0f0f0; }
      .right { text-align: right; }
      .center { text-align: center; }
      .no-border { border: none; }
      .qr { margin-top: 20px; text-align: right; }
      tr { page-break-inside: avoid; page-break-after: auto; }
    </style>
  </head>
  <body>
   <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
  <tr>
    <td style="width: 75%; text-align: left; border: none;">
      <h2 style="margin: 0;">${data.companyName}</h2>
      <p style="margin: 2px 0;">${data.companyAddress}</p>
      <p style="margin: 2px 0;">
        PAN: ${data.companyPANNo} |
        GSTIN: ${data.companyGSTNo || '--'} |
        CIN: ${data.companyCINNo}
      </p>
    </td>
    <td style="width: 25%; text-align: right; vertical-align: top; border: none;">
      ${userData.profileImage
        ? `<img src="${userData.profileImage}" style="max-width: 150px; height: auto;" />`
        : ''
      }
    </td>
  </tr>
</table>
    <h3 class="center">TAX INVOICE</h3>

    <table style="width: 100%; border: 1px solid #000; border-collapse: collapse; margin-top: 10px;">
      <tr><td style="border: none; padding: 6px;"><strong>Bill No.:</strong> ${data.billNo}</td><td style="border: none; padding: 6px;"><strong>Date:</strong> ${data.billDate}</td><td style="border: none; padding: 6px;"><strong>Job No.:</strong> ${data.jobNo}</td></tr>
      <tr><td style="border: none; padding: 6px;" colspan="3"><strong>Customer:</strong> ${data.customerName}<br/>${customerAddress}</td></tr>
      <tr><td style="border: none; padding: 6px;" colspan="3">GSTIN: ${data.customerGstNo}</td></tr>
    </table>

    <table style="width: 100%; border: 1px solid #000; border-collapse: collapse; margin-top: 10px;">
      <tr>
        <td style="border: none; padding: 6px;"><strong>Shipper:</strong> ${data.shipperName}</td>
        <td style="border: none; padding: 6px;"><strong>BL No.:</strong> ${data.blNo}</td>
      </tr>
      <tr>
        <td style="border: none; padding: 6px;"><strong>Port of Loading:</strong> ${data.fpd}</td>
        <td style="border: none; padding: 6px;"><strong>Port of Discharge:</strong> ${data.port}</td>
      </tr>
      <tr>
        <td style="border: none; padding: 6px;"><strong>Vessel Name:</strong> ${data.vesselVoysName}</td>
        <td style="border: none; padding: 6px;"><strong>Container No.:</strong> ${data.containerNo}</td>
      </tr>
      <tr>
        <td style="border: none; padding: 6px;"><strong>CBM:</strong> ${data.cbm}</td>
        <td style="border: none; padding: 6px;"><strong>ETD:</strong> ${data.etd}</td>
      </tr>
      <tr>
        <td style="border: none; padding: 6px;" colspan="2"><strong>Freight Terms:</strong> ${data.frtTerms}</td>
      </tr>
    </table>

    <table>
      <thead>
        <tr>
          <th>Sr No.</th>
          <th>Description</th>
          <th>SAC</th>
          <th>Rate</th>
          <th>Qty</th>
          <th>Curr</th>
          <th>Amount</th>
          <th>SGST</th>
          <th>CGST</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <table>
      <tr><td class="right" colspan="9"><strong>Total Before Tax</strong></td><td class="right">${formatINR(data.totalAmtWithoutTax)}</td></tr>
      <tr><td class="right" colspan="9"><strong>Add GST</strong></td><td class="right">${formatINR(data.totSerTax)}</td></tr>
      <tr><td class="right" colspan="9"><strong>Total After Tax</strong></td><td class="right">${formatINR(data.grandTotalAmt)}</td></tr>
    </table>

    <p><strong>Amount in Words:</strong> RUPEES ${data.grandTotalAmt.toLocaleString('en-IN')} ONLY</p>

    <p><strong>Bank Details:</strong><br>
  <strong>Acct. Name :</strong> ${userData?.companyName}<br />
          <strong>Acct. No :</strong> ${userData?.companyAccountNo}<br />
          <strong>Bank Name :</strong> ${userData?.companyBankName}<br />
          <strong>SWIFT Code :</strong> ${userData?.companySwiftCode}
    </p>

    <p class="right">For ${data.companyName}<br/><br/>Authorised Signatory</p>

    <p><strong>Terms & Conditions:</strong><br/>
      1) Any discrepancies must be communicated within 7 days.<br/>
      2) Only service charge attracts TDS.<br/>
      3) Delay in payment will attract 2% interest monthly.<br/>
      4) Payment to be made in favour of ${userData.companyName}.
    </p>

    ${data.qrCodeJpeg
        ? `<div class="qr"><img src="data:image/jpeg;base64,${data.qrCodeJpeg}" width="150" /></div>`
        : ''
      }

    <p class="center">This is a computer-generated invoice and does not require a signature.</p>
  </body>
  </html>
  `;
  };



  const clearCacheDirectory = async () => {
    try {
      const files = await RNFS.readDir(RNFS.CachesDirectoryPath);
      for (const file of files) {
        if (file.isFile()) {
          await RNFS.unlink(file.path);
        }
      }
    } catch (error) {
      ToastMessage(error)
    }
  };

  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    Alert.alert('Permission Denied', 'Storage permission is required to save the PDF.');
    return;
  }
  try {

    if (download) {
      const sanitizedFileName = data.billNo.replace(/[/\\:*?"<>|]/g, '_');

      const html = generateInvoiceHTML(data);
      const file = await RNHTMLtoPDF.convert({
        html,
        fileName: sanitizedFileName,
        directory: 'Documents',
      });
      const downloadsPath = `${RNFS.ExternalStorageDirectoryPath}/Download/${sanitizedFileName}.pdf`;
      await RNFS.moveFile(file.filePath, downloadsPath);
      ToastMessage(`PDF saved to Downloads ${downloadsPath}`);
    }
    else {
      const sanitizedFileName = data.billNo.replace(/[/\\:*?"<>|]/g, '_');

      const html = generateInvoiceHTML(data);
      const file = await RNHTMLtoPDF.convert({
        html,
        fileName: sanitizedFileName,
        directory: 'Cache',
      });
      const downloadPath = `${RNFS.CachesDirectoryPath}/${sanitizedFileName}.pdf`;
      await RNFS.copyFile(file.filePath, downloadPath);
      const filePath = file.filePath;
      await Share.open({
        title: 'Send Bill Summary',
        subject: 'Bill Summary PDF',
        email: 'abdullahydershaikh@gmail.com', // dynamically inject here
        message: 'Please find attached your bill summary.',
        url: Platform.OS === 'android' ? `file://${filePath}` : filePath,
        social: Share.Social.EMAIL,
      });

      await clearCacheDirectory();
      Alert.alert('PDF Saved', `File saved to:\n${downloadPath}`);
    }
  } catch (error) {
    ToastMessage(error)
    
  }
};
