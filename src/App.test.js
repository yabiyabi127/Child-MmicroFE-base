import React from 'react';
import { render } from '@testing-library/react';
import App from './AppRender';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  
});
