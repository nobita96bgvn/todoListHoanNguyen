
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create(
{
    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20

    },
 
    TextInputStyleClass:
    {

      textAlign: 'center',
      height: 40,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: 'red',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },
 
    TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'red',
      marginBottom: 20,
      width: '90%'
 
    },
 
    TextStyle:
    {
       color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },

    ActivityIndicatorStyle:{
      
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    
  },
  container: {
   flex: 2,
   paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    
  },
  row: {
    flexDirection: 'row',

    padding: 10,
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderColor: '#c9c9c9',
  },

  thumb: {
    width: 64,
    height: 64,
  },

  text: {
 
    flex: 1,
    padding: 10
  },
   text1: {
    fontSize: 20,
    flex: 1,
    padding: 10
  },
  abc: {
    flexDirection: 'column'
  },
  addTitle: {
    fontSize: 25,
    paddingLeft: 100,
  },
  container: {
   flex: 2,
   paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    
  },
  row: {
    flexDirection: 'row',

    padding: 10,
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderColor: '#c9c9c9',
  },

  thumb: {
    width: 64,
    height: 64,
  },

  text: {
 
    flex: 1,
    padding: 10
  },
   text1: {
    fontSize: 20,
    flex: 1,
    padding: 10
  },
  abc: {
    flexDirection: 'column'
  },
  addTitle: {
    fontSize: 25,
    paddingLeft: 100,
  }


});

export default styles;