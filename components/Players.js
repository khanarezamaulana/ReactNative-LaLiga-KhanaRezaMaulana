import React, { Component } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import { Container, Left, Body, Text, ListItem, List, Spinner, Thumbnail } from 'native-base';

class Players extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: "",
            isLoading: false,
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("Name"),
            headerStyle: {
                backgroundColor: "black"
            },
            headerTintColor: "white"
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });

        var id = this.props.navigation.getParam("id")
        axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${id}`).then((x) => {
            this.setState({
                players: x.data.player,
                isLoading: false
            });
        });
    }

    Players() {
        return this.state.players.map((value, i) => {
            var id = value.idPlayer;
            var Name = value.strPlayer;
            var Picture = value.strThumb;
            var Position = value.strPosition;
            var Description = value.strDescriptionEN;
            var Nationality = value.strNationality;

            return (
                <ListItem key={i} avatar onPress={() => {
                    this.props.navigation.navigate("details", {
                        id: id,
                        Name: Name,
                        Description: Description,
                        Nationality: Nationality,
                        Picture: Picture
                    })
                }}>
                    <Left>
                        <Thumbnail square source={{ uri: Picture }} />
                    </Left>
                    <Body>
                        <Text>{Name}</Text>
                        <Text note>{Position}</Text>
                    </Body>
                </ListItem>
            )
        })
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <List>
                        {this.state.isLoading ? <Spinner /> : this.state.players ? this.Players() : <Text></Text>}
                    </List>
                </ScrollView>
            </Container>
        )
    }
}

export default Players;

