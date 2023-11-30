import React, { useState } from "react";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { Layout, Menu, Button } from "antd";
import { Link, Outlet } from "react-router-dom";
import type { MenuProps } from 'antd';
import {
  PieChartOutlined,
} from '@ant-design/icons';
const { Content } = Layout;
import { CiMusicNote1 } from 'react-icons/ci'

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

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
    getItem(<Link to="/admin">Thống kê</Link>, '1', <PieChartOutlined />),
    getItem(<Link to="/admin/listSong">Bài hát</Link>, '2', <CiMusicNote1 />)

  ];
  return (
    <div className="h-screen flex w-full">

      <div className={collapsed ? "min-w-[5%] ease-in-out duration-300 fixed z-0" : " min-w-[15%] ease-in-out duration-300 fixed  z-0"}>
        <Button
          type="primary"
          icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
          onClick={() => setCollapsed(!collapsed)}
          className="text-white z-50 bg-[#4a89ff] flex items-center justify-center absolute right-0 w-2 h-6  ease-in-out duration-300"
        />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          className="h-screen overflow-y-auto"
          inlineCollapsed={collapsed}
        />

      </div>
      <div className={collapsed ? "w-[95%] ml-[5%] ease-in-out duration-100" : "w-[85%] ml-[15%] ease-in-out duration-100"}>
        <Content
          style={{
            backgroundColor: 'white',
            height: '100vh',
          }}
          className="w-full relative"
        >
          <Outlet />
        </Content>
      </div>
    </div>
  );
};

export default LayoutAdmin;