import * as React from 'react';
// import styles from './UploadFile.module.scss';
import type { IUploadFileProps } from './IUploadFileProps';
import { IUploadFilesState } from './IUploadFileState';
import {Web} from "@pnp/sp/presets/all";
export default class UploadFile extends React.Component<IUploadFileProps,IUploadFilesState> {
  constructor(props:any){
    super(props);
    this.state={
      Attachements:[]
    }
  }

  // upload documents as an attachements
  public async uploadDocuments(){
    try{
      let web=Web(this.props.siteurl);
      const list=web.lists.getByTitle(this.props.ListName);
      //add an empty item first
      const item =await list.items.add({});
      const itemid=item.data.Id;
      //upload each documents
    for (const file of this.state.Attachements){
      const arrayBuffer=await file.arrayBuffer();
      await list.items.getById(itemid).attachmentFiles.add(file.name,arrayBuffer);
      
    }
    console.log("Files uplaod successfully");
    }
    catch(err){
      console.error("Error");
    }
    
  }
  //Event handling
  private handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const files=event.target.files;
    if(files){
      this.setState({Attachements:Array.from(files)})
    }
  }
  public render(): React.ReactElement<IUploadFileProps> {
 

    return (
  
    <div>
    <input type="file" onChange={this.handleChange} multiple/>
    <button onClick={()=>this.uploadDocuments()}>uplaod</button>
    </div>
    
    );
  }
}
