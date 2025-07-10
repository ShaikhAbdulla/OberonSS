import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/common/Header";
import { useRoute } from "@react-navigation/native";
import { getSalesData } from "../../api/services/SalesService";
import { colors } from "../../constants/ColorConstants";
import { scaleFont, scaleHeight, scaleWidth } from "../../Utils";
import BillCard from "../../components/common/BillCard";
import { FlatList } from "react-native-gesture-handler";
import BillDetailModal from "../../components/common/BillDetailModal";
import PDFBillShareButton, { sendEmailWithCC } from "../../MailBuilder";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { getUserData } from "../../api/TokenManager";
import { t } from "../../constants/utils/Localization";


export const MyBills = () => {
    const [bills, setBills] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    useEffect(() => {
        getBillHistory()
    }, [])

    const getBillHistory = async () => {
        const userData = await getUserData()
        const data = await getSalesData(userData.clientCustomerId)
        setBills(data)
    }


    const handleView = (item) => {
        setSelectedBill(item);
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryDarkBlue }} edges={['top', 'right', 'left']}>
            <LinearGradient
                colors={['white', '#D9E7F1']} //liked it
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <Header screenName={t('mybills')} />



                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: scaleHeight(20), alignItems: 'center', marginBottom: scaleHeight(15), marginTop: scaleHeight(20) }}>
                        <Text
                            style={styles.text}>{t('bills')}</Text>
                        <PDFBillShareButton bills={bills} />
                    </View>
                    <FlatList
                        data={bills}
                        keyExtractor={(item) => item.billId.toString()}
                        renderItem={({ item }) => (
                            <BillCard
                                data={item}
                                onView={(data) => handleView(data)}
                                onShare={() => console.log('Share')}
                                onDelete={() => console.log('Delete')}
                            />
                        )}
                    />
                    <BillDetailModal
                        visible={modalVisible}
                        billData={selectedBill}
                        onClose={() => setModalVisible(false)}
                        onSave={() => console.log('Save')}
                        onShare={() => console.log('Share')}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>

    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        // backgroundColor: colors.backgroundLight
    },
    text: { color: colors.primaryDarkBlue, fontSize: scaleFont(15), fontWeight: '700' }


})