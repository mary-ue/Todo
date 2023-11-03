import { ReactNode } from 'react';
import s from './Container.module.scss';

type Props = {
  children: ReactNode;
}

export const Container = ({children}: Props) => {
  return (
    <div className={s.container}>
      {children}
    </div>
  )
};