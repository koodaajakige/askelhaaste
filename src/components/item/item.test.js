import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Item from './item';

test('renders item from props data', () => {
  render(<Router>
          <Item data={{
            id: "1234",
            name: "Heli",
            steps: 26100,
            today: "2022-07-04",
            periodStart: "",
            periodEnD:""
          }} />
        </Router>);
  const name = screen.getByText(/Heli/i);
  expect(name).toBeInTheDocument();

});