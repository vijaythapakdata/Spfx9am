import * as React from 'react';
import styles from './FirstWebpart.module.scss';
import type { IFirstWebpartProps } from './IFirstWebpartProps';
import { PrimaryButton } from '@fluentui/react';


export default class FirstWebpart extends React.Component<IFirstWebpartProps> {
  public render(): React.ReactElement<IFirstWebpartProps> {
   

    return (
     <>
    <p className={styles.p}>I am learning spfx</p>
    <br/>
   <button title="Save" className={styles.button}>Save</button>&nbsp;&nbsp;&nbsp;
   <PrimaryButton text='Save' iconProps={{iconName:'save'}}/>
     </>
    );
  }
}
