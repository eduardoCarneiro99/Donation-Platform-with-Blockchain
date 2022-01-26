export interface IRepository {
  save(objectToSave: any): any;

  findById(id: string): any;

  change(changedObject: any): any;
}
