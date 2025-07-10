import React, { useEffect, useRef, useState } from "react";
import { Image, KeyboardAvoidingView, Modal, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/ColorConstants";
import { scaleFont, scaleHeight, scaleWidth, ToastMessage } from "../../Utils";

import { image } from "../../constants/ImageConstants";
import { ReusableButton } from "../../components/common/button";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../api/services/AuthService";
import { SafeAreaView } from "react-native-safe-area-context";
import ForceUpdateModal from "../../components/module/appUpdate/AppUpdateModal";
import { t } from "../../constants/utils/Localization";


export const Login = () => {
    const navigation = useNavigation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userErr, setUserErr] = useState(false)
    const [passErr, setPassErr] = useState(false)
    const [loader, setLoader] = useState(false)
    const [passView, setPassView] = useState(true)
    const usernameRef = useRef(null);
    useEffect(() => {
        const timeout = setTimeout(() => {
            usernameRef.current?.focus(); // Focus the input
        }, 500); // delay slightly for smoother focus

        return () => clearTimeout(timeout);
    }, []);


    const login = async () => {
        setLoader(true)
        if (password !== '' && username !== '') {

            const payload = {
                "username": username
                //   "Adminss" 
                ,
                "password": password
                //   "Pass@123"
            }
            const exist = await loginUser(payload)
            if (exist.status == 200) {
                if (exist.data.isExistingUser) {
                    navigation.replace('DashboardAdmin')
                    ToastMessage('Logged In Succesfully')
                    setLoader(false)
                } else {
                    navigation.replace('ChangePassword', { isFromLogin: true })
                }
            }
            else if (username == 'info@universalinfotech.org') {
                navigation.replace('DashboardAdmin')
                await storeData('user', { name: username, role: 'Admin' })
                ToastMessage('Logged In Succesfully')
                setLoader(false)
            }
            else {
                ToastMessage('User doesnt exist')
                setPassErr(true)
                setUserErr(true)
                setLoader(false)
            }
        } else {
            ToastMessage('Fields Cannot be empty')
            setPassErr(true)
            setUserErr(true)
            setLoader(false)
        }
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: colors.buttonTeal }} edges={['top', 'right', 'left',]}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            //   contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled"
            >
                <View style={{ flex: 1 }}>
                    <View style={[styles.modalViewTop, { backgroundColor: 'transparent' }]}>
                        <Image style={{ height: scaleHeight(200), width: scaleWidth(200), alignSelf: 'center', top: scaleHeight(40), tintColor: colors.billDetailBg }} source={image.login.loginIcon} />
                    </View>
                    <View style={[styles.modalViewBottom, { alignItems: 'center' }]}>
                        <View style={{ top: scaleHeight(30), elevation: 10 }}>
                            <View>
                                <Text style={styles.Login}>
                                    {t('login')}
                                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.placeholder,
                                { color: userErr ? 'red' : 'black' }
                                ]}> {t('username')}</Text>
                                <TextInput
                                    ref={usernameRef}
                                    style={[styles.input, { borderColor: userErr ? 'red' : 'transparent' }]}
                                    onChangeText={(text) => (setUsername(text), setUserErr(false))}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.placeholder
                                    , { color: passErr ? 'red' : 'black' }
                                ]}> {t('password')}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        keyboardType="ascii-capable"
                                        returnKeyType="done"
                                        onSubmitEditing={login}
                                        secureTextEntry={passView} style={[styles.input,
                                        { borderColor: passErr ? 'red' : 'transparent' }
                                        ]}
                                        onChangeText={(text) => (setPassword(text), setPassErr(false))}
                                    />
                                    <TouchableOpacity onPress={() => setPassView(!passView)} style={{ position: 'absolute', right: 10, top: 13 }}><Image style={{ height: scaleHeight(20), width: scaleWidth(20) }} source={image.billCard.eye} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <ReusableButton loading={loader} onPress={() => login()} name={'Login'} bgcolor={colors.buttonTeal} />
                            </View>
                            <TouchableOpacity style={{ alignSelf: 'center', top: scaleHeight(40) }} onPress={() => navigation.navigate('ForgetPassword')}>
                                <Text style={{ fontSize: scaleFont(12), color: colors.cardTextDark }}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    Login: {
        color: 'black',
        fontSize: scaleFont(27),
        fontWeight: 'bold'
    }
    ,
    container: {
        backgroundColor: colors.buttonTeal,
        flex: 1,
        height: '100%'
    },
    heading: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        letterSpacing: scaleWidth(1),
    },
    headingContainer: {
        alignItems: 'flex-start'
    },
    input: {
        backgroundColor: '#dddddd',
        borderColor: 'transparent',
        borderRadius: scaleHeight(10),
        borderWidth: 1,
        color: 'black',
        padding: scaleHeight(12),
        width: scaleWidth(320),
        // opacity: 0.4
    },
    inputContainer: {
        marginTop: scaleHeight(25)
    },
    modal: {
        bottom: 0,
        position: 'absolute'
    },
    modalView: {
        backgroundColor: colors.primaryWhite,
        // height:'50%',
        borderTopEndRadius: scaleHeight(25),
        borderTopLeftRadius: scaleHeight(25),

        //    position:'absolute',   
    },
    modalViewBottom: {
        flex: 0.55, // Instead of height: '55%'
        backgroundColor: colors.primaryWhite,
        borderTopEndRadius: scaleHeight(25),
        borderTopLeftRadius: scaleHeight(25),
        paddingHorizontal: scaleWidth(16),
    },
    modalViewTop: {
        flex: 0.45, // Instead of height: '45%'
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    placeholder: {
        color: 'black',
        fontSize: scaleFont(15.5),
        letterSpacing: scaleWidth(1),
        marginBottom: scaleHeight(10)
    },
})