import React, {useCallback, useEffect, useState} from 'react';
import {render} from 'react-dom';
import pickItem from "../package/main";
import './index.less';

function App() {

  return (
    <>
      <button>选择</button>
    </>
  );
}

render(<App/>, document.getElementById('app'));
