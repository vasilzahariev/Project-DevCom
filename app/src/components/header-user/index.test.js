import React from 'react';
import renderer from 'react-test-renderer'
import { BrowserRouter, Route } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import HeaderUser from '.';

describe('HeaderUser', () => {
    it('should render Admin', () => {
        const tree = renderer.create(
            <BrowserRouter>
                <Route>
                    <UserContext.Provider value={{ user: { loggedIn: true, isAdmin: true } }}>
                        <HeaderUser />
                    </UserContext.Provider>
                </Route>
            </BrowserRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })
    it('should render Admin 2', () => {
        const tree = renderer.create(
            <BrowserRouter>
                <Route>
                    <UserContext.Provider value={{ user: { loggedIn: true, isOwner: true } }}>
                        <HeaderUser />
                    </UserContext.Provider>
                </Route>
            </BrowserRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })
    it(`shouldn't render Admin`, () => {
        const tree = renderer.create(
            <BrowserRouter>
                <Route>
                    <UserContext.Provider value={{ user: { loggedIn: true } }}>
                        <HeaderUser />
                    </UserContext.Provider>
                </Route>
            </BrowserRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })
})
