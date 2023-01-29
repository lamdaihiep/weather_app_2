import React, {Component} from "react";
import {StyleSheet, View, Text, Dimensions, TextInput} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {WebView} from "react-native-webview";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tinh: "nha-ta",
    };
  }

  getTinh(tinh) {
    switch(tinh){
      case "ha-noi":
        return "Hà Nội";
      case "bac-ninh":
        return "Bắc Ninh";
      case "quang-ninh":
        return "Quảng Ninh";
      case "nha-P":
        return "Nhà P";
      case "nha-U":
          return "Nhà U";
      case "ho-chi-minh":
        return "Thành Phố Hồ Chí Minh";
      case "nha-ta":
        //return "Chi Lăng - Quế Võ - Bắc Ninh";
        return "Phường Hàng Bạc - Quận Hoàn Kiếm - Hà Nội";
      case "":
        return "trang chủ thời tiết";

      default:
        return tinh;
    }
  }

  getURL(tinh){
    if(tinh == 'nha-ta')
      //return 'https://thoitiet.vn/bac-ninh/que-vo/chi-lang-que-vo';
      return 'https://thoitiet.vn/ha-noi/hoan-kiem/hang-bac';
    if(tinh == 'nha-P')
      return 'https://thoitiet.vn/quang-ninh/uong-bi';
    if(tinh == 'nha-U')
      return 'https://thoitiet.vn/bac-ninh/que-vo/pho-moi';
    if(tinh == '')
      return 'https://thoitiet.vn';

    //return "https://thoitiet.edu.vn/" + tinh;
    return 'https://thoitiet.vn/' + tinh;
  }
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          Chọn địa điểm muốn xem thời tiết
        </Text>
        
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.tinh}
          onValueChange={(itemValue, itemPosition)=> {
            this.setState({tinh: itemValue});
          }}
        >
          <Picker.Item label="select" value="" />
          <Picker.Item label="Hà Nội" value="ha-noi" />
          <Picker.Item label="Bắc Ninh" value="bac-ninh" />
          <Picker.Item label="Quảng Ninh" value="quang-ninh" />
          <Picker.Item label="Thành Phố Hồ Chí Minh" value="ho-chi-minh" />
          <Picker.Item label="Nhà P" value="nha-P" />
          <Picker.Item label="Nhà U" value="nha-U" />
          <Picker.Item label="Nhà Ta" value="nha-ta" />
        </Picker>
        
        <View style={{
            flexDirection: "row",
            padding: 8,
            justifyContent: "space-around",
            height: Dimensions.get('window').height*4/7,
          }}
        >
          <WebView originWhitelist={["*"]}
            source={{uri: this.getURL(this.state.tinh)}}
            onShouldStartLoadWithRequest={(request) => {
              return false;
            }}
          />
        </View>
        
        <TextInput style={styles.inputStyle} placeholder="Nhập tỉnh thành (VD: ha-noi, bac-ninh, ...): "
          onChangeText={newText => {
            this.setState({tinh: newText});
          }}
          value={this.state.tinh}/>
        <Text style={styles.textStyle}>
          Thời tiết của: {this.getTinh(this.state.tinh)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  pickerStyle: {
    height: 70,
    width: "80%",
    color: "#344953",
    justifyContent: "center",
  },
  inputStyle: {
    backgroundColor: "white"
  }
});