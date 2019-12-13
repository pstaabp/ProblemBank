export default abstract class Model {
  protected abstract  _idAttribute: string;
  protected _attrs: Map<string, any>;
  private _previousAttributes: Map<string, any>;


  constructor(attrs?: {[key: string]: any}, opts?: {parse: boolean}) {
    const _attrs = attrs ? attrs : {};

    // check to see if all of the required fields are present.
    const f = Object.keys(_attrs).filter( (_attr) => this.required_fields().includes(_attr));
    const requiredPresent = f.sort().toString() === this.required_fields().sort().toString();

    if (!requiredPresent) {
      throw new Error(`All fields: ${this.required_fields().join(',')} must be presents in the constructor.`);
    }
    // check to see if the options included fields that aren't part of the model
    const invalidFields = this.checkAttributeNames(_attrs);
    if (invalidFields.length > 0) {
      throw new Error(`The fields: ${invalidFields.join(', ')} are not valid for this object`);
    }
    this._attrs = new Map(Object.entries(this.defaults()));
    this._previousAttributes = new Map();

    if (opts && !opts.parse) {
      const _obj = {};
      Object.assign(_obj, this.defaults(), _attrs);
      this.set(_obj);
    } else {
      this.parse(_attrs);

    }

  }

  // this returns an object of the default key-value pairs.  It should be overridden.
  public abstract defaults(): object;

  // this returns an object of the datatypes of each atrribute.  It needs to be overridden.
  public abstract dataTypes(): {[key: string]: string | RegExp};

  // this returns an array of fields that are required.  This should be overridden
  public abstract required_fields(): string[];


  public getAttributeNames() {
    return [...this._attrs.keys()];
  }

  public getID(): string {  // return the id of the model
    return this._attrs.get(this._idAttribute);
  }

  public get(attr: string): any {
    if (!this.getAttributeNames().includes(attr)) {
      throw new Error(`The field: ${attr} is not valid for this object`);
    }
    return this._attrs.get(attr);
  }

  public getAttributes() {  // return the attributes as an object
    return Array.from(this._attrs).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value })
    ), {});
  }

  public set(opts: string, value: any): Model;
  public set(opts: object): Model;


  public set(opts: string | object, value?: any): object {
    let _opts: { [index: string]: any} = {};
    if (typeof opts === 'string' || opts instanceof String) {
      _opts = {[opts.toString()]: value};
    } else {
      Object.assign(_opts, opts);
    }

    // check to see if the options included fields that aren't part of the model
    const invalidFields = this.checkAttributeNames(_opts);
    if (invalidFields.length > 0) {
      throw new Error(`The fields: ${invalidFields.join(', ')} are not valid for this object`);
    }
    this._previousAttributes = new Map(this._attrs); // copy the current attributes to the previous ones to store.

    for (const attr of Object.keys(_opts)) {
      if (! this.getAttributeNames().includes(attr)) {
        throw new Error(`The field: ${attr} is not valid for this object`);
      }
      this._attrs.set(attr, _opts[attr.toString()]);
    }

    return _opts;
  }

  // this determines what parameter was changed and the old and new values
  public getChanges(): object {
    const diff = {};
    this._attrs.forEach((v, k) => {
      if (v !== this._previousAttributes.get(k)) {
        Object.assign(diff, {[k]: {_old: this._previousAttributes.get(k), _new: this._attrs.get(k)}});
      }
    });
    return diff;
  }

  protected parse(attrs: {[key: string]: any}): void {
    const types: {[key: string]: string | RegExp} = this.dataTypes();
    for (const key of Object.keys(attrs)) {
      const type = types[key];
      if (type === 'string' || type === 'array') {
        this._attrs.set(key, attrs[key]);
      } else if (type === 'integer') {
        this._attrs.set(key, parseInt(attrs[key], 10));
      } else if (type === 'nonnegint') {
        const num = parseInt(attrs[key], 10);
        if (num < 0) {
          throw Error(`Property ${key} should be type nonngative integer.`);
        }
        this._attrs.set(key, num);
        // check if is a regular expression
      } else if (typeof(type) === 'object' && typeof(type.global) === 'boolean' && typeof(type.test) === 'function') {
        if ( (types[key] as RegExp).test(attrs[key])) {
          this._attrs.set(key, attrs[key]);
          } else {
          throw Error(`Property ${key} needs to be valid to ${types[key]}`);
        }
      }
    }
  }


  // this checks that all keys of opts are valid atribute names:
  private checkAttributeNames(opts: object): string[] {
    return Object.keys(opts).filter((_attr) => ! Object.keys(this.defaults()).includes(_attr));
  }

}
