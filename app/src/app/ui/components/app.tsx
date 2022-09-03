import React, { useEffect } from 'react';

import Schedule from './schedule';
import ErrorBanner from './error-banner';

const App = ({ data = null, isLoading = false, error = null, loadData }) => {

  useEffect(() => { loadData() }, []);

  return (
    <>
      <h1>Pills (v1)</h1>
      {data && <Schedule data={data} />}
      {isLoading && <p>Loading...</p>}
      {error && <ErrorBanner error={error} />}
    </>
  );
};

export default App;
