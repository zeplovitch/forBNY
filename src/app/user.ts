interface User {
  id: string;
  name: string;
  roles: string[];
}

interface Region {
  id: string;
  users: User[];
}


