import * as React from 'react';
// import styles from './SampleForm.module.scss';
import type { ISampleFormProps } from './ISampleFormProps';
import { ISampleFormState } from './ISampleFormState';
import { Web } from '@pnp/sp/webs';
import {Dialog} from '@microsoft/sp-dialog';
import { PrimaryButton, Slider, TextField } from '@fluentui/react';
import { PeoplePicker,PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
export default class SampleForm extends React.Component<ISampleFormProps,ISampleFormState> {
  constructor(props:ISampleFormProps,state:ISampleFormState){
    super(props);
    this.state={
      Name:'',
      Email:'',
      Age:'',
      Score:0,
      FullAddress:'',
      Manager:[],
      ManagerId:[],
      Admin:'',
      AdminId:0

    }
  }
//create item
public async createItem(){
  let web=Web(this.props.siteurl); // https://contoso.sharepoint.com/sites/your-site

  await web.lists.getByTitle(this.props.ListName).items.add({
    Title:this.state.Name,
    EmailAddress:this.state.Email,
    Age:parseInt(this.state.Age),
    Address:this.state.FullAddress,
    Score:this.state.Score,
    ManagerId:{results:this.state.ManagerId},
    AdminId:this.state.AdminId
  })
  .then((response:any)=>{
    // console.log('Item created successfully',response);
    Dialog.alert('Item created successfully');
    this.setState({
      Name:'',
      Email:'',
      Age:'',
      FullAddress:'',
      Score:0,
      AdminId:0,
      Admin:'',
      Manager:[],
      ManagerId:[]
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
     <TextField label='Full Address' value={this.state.FullAddress}
     onChange={(_,event)=>this.handleChange('FullAddress',event||'')}
     multiline rows={5}
      iconProps={{iconName:'location'}}
      placeholder='Enter your address'
     />
     <Slider min={0} max={100}
     label='Score'
     value={this.state.Score}
     onChange={(value:number)=>this.handleChange('Score',value)}
     />
<PeoplePicker
context={this.props.context as any}
titleText='Managers'
personSelectionLimit={3}
principalTypes={[PrincipalType.User]}
defaultSelectedUsers={this.state.Manager}
resolveDelay={1000}
ensureUser={true}
onChange={this._getManagers}
webAbsoluteUrl={this.props.siteurl}
/>

<PeoplePicker
context={this.props.context as any}
titleText='Admin'
personSelectionLimit={1}
principalTypes={[PrincipalType.User]}
defaultSelectedUsers={[this.state.Admin?this.state.Admin:'']}
resolveDelay={1000}
ensureUser={true}
onChange={this._getAdmin}
webAbsoluteUrl={this.props.siteurl}
/>
     <br/>
     <PrimaryButton text='Save' onClick={()=>this.createItem()} iconProps={{iconName:'save'}}/>
     </>
    );
  }
  //Multiple People picker

  private _getManagers=(items:any):void=>{
    const managers=items.map((item:any)=>item.text);
    const managersId=items.map((item:any)=>item.id);
    this.setState({
      Manager:managers,
      ManagerId:managersId
    })
  }
  //Single People picker
  private _getAdmin=(items:any):void=>{
    if(items.length>0){
      this.setState({
        Admin:items[0].text,
        AdminId:items[0].id
      });
    }
    else{
      this.setState({
        Admin:'',
        AdminId:0
      })
    }
  }
}
