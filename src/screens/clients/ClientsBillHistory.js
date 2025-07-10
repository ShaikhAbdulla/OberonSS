import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Alert } from "react-native";
import { Header } from "../../components/common/Header";
import { useRoute } from "@react-navigation/native";
import { addRemark, getSalesData, getSalesPdfData } from "../../api/services/SalesService";
import { colors } from "../../constants/ColorConstants";
import { scaleFont, scaleHeight, scaleWidth, ToastMessage } from "../../Utils";
import { ClientDetailCard } from "../../components/common/ClientDetailCard";
import BillCard from "../../components/common/BillCard";
import { FlatList } from "react-native-gesture-handler";
import BillDetailModal from "../../components/common/BillDetailModal";
import PDFBillShareButton, { sendEmailWithCC } from "../../MailBuilder";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import ClientCardSkeleton from "../../components/common/SkeletonLoader";
import { BillPdfGenerate } from "../../BillPdfShare";
import { t } from "../../constants/utils/Localization";
import { image } from "../../constants/ImageConstants";
import AddRemarkBottomSheet from "../../components/common/addRemarkBottomSheet";


export const ClientBillHistory = () => {
    const route = useRoute()
    const { clientdataa, userData } = route.params
    const [bills, setBills] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [isVisible, setIsVisible] = useState(false)
    const [clientdata, setClientData] = useState(clientdataa)

    useEffect(() => {
        getBillHistory()
    }, [])

    const getBillHistory = async () => {
        const data = await getSalesData(clientdata.partyId)
        setBills(data)
    }

    const pdfGenerationBill = async (data, userData, download) => {
        try {
            const pdfData = await getSalesPdfData(parseInt(data.billId))
            BillPdfGenerate(pdfData, userData, download)
        } catch (error) {
            ToastMessage('error sharing bill')
        }
    }

    const handleView = (item) => {
        setSelectedBill(item);
        setModalVisible(true);
    };

    const addRemarks = async (remark) => {

        const params = {
            "id": userData.id,
            "partyId": clientdata.partyId,
            "remarks": remark
        }
        const res = await addRemark(params)
        if (res.status == 200) {
            setIsVisible(false)
            setClientData({
                ...clientdata,
                'remarks': remark
            })
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryDarkBlue }} edges={['top', 'right', 'left']}>
            <LinearGradient
                colors={['white', '#D9E7F1']} //liked it
                style={{ flex: 1 }}
            >


                <View style={styles.container}>
                    <Header screenName={t('selected_client')} />
                    <ClientDetailCard clientdata={clientdata} />

                    <View style={{ paddingHorizontal: scaleHeight(20), marginBottom: scaleHeight(15) }}>
                        {clientdata.remarks ? <View>
                            <Text
                                style={[styles.text, { bottom: scaleHeight(12) }]}>{t('Remark')}</Text>
                            <View style={{ backgroundColor: colors.primaryWhite, borderRadius: scaleFont(10), padding: scaleHeight(20), elevation: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>{clientdata?.remarks}</Text>
                                <TouchableOpacity onPress={() => setIsVisible(true)}>
                                    <Image style={{ height: scaleHeight(20), width: scaleWidth(20) }} source={image.billCard.updateRemark} />
                                </TouchableOpacity>
                            </View>
                        </View>
                            :
                            <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ height: scaleHeight(35), width: scaleWidth(35), tintColor: colors.lightBlueText }} source={image.billCard.addRemark} />
                                <Text>Add remark</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: scaleHeight(20), alignItems: 'center', marginBottom: scaleHeight(15), marginTop: 0 }}>
                        <Text
                            style={styles.text}>{t('bills')}</Text>
                        <PDFBillShareButton clientData={userData} bills={bills} />
                    </View>
                    {bills?.length > 0 ?
                        <FlatList
                            data={bills}
                            keyExtractor={(item) => item.billId.toString()}
                            renderItem={({ item }) => (
                                <BillCard
                                    data={item}
                                    onView={(data) => handleView(data)}
                                    onShare={(data) => pdfGenerationBill(data, userData)}
                                    onDelete={(data) => pdfGenerationBill(data, userData, { download: true })}
                                />
                            )}
                        /> :
                        <ClientCardSkeleton count={5} height={80} />
                    }

                    <BillDetailModal
                        visible={modalVisible}
                        billData={selectedBill}
                        onClose={() => setModalVisible(false)}
                        onSave={() => console.log('Save')}
                        onShare={() => console.log('Share')}
                    />
                </View>
                <AddRemarkBottomSheet
                    data={clientdata?.remarks}
                    visible={isVisible}
                    onClose={() => setIsVisible(false)}
                    onAddRemark={(remark) => {
                        addRemarks(remark);
                    }}
                />
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