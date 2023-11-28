import React, { useState } from "react";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import type { MenuProps } from 'antd';
import {
  PieChartOutlined,
} from '@ant-design/icons';
const { Content } = Layout;
import { CiMusicNote1 } from 'react-icons/ci'

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(<Link to="/admin/dashboard">Thống kê</Link>, '1', <PieChartOutlined />),
    getItem('Bài hát', 'sub1', <CiMusicNote1 />, [
      getItem(<Link to="/admin/song">Thêm bài hát</Link>, '2'),
      getItem(<Link to="/admin/listsong">Danh sách nhạc</Link>, '3'),
    ]),

  ];
  return (
    <div className="h-screen flex w-full">
      <div className={collapsed ? "min-w-[5%] ease-in-out duration-300 fixed z-50" : " min-w-[15%] ease-in-out duration-300 fixed  z-50"}>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          className="h-screen overflow-y-auto"
          inlineCollapsed={collapsed}
        />
      </div>
      <div className={collapsed ? " w-[95%] ml-[6%] ease-in-out duration-100" : "w-[85%] ml-[15%] ease-in-out duration-100"}>
        <Content
          style={{
            background: colorBgContainer,
          }}
        >
          <Button
            type="primary"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-black z-0"
          />
          <div className="pl-10">
            <Outlet />
          </div>
        </Content>
      </div>
    </div>
  );
};

export default LayoutAdmin;