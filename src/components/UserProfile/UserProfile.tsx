import * as React from 'react';
import {Container} from 'semantic-ui-react';
import UserProfileApi from '../API/UserProfileApi';
import ParentProfile from './ParentProfile';
import ChildProfile from './ChildProfile';

export interface IProps {
    userId?: string;
    phoneNumber: string;
    history: Array<string>;
};

interface IState {
    userId: string;
    phoneNumber: string;
    userProfile: any;
};

class UserProfile extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            phoneNumber: '',
            userId: '',
            userProfile: undefined,
        };
    };

    // componentWillMount() {
    //     const {userId, phoneNumber} = this.props;
    //     if (userId) {
    //         this.getUserById(userId);
    //     }
    //     if (phoneNumber) {
    //         this.getUserByPhoneNumber(phoneNumber);
    //     }
    // }

    static getDerivedStateFromProps(prevState: IState, nextProps: IProps) {
        if (prevState.userId !== nextProps.userId) {
            this.getUserById(nextProps.userId);
            return {
                userId: nextProps.userId,
            };
        }
        if (prevState.phoneNumber !== nextProps.phoneNumber) {
            this.getUserByPhoneNumber(nextProps.phoneNumber);
            return {
                userId: nextProps.phoneNumber,
            };
        }
        return null;
    };

    async getUserById(userId: string){
        try {
            const userProfile = await UserProfileApi.getUserById(userId);
            this.setState(userProfile);
            this.initializeFamily(userProfile);
        } catch (error) {
            console.error(error);
        }
    };

    async getUserByPhoneNumber(phoneNumber: string) {
        const {history} = this.props;
        try {
            const userProfile = await UserProfileApi.getUserByPhoneNumber(phoneNumber);
            this.setState(userProfile);
            this.initializeFamily(userProfile);
            if (userProfile.id) {
                history.push(`/user/${userProfile.id}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    private async initializeFamily(userProfile: any) {

        if (userProfile && userProfile.role === 'parent') {
            userProfile.children = await this.addChildren(userProfile.id);
            this.setState(userProfile);
        }

        if (userProfile && userProfile.role === 'child' && userProfile.parentId) {
            userProfile.parent = await this.addParent(userProfile.parentId);
            userProfile.bankCard = await this.addBankCardToChild(userProfile.id);
            const children = await this.addChildren(userProfile.parentId);
            this.setState(userProfile);
        } else {
            //onChangeState('userProfile', userProfile);// Не привязан родитель
            //Нужно придумать что отправлять в транзакции, когда нет привязки
        }
    }

    private async addChildren(parentId: string) {
        const {children} = await UserProfileApi.getChildrenByParentId(parentId);
        children.map(async (el: any) => {
            el.bankCard = await this.addBankCardToChild(el.id);
        });
        return children;
    }

    private async addParent(parentId: string) {
        const parent = await UserProfileApi.getUserById(parentId);
        return parent;
    }

    private async addBankCardToChild(childId: string) {
        const bankCard = await UserProfileApi.getBankCardByChildId(childId);
        return bankCard;
    }

    render() {
        const {userProfile} = this.state;
        return (
            <div>
                <Container>
                    {userProfile && userProfile.role === 'parent' ? (
                        <ParentProfile userProfile={this.state.userProfile}/>
                    ) : null}
                    {userProfile && userProfile.role === 'child' ? (
                        <ChildProfile/>
                    ) : null}
                </Container>
            </div>
        );
    };
};

export default UserProfile;