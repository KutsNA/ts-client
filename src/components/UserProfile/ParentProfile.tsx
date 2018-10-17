import * as React from 'react';
import {Container, Card, Item, Icon} from 'semantic-ui-react';

export interface IProps {
    userProfile:
        {
            firstName: string;
            phoneNumber: string;
            appPlatform: string;
            children: any;
        };
}

class ParentProfile extends React.Component<IProps, Object>{
    dragEnd(event: any) {
        console.log('dragEnd', event.target.id);
    }

    dragStart(event: any) {
        console.log('dragStart', event.target.id);
        event.dataTransfer.setData("movingID", event.target.id);
    }

    drop(event: any) {
        console.log('drop', event.target.id);
    }

    render() {
        const {
            userProfile: {firstName, phoneNumber, appPlatform, children},
        } = this.props;

        return (
            <Container>
                <Card>
                    <Card.Content>
                        <Card.Header>Родитель</Card.Header>
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
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <Card.Header>Дети</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Item.Group divided>
                            {children
                                ? children.map( (child: any) => (
                                    <Item
                                        key={child.id}
                                        id={child.id}
                                        draggable="true"
                                        onDrop={this.drop}
                                        onDragStart={this.dragStart}
                                        onDragOver={ (event: any) => event.preventDefault()}
                                        onDragEnd={this.dragEnd}
                                    >
                                        <Item.Content>
                                            <Item.Header>                                                                                            >
                                                <Item>{child.firstName}</Item>
                                            </Item.Header>
                                            <Item.Description>
                                                <Item>{child.phoneNumber}</Item>
                                            </Item.Description>
                                        </Item.Content>
                                    </Item>
                                ))
                                : 'Детей нет'}
                        </Item.Group>
                    </Card.Content>
                </Card>
            </Container>
        );
    }
}

export default ParentProfile;