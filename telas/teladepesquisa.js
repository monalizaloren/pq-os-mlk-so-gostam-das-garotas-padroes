import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList
} from "react-native";
import { Avatar, ListItem, Icon } from "react-native-elements";
import db from "../config";

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
      searchText: ""
    };
  }

  componentDidMount = async () => {
    this.getTransactions();
  };

       
getTransactions =()=> { 
    db.colletction('transactions')
      .limit(10)
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          this.setState({

               allTransactions: [this.state.allTransactions, doc.data()],
            LastVisibleTransaction: doc
          });
        });
      });
  };

   handleSearch = async text => {
    
    var enteredText =text.toUpperCase ().split('');

    this.setState({
      allTransactions: []
    });

     if (!text) {
       this.getTransactions
     }
   
     renderItem = ({ item, i }) => 
     { var date = item.date.toDate()
      .toString()
      .split(" ")
      .splice(0, 4)
      .join(""); 

      var transactionType = item.transaction_type === 'issue' ? 'issued' : 'returned';
     
      return (
      <View style={{ borderWidth: 1 }}>
        <ListItem key={i} bottomDivider>
          <Icon type="antdesign" name="book" size={40} />
          <ListItem.Content>
            <ListItem.Title style={styles.TitleStyle}>
              {`${item.book_name} (${item.book_id})`}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.Subtitle}>
              {`This book ${transactionType} by ${item.student_name}`}
              <View style={styles.lowerLeftContainer}>
                <View style={styles.transactionContainer}>
                  <Text
                    style={[
                      styles.transactionText,
                      {
                        color:
                          item.transaction_type === 'issue'
                            ? "#78D304"
                            : "#0364F4"
                      }
                    ]}
                  >
                    {item.transaction_type.charAt(0).toUpperCase() +
                      item.transaction_type.slice(1)}
                  </Text>
                </View>
              </View>
            </ListItem.Subtitle>
            <View>
              <Text style={styles.date}>{date}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };
}
 const style = StyleSheet.create ({
 TitleStyle: {
   fontSize: 20,
   fontFamily: "Rajdhani_600SemiBold"
 },
 Subtitle: {
   fontSize: 16,
   fontFamily: "Rajdhani_600SemiBold"
 } 
});
