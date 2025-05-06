import * as React from 'react';
import styles from './FirstWebpart.module.scss';
import type { IFirstWebpartProps } from './IFirstWebpartProps';
import { PrimaryButton ,Label, TextField, Dropdown, ComboBox, ChoiceGroup, SearchBox, DatePicker, Slider, Toggle, Checkbox} from '@fluentui/react';
// import { Label } from '@fluentui/react';
export default class FirstWebpart extends React.Component<IFirstWebpartProps> {

  public render(): React.ReactElement<IFirstWebpartProps> {
   

    return (
     <>
    <p className={styles.p}>I am learning spfx</p>
    <br/>
   <button title="Save" className={styles.button}>Save</button>&nbsp;&nbsp;&nbsp;
   <PrimaryButton text='Save' iconProps={{iconName:'save'}}/>&nbsp;&nbsp;&nbsp;
   <PrimaryButton text='Delete' iconProps={{iconName:'delete'}}/>
   <hr/>
   <SearchBox placeholder='search here' iconProps={{iconName:'search'}} />
    <br/><br/>
  
   <TextField placeholder='Vijay thapak' label='Full Name' required/>
   <Label>Email ID</Label>
   <TextField type='email'autoComplete='on'
   placeholder='vijaythapak2001@gmail.com'/>
   <Label>Password</Label>
   <TextField type='password'canRevealPassword />
   <Label>Upload File</Label>
   <TextField type='file'/>
   <Label>Full Address</Label>
   <TextField multiline rows={5}iconProps={{iconName:'location'}}/>
   <Label>Salary</Label>
   <TextField type='text' prefix='₹' suffix='INR'/>
   <Label>Read Only</Label>
   <TextField disabled placeholder='I am read only'/>
   <Dropdown options={[
    {key:'IT',text:'IT'},
    {key:'HR',text:'HR'},
    {key:'Finance',text:'Finance'},
    {key:'Admin',text:'Admin'},
    {key:'Sales',text:'Sales'},
    
   ]}
   label='Department'
   placeholder='--select--'/>

<ComboBox options={[
    {key:'IT',text:'IT'},
    {key:'HR',text:'HR'},
    {key:'Finance',text:'Finance'},
    {key:'Admin',text:'Admin'},
    {key:'Sales',text:'Sales'},
    
   ]}
   label='Departments'
   placeholder='--select--'
   multiSelect
   autoComplete='on'
   allowFreeInput
   />
   <ChoiceGroup
   label='Gender'
   options={[
    {key:'Male',text:'Male'},
   {key:'Female',text:'Female'}
   ]}
   />
   <DatePicker
   label='DOJ'/>
   <Slider label='Marks' min={1} max={100} step={5}/>
   <Toggle label="Permission" />
   <Checkbox label='Accept Terms and Conditions' />
   
     </>
    );
  }
}
