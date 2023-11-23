import { useAppSelector } from '../../store/hooks';
import AdminGroup from './Admin/AdminGroup';
import UserGroup from './User/UserGroup';

const Group = () => {
  const { isAdmin } = useAppSelector((state) => state.user.userInformation);

  return isAdmin ? <AdminGroup /> : <UserGroup />;
};

export default Group;
