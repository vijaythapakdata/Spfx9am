import * as React from 'react';
// import styles from './SampleForm.module.scss';
import type { ISampleFormProps } from './ISampleFormProps';
import { ISampleFormState } from './ISampleFormState';
import { Web } from '@pnp/sp/webs';
import {Dialog} from '@microsoft/sp-dialog';
import { PrimaryButton, TextField } from '@fluentui/react';
export default class SampleForm extends React.Component<ISampleFormProps,ISampleFormState> {
  constructor(props:ISampleFormProps,state:ISampleFormState){
    super(props);
    this.state={
      Name:'',
      Email:'',
      Age:''
    }
  }
//create item
public async createItem(){
  let web=Web(this.props.siteurl); // https://contoso.sharepoint.com/sites/your-site

  await web.lists.getByTitle(this.props.ListName).items.add({
    Title:this.state.Name,
    EmailAddress:this.state.Email,
    Age:parseInt(this.state.Age)
  })
  .then((response:any)=>{
    // console.log('Item created successfully',response);
    Dialog.alert('Item created successfully');
    this.setState({
      Name:'',
      Email:'',
      Age:''
    });
    return response;

  })
  .catch((error:any)=>{
    // console.log('Error creating item',error);
    Dialog.alert('Error creating item');
    throw error;
  })

}

//Form Event

private handleChange=(fieldvalue:keyof ISampleFormState,value:string|number|boolean):void=>{
this.setState({[fieldvalue]:value}as unknown as Pick<ISampleFormState,keyof ISampleFormState>
 )
}
  public render(): React.ReactElement<ISampleFormProps> {
    

    return (
     <>
     <TextField label='Full Name' value={this.state.Name}
     onChange={(_,event)=>this.handleChange('Name',event||'')}
     />
     <TextField label='Email Address' value={this.state.Email}
     onChange={(_,event)=>this.handleChange('Email',event||'')}
     /><TextField label='Age' value={this.state.Age}
     onChange={(_,event)=>this.handleChange('Age',event||'')}
     />
     <br/>
     <PrimaryButton text='Save' onClick={()=>this.createItem()} iconProps={{iconName:'save'}}/>
     </>
    );
  }
}
