import React, { Component } from 'react';
import axios from 'axios';
import { Image, ScrollView } from 'react-native';
import { Container, Card, CardItem, Left, Body, Right, Text, Thumbnail } from 'native-base';

class details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: "",
            isLoading: false,
            id: this.props.navigation.getParam("id")
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


        axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${this.state.id}`).then((x) => {
            this.setState({
                details: x.data.players[0],
                isLoading: false
            });
        });
    }

    details() {
        return (
            <Card transparent style={{ flex: 0, width: 350, alignSelf: "center", marginTop: 10 }}>
                <CardItem>
                    <Left>
                        <Thumbnail style={{ maxWidth: 30, maxHeight: 30 }} source={{ uri: this.props.navigation.getParam("Picture") }} />
                        <Body>
                            <Text>{this.props.navigation.getParam("Name")}</Text>
                            <Text note>{this.props.navigation.getParam("Nationality")}</Text>
                        </Body>
                    </Left>
                    <Right>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <Image source={{ uri: this.props.navigation.getParam("Picture") }} style={{ height: 200, width: "100%", flex: 1 }} />
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{ fontSize: 12 }}>{this.props.navigation.getParam("Description")}</Text>
                    </Left>
                </CardItem>
            </Card>
        )
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    {this.details()}
                </ScrollView>
            </Container>
        )
    }
}

export default details;

