import * as React from 'react';
// import styles from './SampleForm.module.scss';
import type { ISampleFormProps } from './ISampleFormProps';
import { ISampleFormState } from './ISampleFormState';
import { Web } from '@pnp/sp/webs';
import {Dialog} from '@microsoft/sp-dialog';
import { ChoiceGroup, DatePicker, Dropdown, IDatePickerStrings, IDropdownOption, PrimaryButton, Slider, TextField } from '@fluentui/react';
import { PeoplePicker,PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
export const DatePickerString:IDatePickerStrings={
  months:['January','February','March','April','May','June','July','August','September','October','November','December'],
  shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  goToToday:'Go to today',
  prevMonthAriaLabel:'Previous month',
  nextMonthAriaLabel:'Next month',
  prevYearAriaLabel:'Previous year',
  nextYearAriaLabel:'Next year',
  closeButtonAriaLabel:'Close date picker',
}
export const FormateDate=(date:any):string=>{
  var date1=new Date(date);
  var year=date1.getFullYear();
  var month=(1+date1.getMonth()).toString();
  month=month.length>1?month:'0'+month;
  var day=date1.getDate().toString();
  day=day.length>1?day:'0'+day;
  return year+'/'+month+'/'+day;
}

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
      AdminId:0,
      Department:'',
      City:'',
      Gender:'',
      DOB:'',
      Skills:[]

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
    AdminId:this.state.AdminId,
    CityId:this.state.City,
    Department:this.state.Department,
    Gender:this.state.Gender,
    DOB:new Date(this.state.DOB),
    Skills:{results:this.state.Skills}
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
      ManagerId:[],
      City:'',
      Department:'',
      Gender:'',
      DOB:'',
      Skills:[]
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
<Dropdown 
options={this.props.DepartmentOptions}
label='Department'
selectedKey={this.state.Department}
onChange={(_,options)=>this.handleChange('Department',options?.key||'')}
/>
<Dropdown 
options={this.props.CityOptions}
label='City'
selectedKey={this.state.City}
onChange={(_,options)=>this.handleChange('City',options?.key||'')}
/>
<ChoiceGroup 
options={this.props.GenderOptions}
label='Gender'
selectedKey={this.state.Gender}
onChange={(_,options)=>this.handleChange('Gender',options?.key||'')}
/>

<DatePicker
label='Date of Birth'
value={this.state.DOB}
onSelectDate={(e)=>this.setState({DOB:e})}
strings={DatePickerString}
formatDate={FormateDate}
/>
<Dropdown 
options={this.props.SkillsOptions}
label='Skills'
// selectedKey={this.state.City}
defaultSelectedKeys={this.state.Skills}
onChange={this._getSkills}
multiSelect

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
  //Mutlti select dropdown
  private _getSkills=(event:React.FormEvent<HTMLDivElement>,option:IDropdownOption):void=>{
    const selectedkey=option.selected?[...this.state.Skills,option.key as string]:this.state.Skills.filter((key:any)=>key!==option.key);
    this.setState({
      Skills:selectedkey
    })
  }
}
