import * as React from 'react';
import {Container, Card, Item, Icon} from 'semantic-ui-react';

export interface IProps {
    userProfile: {
        firstName: string;
        appPlatform: string;
        phoneNumber: string;
        parent: any;
        bankCard: any;
    };
}

class ChildProfile extends React.Component {
    dragEnd = (event: any) => {
        console.log('dragEnd', event.target.id);
    };
    dragStart = (event: any) => {
        console.log('dragStart', event.target.id);
        event.dataTransfer.setData('movingID', event.target.id);
    };
    drop = (event: any) => {
        console.log('drop', event.target.id);
    };

    render() {
        const {
            userProfile: {firstName, appPlatform, phoneNumber, parent, bankCard},
        } = this.props;

        return (
            <Container>
                <Card>
                    <Card.Content>
                        <Card.Header>Ребенок</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Item.Group>
                            <Item>
                                <Icon
                                    circular
                                    size="big"
                                    name={appPlatform === 'ios' ? 'apple' : 'android'}
                                    color={appPlatform === 'ios' ? 'black' : 'green'}
                                />
                                <Item.Content>
                                    <Item.Header>
                                        <Item>{firstName}</Item>
                                    </Item.Header>
                                    <Item.Description>
                                        <Item>{phoneNumber}</Item>
                                    </Item.Description>
                                    <Item.Description>
                                        <Item>{bankCard ? (bankCard.hasOwnProperty('data') ? bankCard.data : bankCard.card.panMask) : 'searching...'}</Item>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <Card.Header>Родитель</Card.Header>
                    </Card.Content>

                    <Card.Content>
                        <Item.Group>
                            {parent ? (
                                <Item
                                    id={parent.id}
                                    draggable="true"
                                    onDrop={this.drop}
                                    onDragStart={this.dragStart}
                                    onDragOver={ (event: any) => event.preventDefault()}
                                    onDragEnd={this.dragEnd}
                                >
                                    <Icon
                                        circular
                                        size="big"
                                        name={parent.appPlatform === 'ios' ? 'apple' : 'android'}
                                        color={parent.appPlatform === 'ios' ? 'black' : 'green'}
                                    />
                                    <Item.Content>
                                        <Item.Header>
                                            <Item>
                                                {parent.firstName}
                                            </Item>
                                        </Item.Header>
                                        <Item.Description>
                                            <Item>{parent.phoneNumber}</Item>
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            ) : (
                                'Нет родителя'
                            )}
                        </Item.Group>
                    </Card.Content>
                </Card>
            </Container>
        );
    }
}

export default ChildProfile;