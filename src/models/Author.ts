// import Model from './Model';

export default class Author {
  private author_id: string = '';
  private name: string = '';
  private institution: string = '';
  private email: string = '';

  constructor(opts: { author_id?: string; name?: string; institution?: string; email?: string; } | null) {
      this.author_id = opts && opts.author_id ? opts.author_id : '';
      this.name = opts && opts.name ? opts.name : '';
      this.institution = opts && opts.institution ? opts.institution : '';
      this.email = opts && opts.email ? opts.email : '';
  }

} // class Author
