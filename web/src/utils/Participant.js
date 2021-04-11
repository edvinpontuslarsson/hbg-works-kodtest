import { v4 as uuid } from 'uuid';

class Participant {
  /**
   * { id: string, name: string, phone: string, email: string, changed: boolean }
   */
  constructor() {
    this.id = uuid();
    this.name = '';
    this.phone = '';
    this.email = '';
    this.changed = false;
  }
}

export default Participant;
