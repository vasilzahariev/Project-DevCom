import React from 'react';
import renderer from 'react-test-renderer';
import Header from './index';
import { BrowserRouter, Route } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

describe('Header', () => {
    it('should render HeaderUser', () => {
        const tree = renderer.create(
            <BrowserRouter>
                <Route>
                    <UserContext.Provider value={{
                        user: {
                            loggedIn: true
                        }
                    }}>
                        <Header />
                    </UserContext.Provider>
                </Route>
            </BrowserRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })
    it('should render HederUserGuest', () => {
        const tree = renderer.create(
            <BrowserRouter>
                <Route>
                    <UserContext.Provider value={{
                        user: {
                            loggedIn: false
                        }
                    }}>
                        <Header />
                    </UserContext.Provider>
                </Route>
            </BrowserRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })
});
