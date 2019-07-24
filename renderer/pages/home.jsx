import React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/Head';
import Link from 'next/Link';
import {
  Layout,
  List,
} from 'antd';
import 'antd/dist/antd.css';

const {Header, Content} = Layout;

const Home = () => {
  // if Next.js's webpack process is server side one, remote is undefined!
  // if this is client one, remote is available.
  const remote = require('electron').remote || false;

  const [data, setData] = useState([]);

  // it works only client process
  if (remote) {
    // dinamically import from main process (from background.js)
    const { listAllAvailables } = remote.require('./serialport');

    useEffect(() => {
      (async () => {
        const availables = await listAllAvailables();
        for (let i = 0; i < availables.length; i++) {
          const item = availables[i];
          console.log(item);
          setData(data.concat(item.comName));
        }
      })();
    }, []);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript-ant-design)</title>
      </Head>

      <Header>
        <Link href="/next">
          <a>Go to next page</a>
        </Link>
      </Header>

      <Content style={{padding: 48}}>
        <List
          header="Available Serial Ports"
          dataSource={data}
          renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
          bordered
        />
      </Content>
    </React.Fragment>
  );
};

export default Home;
