import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFunctionalComponentProps {
  ListName:string;
    context:WebPartContext;
    siteurl:string;
}
