import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            fadeDuration={1000}
            style={styles.image}
            source={require('../assets/images/success.png')}
            //   source={{
            //     uri:
            //       'https://scontent-bru2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/49933894_2344730895754964_5526018966858082689_n.jpg?_nc_ht=scontent-bru2-1.cdninstagram.com&_nc_cat=108&_nc_ohc=b0VoGH02A0EAX_BBkrt&oh=a53add025bfdd0c689a55c257598dc30&oe=5E81BCEF&ig_cache_key=MTk2NzYzNDE2NzIyNzI5ODc3Mg%3D%3D.2'
            //   }}
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.infoText}>
            Your phone needed{' '}
            <Text style={styles.highlight}>{props.rounds} </Text>
            rounds to get the number{' '}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.newGame} color="green">
          NEW GAME
        </MainButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 10
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    borderRadius: Dimensions.get('window').width * 0.35,
    borderWidth: 3,
    borderColor: 'black',
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').width / 30
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
    fontSize: 20
  },
  resultContainer: {
    marginHorizontal: 20,
    marginVertical: Dimensions.get('window').width / 60
  }
});
