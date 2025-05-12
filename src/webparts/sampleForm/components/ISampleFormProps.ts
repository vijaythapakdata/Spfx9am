import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISampleFormProps {
  ListName:string;
  context:WebPartContext;
  siteurl:string;
  DepartmentOptions:any; //single select dropdown
  SkillsOptions:any;//multi select dropdown
  GenderOptions:any;//rado button
  CityOptions:any;//lookup

}
