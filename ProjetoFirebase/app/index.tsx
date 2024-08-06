import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCeqv3IDH9mgemMmuZRc1T0nwCwH_nFl78",
  authDomain: "meuprimeirofirebase-9e39f.firebaseapp.com",
  projectId: "meuprimeirofirebase-9e39f",
  storageBucket: "meuprimeirofirebase-9e39f.appspot.com",
  messagingSenderId: "755887028274",
  appId: "1:755887028274:web:c8df7407591224aff7642b"
};

firebase.initializeApp(firebaseConfig);


import React, {useEffect, useState} from 'react';
import{View, Text, FlatList} from 'react-native';

export default function App(){
  const [nomes, setNomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const nomesCollection = firebase.firestore().collection('Nomes');
      const snapshot = await nomesCollection.get();

      const data = [];
      snapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
      });

      setNomes(data)
    };

    fetchData();
  },[]);

  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Lista de Nomes:</Text>
      <FlatList
        data={nomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.Nome} {item.Sobrenome}</Text>
          </View>
        )}
      />
    </View>
  );
}
