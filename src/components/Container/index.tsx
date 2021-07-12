import { ReactNode } from 'react';

import './styles.css';

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps): JSX.Element => (
  <div className="Container">{children}</div>
);

export default Container;
