import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Header = styled.View`
  margin-top: 10%;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
`;

const TextInputContainer = styled.View`
  margin-top: 20px;
`;

const TextInputLabel = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: #ccc;
  padding: 0 10px;
  margin-bottom: 10px;
`;

const RatingContainer = styled.View`
  width: 50%;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: #fff;
`;

interface FeedbackProps {
  navigation: any;
}

const Feedback: React.FC<FeedbackProps> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSave = async () => {
    const validationErrors: string[] = [];

    if (!name.trim()) {
      validationErrors.push('Name is required');
    }

    if (!email.trim()) {
      validationErrors.push('Email is required');
    }

    if (rating === 0) {
      validationErrors.push('Rating is required');
    }

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      try {
        const feedbackData: any = {name, email, rating};
        if (feedback.trim()) {
          feedbackData.feedback = feedback;
        }
        // Save to AsyncStorage
        await AsyncStorage.setItem('feedback', JSON.stringify(feedbackData));
        Alert.alert('Success', 'Feedback saved successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('ShowGifs');
            },
          },
        ]);
      } catch (error) {
        console.error('Error saving feedback:', error);
        Alert.alert('Error', 'Failed to save feedback. Please try again.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <Header>
          <Title>Feedback</Title>
        </Header>
        <TextInputContainer>
          <TextInputLabel>Name</TextInputLabel>
          <StyledTextInput value={name} onChangeText={setName} />
          {errors.includes('Name is required') && (
            <Text style={{color: 'red'}}>Name is required</Text>
          )}
        </TextInputContainer>
        <TextInputContainer>
          <TextInputLabel>Email</TextInputLabel>
          <StyledTextInput value={email} onChangeText={setEmail} />
          {errors.includes('Email is required') && (
            <Text style={{color: 'red'}}>Email is required</Text>
          )}
        </TextInputContainer>
        <TextInputContainer>
          <TextInputLabel>Rating</TextInputLabel>
          <RatingContainer>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              selectedStar={rating => setRating(rating)}
              starSize={20}
              fullStarColor="#f39c12"
            />
          </RatingContainer>
          {errors.includes('Rating is required') && (
            <Text style={{color: 'red'}}>Rating is required</Text>
          )}
        </TextInputContainer>
        <TextInputContainer>
          <TextInputLabel>Feedback</TextInputLabel>
          <StyledTextInput
            value={feedback}
            onChangeText={setFeedback}
            multiline={true}
          />
        </TextInputContainer>
        <StyledTouchableOpacity onPress={handleSave}>
          <ButtonText>Save</ButtonText>
        </StyledTouchableOpacity>
      </Container>
    </ScrollView>
  );
};

export default Feedback;
