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

  /* A função componentDidMount é um método de ciclo de vida
   em componentes React que é executado após o componente ter sido montado
   Adicione esse método abaixo: */
  componentDidMount = async () => {
    /*Ao chamar getTransactions() dentro de componentDidMount, o componente garante que a função é executada assim que o componente é montado na tela, ou seja,
     as informações são buscadas imediatamente quando o componente é exibido para o usuário. 
     Chame essa função abaixo:*/
    this.getTransactions();
  };
/*A função getTransactions é usada para obter as transações da coleção "transactions" do banco de dados Firebase.
Como você poderia criar a função ' getTransactions' e obter a coleção 'transactions'? */
       
getTransactions =()=> { 
    db.colletction('transactions')
      .limit(10)
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          this.setState({
            /* Cada vez que um documento é processado, suas informações são adicionadas ao array allTransactions.

            'lastVisibleTransaction' é usada como ponto de referência para a próxima consulta do banco de dados. 
            A cada iteração da função getTransactions, a referência 'lastVisibleTransaction' é atualizada com o
             último documento recuperado, para que a próxima consulta comece a partir da última transação.
             Adicione essa propriedade abaixo:
            */
           
               allTransactions: [this.state.allTransactions, doc.data()],
            LastVisibleTransaction: doc
          });
        });
      });
  };

   handleSearch = async text => {
    /* o texto de pesquisa é convertido para letras maiúsculas e, em seguida, dividido em um array de caracteres 
    Como você poderia fazer isso? */
    var enteredText =text.toUpperCase ().split('');

    this.setState({
      allTransactions: []
    });
    /*Se o texto de pesquisa estiver vazio, ou seja, se o usuário não inseriu nada, a função getTransactions é chamada.
    Faça isso abaixo: */
     if (!text) {
       this.getTransactions
     }
   
     renderItem = ({ item, i }) => 
     { var date = item.date.toDate()
      .toString()
      .split(" ")
      .splice(0, 4)
      .join(""); // Resto do código };

      var transactionType = item.transaction_type === 'issue' ? 'issued' : 'returned';
     
       return (
         <View style= {{borderWidth: 1}}>
           <ListItem key= {i}bottomDivider>
            <Icon type= {antdesigner}name= {'book'}size= {40}>
             <ListItem.Content>
               <ListItem.Title style= {style.TitleStyle}>
                {`$ {item.book_name} ($ {item.book_id})`}
                </ListItem.Title>
                <ListItem.Subtitle style= {style.Subtitle}>
                 {`This book ${transactionType} by ${item.student_name}`}
                 <View style= {styles.lowerLeftContainer}>
                 <View style= {styles.transactionContainer}>
                   <Text style={[styles.transactionText, {
                     color: item.transaction_type === 'issue' ? "#78D304" : "#0364F4"
                   }
                  ]}
                  >
                    {item.transaction_type.charAt(0).toUpperCase() + 
                    item.transaction_type.slice(1)}
                  </Text>
                </ListItem.Subtitle>
                <View>
                  <Text style= {style.date}>
                    {date}
                  </Text>
                </View>
             </ListItem.Content>
           </ListItem>
         </View>
       )
     }
   }
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