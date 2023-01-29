import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Dimensions, TextInput} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { WebView } from 'react-native-webview';


export default class App extends Component {
  state = {
    tinh: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      tinh: "nha-Ta",
    };
  }


  getTinh(tinh) {
    switch (tinh) {
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
        case "nha-Ta":
          return "Chi Lăng - Quế Võ - Bắc Ninh";

      default:
        //return "ko biết";
        return tinh;
    }
  }

  getURL(tinh) {
    if(tinh == 'nha-Ta')
      return 'https://thoitiet.edu.vn/bac-ninh/que-vo/chi-lang-que-vo';
    if(tinh == 'nha-P')
      return 'https://thoitiet.edu.vn/quang-ninh/uong-bi';
    if(tinh == 'nha-U')
      return 'https://thoitiet.edu.vn/bac-ninh/que-vo/pho-moi';
  
    return "https://thoitiet.edu.vn/" + tinh;
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          Chọn địa điểm muốn xem thời tiết
        </Text>
        
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.tinh}
          onValueChange={(itemValue, itemPosition)=> {
            this.setState({tinh: itemValue});}}
        >
          <Picker.Item label="Hà Nội" value="ha-noi" />
          <Picker.Item label="Bắc Ninh" value="bac-ninh" />
          <Picker.Item label="Quảng Ninh" value="quang-ninh" />
          <Picker.Item label="Thành Phố Hồ Chí Minh" value="ho-chi-minh" />
          <Picker.Item label="Nhà P" value="nha-P" />
          <Picker.Item label="Nhà U" value="nha-U" />
          <Picker.Item label="Nhà Ta" value="nha-Ta" />
        </Picker>
        
        <View style={{
            flexDirection: "row",
            padding: 8,
            justifyContent: "space-around",
            height: Dimensions.get('window').height * 1/2
          }}
        >
          <WebView originWhitelist={["*"]}
            source={{uri: this.getURL(this.state.tinh)}}
          />
        </View>
        <TextInput style={styles.input} placeholder="Nhập tỉnh thành (VD: ha-noi, bac-ninh, ...): " onChangeText={newText => {
            this.setState({tinh: newText});
          }
        } value={this.state.tinh}/>
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
  input: {
    backgroundColor: "white"
  },
  buttonStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    backgroundColor: "white"
  },
});