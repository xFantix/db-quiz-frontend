import { GroupList } from '../services/group';

export interface GroupStore {
  groups: GroupList[];
  group: GroupList | null;
}
