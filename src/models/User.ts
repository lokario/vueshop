export default class User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  avatar?: string | null;
  address?: string | null;
  phone?: string | null;
  status?: number;
  roleId: number;

  constructor(data: Partial<User>) {
    this.id = data.id!;
    this.uuid = data.uuid!;
    this.name = data.name!;
    this.email = data.email!;
    this.roleId = data.roleId!;
    this.avatar = data.avatar || null;
    this.address = data.address || null;
    this.phone = data.phone || null;
    this.status = data.status || 0;
  }

  isAdmin() {
    return this.roleId === 1;
  }
}
