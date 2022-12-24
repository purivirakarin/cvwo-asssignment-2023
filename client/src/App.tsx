import { Container, Grid } from '@mantine/core';
import './App.css'
import { ArticleCardFooter } from './components/ArticleCard';
import { HeaderTabs } from './components/Header';
import { Col, Menu, Row } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';

export interface Forum {
  id: number;
  title: string;
  body: string;
  date: Date;
}

function App() {
  return (
    <>
      <div>
        <HeaderTabs user={{
          name: 'Puri Virakarin',
          image: 'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        }} tabs={['Home', 'Menu', 'Settings']}  />
      </ div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  );
}

export default App
