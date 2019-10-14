import React, { Component } from 'react';

import { StyleSheet, View, TextInput, Text, ActivityIndicator, TouchableOpacity,Button, FlatList, Image, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Swipeout from 'react-native-swipeout'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import Modal from 'react-native-modalbox';
import DataTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';



class InsertTask extends React.Component<{}>
{
    constructor(props)
    {
        super(props);
 
        this.state = { 

         title: '', 

         description: '', 

         thoigian: '',
         image_path: '',
          date:'',
          chosenDate: '',
          ActivityIndicator_Loading: false, 
          isVisible: false,
          imageSource: null,
          data: null,
           Image_TAG: ''
   

        }}
      

    
   selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 100,
      maxHeight: 100,
      storageOptions: {
        skipBackup: true
      }
    };
 
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
 
        this.setState({
 
          ImageSource: source,
          data: response.data
 
        });
      }
    });
  }
 
  AddTask = () => {
 
    RNFetchBlob.fetch('POST', 'http://192.168.1.111/reactnative/Insert.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
        { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
        { name: 'title', data: this.state.title },
        { name: 'description', data: this.state.description },
        { name: 'thoigian', data: this.state.chosenDate },
       

      ]).then((resp) => {
 
        var tempMSG = resp.data;
 
        tempMSG = tempMSG.replace(/^"|"$/g, '');
 
        Alert.alert(tempMSG);
 
      }).catch((err) => {
        // ...
      })
      
 
  }

      handlePicker = (datetime) => {

          this.setState({
            isVisible: false,
            chosenDate: moment(datetime).format('MMMM, Do YYYY HH:mm')
          })
        }
        showPicker = () => {

          this.setState({
            isVisible: true
          })
        }
        hidePicker = (datetime) => {

          this.setState({
            isVisible: false,
            
          })
        }
    Insert_Data_Into_MySQL = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('http://192.168.1.111/reactnative/Insert.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  title : this.state.title,

                  description : this.state.description,

                  thoigian : this.state.thoigian,
                  image_path : this.state.image_path
                  // date : this.state.date


                })
 
            }).then((response) => response.text()).then((responseJsonFromServer) =>
            {
                alert(responseJsonFromServer);

                this.setState({ ActivityIndicator_Loading : false });

            }).catch((error) =>
            {
                console.error(error);

                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }
 
    render()
    {
        return(

            <View style = { styles.MainContainer }>
                <Text style= {{fontSize: 30, paddingBottom: 50, fontWeight: 'bold'}} > THÊM CÔNG VIỆC </Text>
                
                <TextInput 
                 
                  placeholder = "Nhiệm vụ"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  onChangeText = {data => this.setState({ title: data })}

                   />

                <TextInput 
                  placeholder = "Mô tả"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  onChangeText = {data => this.setState({ description: data })} />
                 <TouchableOpacity 
                  activeOpacity = { 0.5 } 
                  style = { {} } 
                  onPress = { this.showPicker }>

                <View>
                      <Text> Chọn thời gian </Text>
                </View>
                   
                <Image
                  style={{width: 50, height: 50, marginLeft: 25}}
                  source={{uri: 'https://www.trzcacak.rs/myfile/detail/108-1083761_alarm-clock-icon-blue-alarm-clock-icon-png.png'}}
                />

                </TouchableOpacity>
                
                
 
                <TextInput  
                  placeholder = "Thời gian" 
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  onChangeText = { data => this.setState({ thoigian: data })}
                 value={this.state.chosenDate}
                  />
           
                 
                
                <DataTimePicker
                  isVisible={this.state.isVisible}
                  onConfirm={this.handlePicker}
                  onCancel={this.hidePicker}
                  mode={'datetime'}
                  is24Hour={false}
                  // datePickerModeAndroid={'spinner'}

                />
                <View>
                      <Text> Chọn ảnh </Text>
                </View>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
 
                 <View style={styles.ImageContainer}>
 
            {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.ImageContainer} source={this.state.ImageSource} />
            }
 
          </View>
 
        </TouchableOpacity>
                 
                
 
 
       
              <View style={{ flexDirection: 'row', paddingTop:20 }}>

                <TouchableOpacity 
                  activeOpacity = { 0.5 } 
                  style = { {}} 
                  onPress = {
                   
                    this.AddTask

                     }>


                      <Image
                  style={{width: 100, height: 100,marginBottom: 10}}
                   source={{uri: 'https://img.icons8.com/cotton/2x/add.png'}} />


                </TouchableOpacity>
                <TouchableOpacity 
                  activeOpacity = { 0.5 } 
                  style = { {}} 
                  onPress={() => {
              
              this.props.navigation.navigate('List');
             
          }}

          >
          
             <Image
                  style={{width: 100, height: 100,marginBottom: 10}}
                   source={{uri: 'https://img.icons8.com/cotton/2x/circled-left.png'}} />


                </TouchableOpacity>
              </View>

                {
        
                this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#009688' size='large'style={styles.ActivityIndicatorStyle} /> : null
                
                }
                
            </View>
        );
    }
}

class ListTask extends React.Component {
      constructor(props)
  {
    super(props);
 
    this.state = { 
    isLoading: true,
    

  }
  }

  
  componentDidMount() {
    
       return fetch('http://192.168.1.111/reactnative/List.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
             
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }
 
FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }
 
  GetFlatListItem (title) {
   
  Alert.alert(title);
 
  }
  GetTaskIDFunction=(id,title,description,thoigian,image_path)=>{
 
          this.props.navigation.navigate('Edit', { 
 
            id : id,
            title : title,
            description : description,
            thoigian : thoigian,
            image_path: image_path
          });
 
     }
  
 
  render() {
 
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
 
    return (
     
      <View style={styles.MainContainer}>
        


        <Text style={{fontSize:25, fontWeight: 'bold', textAlign: 'center',marginBottom: 20}} >DANH SÁCH CÔNG VIỆC</Text>
       <FlatList 

          data={this.state.dataSource}
          renderItem={({item}) =>  (
      <View style={styles.row}>

        <Image source={{uri: item.image_path }} style={styles.thumb}/>

         
           <View style="abc">
          <Text style={styles.text1}>{item.title}</Text>
          <Text style={styles.text}>{item.description}</Text>
           <Text style={styles.text2}>{item.thoigian}</Text>
          
          </View>
          <View>
          
          
          
          <TouchableOpacity
          activeOpacity = { 0.5 } 
                  
                  
                  onPress={this.GetTaskIDFunction.bind(
                        this, item.id,
                         item.title, 
                         item.description, 
                         item.thoigian,
                         item.image_path
                         )}
            >
          
              
         
                 <Image
                  style={{width: 50, height: 50,marginLeft:60, marginTop: 30}}
                   source={{uri: 'https://cdn3.iconfinder.com/data/icons/user-interface-web-1/550/web-circle-circular-round_58-512.png'}} />
          </TouchableOpacity>
         
          
          </View>


          
          
          
      </View>
     
  
      ) }
           keyExtractor={item => item.id}
  
       /> 
  
    <TouchableOpacity 
                  activeOpacity = { 0.5 } 
                  style = { {}} 
                  
                  onPress={() => {
              
              this.props.navigation.navigate('Insert');

          }}

          >
          

                      <Image
                  style={{width: 100, height: 100,marginBottom: 10}}
                   source={{uri: 'https://img.icons8.com/cotton/2x/add.png'}} />
                </TouchableOpacity> 
</View>


            
    );
  }
}
class EditTaskRecordActivity extends Component {
  
  constructor(props) {
    
       super(props)
    
       this.state = {
    
          id: '', 
          title: '', 

          description: '', 

          thoigian: '',
          image_path: '',
          imageSource: '',

          date:'',
          chosenDate: '',
          ActivityIndicator_Loading: false, 
          isVisible: false,
  }
  }

     componentDidMount(){
 
   
      this.setState({ 
        id : this.props.navigation.state.params.id,
        title: this.props.navigation.state.params.title,
        description: this.props.navigation.state.params.description,
        thoigian: this.props.navigation.state.params.thoigian,
        image_path: this.props.navigation.state.params.image_path
        
      })
    }

      selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 100,
      maxHeight: 100,
      storageOptions: {
        skipBackup: true
      }
    };
 
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
 
        this.setState({
 
          ImageSource: source,
          data: response.data
 
        });
      }
    });
  }
 
  EditTask = () => {
 
    RNFetchBlob.fetch('POST', 'http://192.168.1.111/reactnative/Update.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
        { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
        { name: 'id', data: this.state.id },
        { name: 'title', data: this.state.title },
        { name: 'description', data: this.state.description },
        { name: 'thoigian', data: this.state.chosenDate },
       

      ]).then((resp) => {
 
        var tempMSG = resp.data;
 
        tempMSG = tempMSG.replace(/^"|"$/g, '');
 
        Alert.alert(tempMSG);
 
      }).catch((err) => {
        // ...
      })
      
 
  }
      handlePicker = (datetime) => {

          this.setState({
            isVisible: false,
            chosenDate: moment(datetime).format('MMMM, Do YYYY HH:mm')
          })
        }
        showPicker = () => {

          this.setState({
            isVisible: true
          })
        }
        hidePicker = (datetime) => {

          this.setState({
            isVisible: false,
            
          })
        }

      DeleteProductRecord = () =>{
        
          fetch('http://192.168.1.111/reactnative/Delete.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
        
            id : this.state.id
        
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
        
            Alert.alert(responseJson);
        
          }).catch((error) => {
             console.error(error);
          });

       
 
      }
       render()
    {
        return(

            <View style = { styles.MainContainer }>
                <Text style= {{fontSize: 30, paddingBottom: 50, fontWeight: 'bold'}} > UPDATE CÔNG VIỆC </Text>
                <TextInput
                  placeholder = "Nhiệm vụ"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  value={this.state.title}
                  onChangeText = {data => this.setState({ title: data })}

                   />

                <TextInput 
                  placeholder = "Mô tả"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  value={this.state.description}
                  onChangeText = {data => this.setState({ description: data })} />
                 <TouchableOpacity 
                  activeOpacity = { 0.5 } 
                  style = { {} } 
                  onPress = { this.showPicker }>

                <View>
                      <Text> Chọn thời gian </Text>
                </View>
                   
                <Image
                  style={{width: 50, height: 50, marginLeft: 25}}
                  source={{uri: 'https://www.trzcacak.rs/myfile/detail/108-1083761_alarm-clock-icon-blue-alarm-clock-icon-png.png'}}
                />

                </TouchableOpacity>
                
                
 
                <TextInput  
                  placeholder = "Thời gian" 
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  onChangeText = { data => this.setState({ thoigian: data })}
                 value={this.state.chosenDate}
                  />
           
                 
                
                <DataTimePicker
                  isVisible={this.state.isVisible}
                  onConfirm={this.handlePicker}
                  onCancel={this.hidePicker}
                  mode={'datetime'}
                  is24Hour={false}
                  // datePickerModeAndroid={'spinner'}

                />
                
                <View>
                      <Text> Chọn ảnh </Text>
                </View>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
 
                 <View style={styles.ImageContainer}>
 
            {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.ImageContainer} source={this.state.ImageSource} />
            }
 
          </View>
 
        </TouchableOpacity>
                    
                   
               
                <View style={{  flexDirection: 'row', paddingTop: 20}}>

                  <TouchableOpacity 
                  activeOpacity = { 0.5 } 
                  style = { {} } 
                  onPress = { this.EditTask }>

                     <Image
                  style={{width: 100, height: 100,marginBottom: 10}}
                  source={{uri: 'data:image/png;base64,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'}}
                />

                </TouchableOpacity>
                <TouchableOpacity 
                  activeOpacity = { 0.5 } 
                  style = { {}} 
                  onPress = { 
                    () => {
                    Alert.alert(
                        'Delete',
                        'Bạn có chắc chắn muốn xóa không ?',
                        [
                            {
                                text: 'Không', onPress: () => { },//Do nothing
                                style: 'cancel'
                            },
                            {
                                text: 'Có', onPress: () => {
                                   this.DeleteProductRecord()
                                }
                            },
                        ],
                        { cancelable: true }
                    );

                    
                  
                  }}
                  >


                     <Image
                  style={{width: 100, height: 100,marginBottom: 10}}
                  source={{uri: 'https://cdn2.iconfinder.com/data/icons/e-business-helper/240/627249-delete3-512.png'}} />

                </TouchableOpacity>
                <TouchableOpacity 
                  activeOpacity = { 0.5 } 
                  style = { {}} 
                  onLongPress = { this.EditTask }
                  onPress={() => {
              
              this.props.navigation.navigate('List');

          }}

          >
          
                   <Image
                  style={{width: 100, height: 100,marginBottom: 10}}
                   source={{uri: 'https://img.icons8.com/cotton/2x/circled-left.png'}} />

                </TouchableOpacity>
                </View>
                

                {
        
                this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#009688' size='large'style={styles.ActivityIndicatorStyle} /> : null
                
                }
                
            </View>
        );
      }
 }

const RootStack = createStackNavigator(
  {
    Insert: InsertTask,
   List: ListTask,
  Edit: EditTaskRecordActivity,
  },
  {
    initialRouteName: 'List',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const styles = StyleSheet.create(
{
    MainContainer:
    {
      width:'100%',
      borderWidth:3,
      borderColor:'green',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      

    },
 
    TextInputStyleClass:
    {

      textAlign: 'center',
      height: 40,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '80%'
    },
 
    TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'green',
      marginBottom: 20,
      width: '95%',
      borderRadius:10,
      borderWidth:1,
 
    },
    addButton: 
    {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'red',
      marginBottom: 20,
      width: 100,
      height: 100,
      marginLeft: 250,
      borderRadius: 50,
      textAlign: 'center',
      justifyContent: 'center'

    },
 
    TextStyle:
    {
       color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },
    TextStyle1:
    {
       color: '#fff',
        textAlign: 'center',
        fontSize: 50
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
    width: '100%',

    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderColor: '#c9c9c9',
  },

  thumb: {
    marginTop:25,
    width: 65,
    height: 65,
    marginLeft: 10,
    marginRight: 10,
    borderRadius:10,

  },

  text: {
 
    flex: 1,
    paddingLeft: 10,
    // borderWidth: 1,
     borderRadius:10,
     color: 'gray',
     borderColor: 'gray',



  },
   text2: {
 
    flex: 1,
    padding: 10,
    fontStyle:  'italic',
    
   

  },
   text1: {
    fontSize: 20,
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    // color: 'blue'

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
  update: {
  paddingTop: 15,
  paddingLeft:50,
  paddingRight:10,
  color: 'green',
  fontWeight: 'bold'


  },
   ImageContainer: {
    borderRadius: 10,
    width: 100,
    height: 100,
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  
  },

  TextInputStyle: {

    textAlign: 'center',
    height: 40,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#028b53',
    marginTop: 20
  },

  button: {

    width: '80%',
    backgroundColor: '#00BCD4',
    borderRadius: 7,
    marginTop: 20
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    padding: 10
  }
});