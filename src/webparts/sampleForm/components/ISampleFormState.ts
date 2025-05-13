export interface ISampleFormState{
    Name:string; //Explicitly defined as string
    Email:string; //Explicitly defined as string
    Age:any;// implicitly defined as any
    Score:number;
    FullAddress:any;
    Manager:any;//Mulitple peopelpciker
    ManagerId:any;
   Admin:any; //single people picker
   AdminId:any;
   Department:any;
   Gender:any;
   City:any;
   DOB:any;
   Skills:any;
}