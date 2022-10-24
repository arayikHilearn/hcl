// import { FC } from 'react';
// import { Menu, Row } from 'antd';
// import { Header } from 'antd/es/layout/layout';
// import { useNavigate } from 'react-router-dom';
// import { ERoutes } from '../pages';
// import { ItemType } from 'antd/lib/menu/hooks/useItems';
// import { useActions, useAppSelector } from '../hooks/redux';
//
// const Navbar: FC = () => {
//     const { isAuth, user } = useAppSelector( state => state.auth );
//     const isAppReady = useAppSelector( ( { app } ) => app.isAppReady );
//     const { logout } = useActions();
//     const navigate = useNavigate();
//     let menuItemsCounter = 0;
//
//
//     const menuCommonItems: Array<ItemType> = [
//         { key: ++menuItemsCounter, label: 'Posts', onClick: () => navigate( ERoutes.POST ) },
//         { key: ++menuItemsCounter, label: 'LOGINNAVIGATE', onClick: () => navigate( ERoutes.LOGIN ) },
//     ];
//
//     const menuItems: Array<ItemType> =
//         isAuth
//             ? [
//                 { key: ++menuItemsCounter, label: user?.username },
//                 ...menuCommonItems,
//                 { key: ++menuItemsCounter, label: 'Log out', onClick: () => logout() },
//             ]
//             : [
//                 ...menuCommonItems,
//                 { key: ++menuItemsCounter, label: 'Login', onClick: () => navigate( ERoutes.LOGIN ) }
//             ];
//
//     return (
//         <Header>
//             <Row justify="space-between">
//                 <div
//                     style={{ color: 'white', fontSize: 16, textTransform: 'uppercase', cursor: 'pointer' }}
//                     onClick={ () => navigate( ERoutes.HOME ) }
//                 >
//                     LOGO
//                 </div>
//                 <Menu
//                     overflowedIndicator={ null }
//                     theme="dark"
//                     mode="horizontal"
//                     selectable={ false }
//                     items={ isAppReady ? menuItems : menuCommonItems }
//                 />
//             </Row>
//         </Header>
//     );
// };
//
// export default Navbar;
