import logo from './logo.svg';
import './App.css';
import UserDetail from './components/UserDetail';
import UserList from './components/UserList';
import { Container } from '@chakra-ui/react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import SingleData from './components/SingleData';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Editor from './components/Editor';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <hr />
      {/* <Container w="100%"> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<UserList />} />
        <Route path='/all-posts' element={<UserList />} />
        <Route path='/top-posts' element={<UserList />} />
        <Route path='/make-posts' element={<Editor />} />
        <Route path='/:id' element={<UserDetail />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      {/* </Container> */}
      <hr />
      <Footer />
    </BrowserRouter>
  );
}

const NotFound = () => {
  return (<h4>Nothing found for your query</h4>)
}

export default App;
