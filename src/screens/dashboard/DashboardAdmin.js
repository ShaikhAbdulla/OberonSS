import React, { useEffect, useState } from "react";
import { Alert, Button, Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/common/Header";
import { colors } from "../../constants/ColorConstants";
import { ClientCard } from "../../components/module/dashboard/ClientCards";
import { image } from "../../constants/ImageConstants";
import { Logout, scaleFont, scaleHeight, scaleWidth } from "../../Utils";
import { IconButton } from "../../components/common/IconButton";
import { IconButtonLong } from "../../components/common/IconButtonlong";
import SidebarModal from "../../components/module/sideBar/CustomDrawer";
import { getToken, getUserData, removeUserData } from "../../api/TokenManager";
import CompanyCard from "../../components/common/CompanyCard";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { BillPdfGenerate } from "../../BillPdfShare";
import { t } from "../../constants/utils/Localization";




export const DashboardAdmin = () => {

    const [drawerVisible, setDrawerVisible] = useState(false)
    const [userData, setUserData] = useState()
    const navigation = useNavigation()

    useEffect(() => {
        getUserDataa()
    }, [])

    const getUserDataa = async () => {
        const data = await getUserData()
        const token = await getToken()
        setUserData(data)
    }

    const Logout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
                text: 'Yes',
                onPress: async () => {
                    await removeUserData()
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                    
                },
                style: 'destructive',
            },
            {
                text: 'No',
                onPress: () => console.log('Logout canceled'),
                style: 'cancel',
            },
        ]);
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryDarkBlue }} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={colors.primaryDarkBlue} translucent={false} />
            <Header screenName={t('home')} onpress={() => setDrawerVisible(true)} menu={true} />
            <LinearGradient
                colors={['white', '#D9E7F1']} //liked it
                style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                    <Image style={styles.ship} source={image.dashboards.ship} />
                    <View style={{ bottom: scaleHeight(40) }}>
                        <CompanyCard username={userData?.fullName} profileimg={userData?.profileImage} companyName={userData?.companyName} email={userData?.email} />
                    </View>
                    <View style={{ bottom: scaleHeight(60), flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        {userData?.roleId == '1' || userData?.roleId == '2' ? <IconButton onpress={() => navigation.navigate('Clientss')} bgColor={colors.buttonGreen} text={t('clients')} icon={image.dashboards.clients} /> :
                            <IconButton onpress={() => navigation.navigate('MyBills')} bgColor={colors.buttonGreen} text={t('mybills')} icon={image.dashboards.bill} />}

                        <IconButton onpress={() => navigation.navigate('Settings')} bgColor={colors.primaryDarkBlue} text={t('settings')} icon={image.dashboards.setting} />
                    </View>
                    <View style={{ bottom: scaleHeight(55) }}>
                        <IconButtonLong onpress={() => Logout()} bgColor={'#b23b3b'} text={t('logout')} icon={image.dashboards.logout} />
                    </View>
                    <SidebarModal
                        logout={() => Logout()}
                        userData={userData}
                        visible={drawerVisible}
                        closeDrawer={() => setDrawerVisible(false)}
                    />

                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        backgroundColor: colors.primaryWhite,
        borderColor: colors.buttonGreen,
        borderRadius: scaleHeight(10),
        borderWidth: 1,
        bottom: scaleHeight(30),
        padding: scaleWidth(25),
        width: '85%'
    },
    container: {
        flex: 1,
    }
    ,
    ship: {
        height: scaleHeight(230),
        marginTop: scaleHeight(70),
        resizeMode: 'cover',
        width: scaleWidth(370),
    }
})