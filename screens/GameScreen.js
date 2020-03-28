import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { ScreenOrientation } from 'expo';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const random = Math.floor(Math.random() * (max - min)) + min;
  if (random === exclude) {
    return generateRandomBetween(min, max, exclude);
  }

  return random;
};

const renderListItem = (listLength, itemData) => (
  <View key={itemData.item} style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  let initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert(`Don't lie!`, 'You know that this is wrong...', [
        {
          text: 'Sorry :(',
          style: 'cancel'
        }
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPastGuesses(currentPastGuesses => [
      nextNumber.toString(),
      ...currentPastGuesses
    ]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <ScrollView>
        <View style={styles.screen}>
          <BodyText style={DefaultStyles.bodyText}>Opponent's Guess</BodyText>
          <View style={styles.controls}>
            <MainButton onPress={() => nextGuessHandler('lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </MainButton>
            <NumberContainer>{currentGuess}</NumberContainer>
            <MainButton onPress={() => nextGuessHandler('greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </MainButton>
          </View>
          <View style={styles.listContainer}>
            {/* <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
            </ScrollView>*/}
            <FlatList
              keyExtractor={item => item}
              data={pastGuesses}
              renderItem={renderListItem.bind(this, pastGuesses.length)}
              contentContainerStyle={styles.list}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <BodyText style={DefaultStyles.bodyText}>Opponent's Guess</BodyText>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={() => nextGuessHandler('lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <MainButton onPress={() => nextGuessHandler('greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
          </ScrollView>*/}
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    margin: 10
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    width: '100%'
  }
});
