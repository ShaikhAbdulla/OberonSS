import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/common/Header";
import { colors } from "../../constants/ColorConstants";
import { ClientCard } from "../../components/module/dashboard/ClientCards";
import SearchBar from "../../components/common/SearchBar";
import { getUserData } from "../../api/TokenManager";
import { getSalesSummary } from "../../api/services/SalesService";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { filterData, scaleHeight, scaleWidth, sumOfValues } from "../../Utils";
import { CalculatedValueCard } from "../../components/common/calculatedValueCard";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import ClientCardSkeleton from "../../components/common/SkeletonLoader";
import { t } from "../../constants/utils/Localization";

export const ClientsScreen = () => {
  const [query, setQuery] = useState()
  const [userData, setUserData] = useState()
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [netSum, setNetSum] = useState()
  const [dueSum, setDueSum] = useState()
  const [noData, setNoData] = useState(false)
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      setQuery('')
      getClients()
    }, [])
  );


  const getClients = async () => {
    const data = await getUserData()
    setUserData(data)
    const clients = await getSalesSummary(userData?.clientCustomerId)
    setClients(clients)
    setFilteredClients(clients)
    const netsumm = sumOfValues(clients, 'net')
    const duesumm = sumOfValues(clients, 'due')
    setDueSum(duesumm)
    setNetSum(netsumm)
  }

  const filter = (item) => {
    setQuery(item)
    const data = filterData(clients, item)
    setFilteredClients(data)
    data.length == 0 && setNoData(true)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryDarkBlue }} edges={['top', 'right', 'left']}>
      <LinearGradient
        colors={['white', '#D9E7F1']} //liked it
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Header screenName={t('clients')} />
          <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', margin: scaleWidth(5) }}>
            <CalculatedValueCard text={t('total_outstanding')} value={netSum} bgColor={colors.buttonGreen} />
            <CalculatedValueCard text={t('total_due_amount')} value={dueSum} bgColor={'#b23b3b'} />
          </View>
          <SearchBar placeholder={t('search_clients')} value={query} onChangeText={(item) => filter(item)} />
          {/* <View style={{marginBottom:scaleHeight(10)}}> */}
          {filteredClients?.length > 0 ? <FlatList
            data={filteredClients}
            keyExtractor={(i) => JSON.stringify(i.partyId)}
            renderItem={((item, index) => (
              <View style={{ marginBottom: scaleHeight(10) }}>
                <ClientCard onpress={(data) => navigation.navigate('ClientBillHistory', { clientdataa: data, userData: userData })} data={item} />
              </View>
            ))}
          /> : noData ? <Text style={{ alignSelf: 'center', color: colors.mildGrey }}>no clients found</Text> :
            (
              <ClientCardSkeleton count={5} height={100} />
            )
          }

        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

})