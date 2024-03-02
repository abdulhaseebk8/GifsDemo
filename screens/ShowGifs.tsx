import React, {useState, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {INITIAL_LIMIT, SEARCH_LIMIT} from '../util/constants';
import {fetchTrendingGifs, searchGifs} from '../apiList/api';

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

interface Props {
  navigation: any; // Assuming navigation prop is passed from React Navigation
}

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

const GifItem = styled.View`
  margin-horizontal: 10%;
  margin-bottom: 20px;
`;

const GifImage = styled.Image`
  width: 100%;
  height: 200px;
`;

const GifTitle = styled.Text`
  font-size: 16px;
  margin-top: 10px;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 10px;
  padding: 0 10px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
`;

const ButtonContainer = styled.View`
  margin-top: auto;
`;

const ShowGifs: React.FC<Props> = ({navigation}) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(INITIAL_LIMIT);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchInitialGifs();
  }, []);

  const fetchInitialGifs = async () => {
    setLoading(true);
    try {
      const initialGifs = await fetchTrendingGifs();
      setGifs(initialGifs);
      setOffset(INITIAL_LIMIT);
      setIsLastPage(false);
    } catch (error) {
      console.error('Error fetching initial GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreGifs = async () => {
    if (!loading && !isLastPage) {
      setLoading(true);
      try {
        const moreGifs = query
          ? await searchGifs(query)
          : await fetchTrendingGifs();
        setGifs(prevGifs => [...prevGifs, ...moreGifs]);
        setOffset(prevOffset => prevOffset + SEARCH_LIMIT);
        setIsLastPage(moreGifs.length < SEARCH_LIMIT);
      } catch (error) {
        console.error('Error fetching more GIFs:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = () => {
    if (query) {
      setGifs([]);
      setOffset(SEARCH_LIMIT);
      setIsLastPage(false);
      fetchMoreGifs();
    }
  };

  const handleRefresh = () => {
    setGifs([]);
    setOffset(INITIAL_LIMIT);
    setIsLastPage(false);
    setRefreshing(true);
    fetchInitialGifs();
    setRefreshing(false);
  };

  const navigateToFeedback = () => {
    navigation.navigate('Feedback');
  };

  return (
    <Container>
      <Header>
        <Title>Showing GIFs</Title>
      </Header>
      <StyledTextInput
        onChangeText={text => setQuery(text)}
        value={query}
        placeholder="Search GIFs..."
      />
      <StyledTouchableOpacity onPress={handleSearch}>
        <ButtonText>Search</ButtonText>
      </StyledTouchableOpacity>
      <FlatList
        data={gifs}
        renderItem={({item}) => (
          <TouchableOpacity style={{marginTop: '3%'}}>
            <GifItem>
              <GifImage source={{uri: item?.images?.fixed_height?.url || ''}} />
              <GifTitle>{item?.title || ''}</GifTitle>
            </GifItem>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item?.id + index.toString()}
        onEndReached={fetchMoreGifs}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={() => {
          return loading ? (
            <Text style={{alignSelf: 'center'}}>Loading...</Text>
          ) : null;
        }}
      />
      <ButtonContainer>
        <StyledTouchableOpacity onPress={navigateToFeedback}>
          <ButtonText>Go to Feedback</ButtonText>
        </StyledTouchableOpacity>
      </ButtonContainer>
    </Container>
  );
};

export default ShowGifs;
