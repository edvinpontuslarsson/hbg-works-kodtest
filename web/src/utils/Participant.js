import { v4 as uuid } from 'uuid';

class Participant {
  constructor() {
    this.id = uuid();
    this.name = '';
    this.phone = '';
    this.email = '';
    this.changed = false;
  }
}

export default Participant;
