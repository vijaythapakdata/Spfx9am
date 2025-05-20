import * as React from 'react';
import { useState } from 'react';
import { IFunctionalComponentProps } from './IFunctionalComponentProps';
import { IFunctionalComponentState } from './IFunctionalComponentState';
import { Web } from '@pnp/sp/webs';
import { Dialog } from '@microsoft/sp-dialog';
import { PrimaryButton, Slider, TextField } from '@fluentui/react';

const FunctionalComponent :React.FC<IFunctionalComponentProps>=(props)=>{
  const[formData,setFormdData]=useState<IFunctionalComponentState>({
    Name:'',
    Email:'',
    Age:'',
    Score:0,
    Salary:'',
    Address:''
  });
  //create item
  const createItem=async()=>{
    try{
      const web=Web(props.siteurl);// store the site url 
      const lists=web.lists.getByTitle(props.ListName);
      const item=await lists.items.add({
        Title:formData.Name,
        EmailAddress:formData.Email,
        Age:parseInt(formData.Age),
        Address:formData.Address,
        Score:formData.Score,
        Salary:parseInt(formData.Salary)
      });
      Dialog.alert('Item created successfully');
      console.log(item);
      setFormdData({
         Name:'',
    Email:'',
    Age:'',
    Score:0,
    Salary:'',
    Address:''
      })
    }catch(error){
      console.log(error);
    }
  }
  //event handle
  const handleChange=(fieldvalue:keyof IFunctionalComponentState,value:string|number|boolean)=>{
    setFormdData(prevState=>({...prevState,[fieldvalue]:value}));
  }
return(

  <>
  <TextField label='Name' value={formData.Name} onChange={(_,event)=>handleChange("Name",event||"")} iconProps={{iconName:'people'}}/>

     <TextField label='Email Address' value={formData.Email} onChange={(_,event)=>handleChange("Email",event||"")} iconProps={{iconName:'mail'}}/>
       <TextField label='Age' value={formData.Age} onChange={(_,event)=>handleChange("Age",event||"")} />
          <TextField label='Salar' value={formData.Salary} onChange={(_,event)=>handleChange("Salary",event||"")} 
          prefix='$' suffix='USD' />
          <Slider value={formData.Score} min={0} max={100} step={1} showValue label='Score' onChange={(value)=>handleChange("Score",value)} />
          <TextField label='Address' value={formData.Address} onChange={(_,event)=>handleChange("Address",event||"")} multiline rows={3} iconProps={{iconName:'home'}}/>
        <br/>
        <PrimaryButton text='Save' onClick={createItem} iconProps={{iconName:'save'}} />
  </>
)
}
export default FunctionalComponent;