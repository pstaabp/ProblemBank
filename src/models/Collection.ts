import Model from './Model';

export default abstract class Collection<T extends Model> {

  private _models = new Array<T>();

  constructor(items?: T[]) {
    this._models = items === undefined ? [] : items;
    if ([...new Set(this._models.map( (_model) => _model.getID()))].length !==
          this._models.length) {
            throw Error('the items do not have unique ids.');
          }
  }

  // Add the item to the array of models

  public add(item: T): T {
    if (this._models.map( (model) => model.getID()).includes(item.getID())) {
      throw Error('The added item does not have a unique id.');
    }

    if (item) {
      this._models.push(item);
    }
    return item;
  }

  // get an item out of the array or throw an error.

  public get(id: string): T {
    const index = this.findIndexOf(id);
    if (index < 0) {
      throw Error(`The item with id ${id} is not present in the collection`);
    }
    return this._models[index];
  }

  // set the item to the array.  Throw an error if the item.getID() is not present

  public set(item: T): T {
    const index = this.findIndexOf(item.getID());
    if (index < 0) {
      throw Error('The item is not in the current collection');
    }
    this._models[index] = item;
    return item;
  }

  public remove(item: T): T {
    const index = this.findIndexOf(item.getID());
    if (index < 0) {
      throw Error(`The item with id: ${item.getID()} does not exist in the collection.`);
    }
    return this._models.splice(index, 1)[0];
  }

  // the next few methods duplicate some of the features of arrays

  public models(): T[] {
    return this._models.map( (item) => item);
  }

  public map(f: (item: T) => any) {
      return this._models.map( (item) => f(item));
  }

  public filter(f: (item: T) => boolean) {
    return this._models.filter( (item) => f(item));
  }

  public size(): number {
    return this._models.length;
  }

  private findIndexOf(id: string): number {
    return this._models.findIndex( (_item) => _item.getID() === id);
  }

}
