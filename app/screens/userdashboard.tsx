import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Userdashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.description}>Find the best furniture {"\n"}for your home.</Text>
        <View style={styles.idContainer}>
            <Text style={styles.accountName}>ID</Text>
        </View>
      </View>
       <TextInput style={styles.searchField} placeholder='Search furniture'/>
    </View>
  )
}

const styles = StyleSheet.create({

    searchField:{
        width:'100%',
        height:50,
        backgroundColor:'#F9FAFB',
        borderRadius:8,
        borderColor:'#E5E7EB',
        borderWidth:1,
        marginTop:25,
        paddingHorizontal:15,
    },

    container:{
        paddingHorizontal:40,
        marginTop:80
    },

    description:{
        fontSize:19,
        color:'#4a5565',
    },

    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    idContainer:{
        height:45,
        width:45,
        borderRadius:'100%',
        backgroundColor:'#dfe3e7',
        justifyContent:'center',
        alignItems:'center'
    },

    accountName:{
        fontSize:17,
    }
})