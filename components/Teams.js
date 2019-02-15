import React, { Component } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import { Container, Left, Body, Text, ListItem, List, Spinner, Thumbnail } from 'native-base';

class teams extends Component {

    state = {
        teams: "",
        isLoading: false
    }

    static navigationOptions = {
        title: "La Liga Teams",
        headerStyle: {
            backgroundColor: "black"
        },
        headerTintColor: "white"
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });

        axios.get('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?s=Soccer&c=Spain').then((x) => {
            this.setState({
                teams: x.data.teams,
                isLoading: false
            });
        });
    }

    teams() {
        return this.state.teams.map((value, i) => {
            var id = value.idTeam;
            var Name = value.strTeam;
            var Website = value.strWebsite;
            var Logo = value.strTeamBadge

            return (
                <ListItem key={i} avatar onPress={() => {
                    this.props.navigation.navigate("players", {
                        id: id,
                        Name: Name
                    })
                }}>
                    <Left>
                        <Thumbnail source={{ uri: Logo }} />
                    </Left>
                    <Body>
                        <Text>{Name}</Text>
                        <Text note>{Website}</Text>
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
                        {this.state.isLoading ? <Spinner /> : this.state.teams ? this.teams() : <Text></Text>}
                    </List>
                </ScrollView>
            </Container>
        )
    }
}

export default teams;

