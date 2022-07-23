import {
  AntdLayout,
  Button,
  Col,
  Grid,
  Space,
  Typography,
} from "@pankod/refine-antd";
import { useGetIdentity } from "@pankod/refine-core";
import React from "react";
const { useBreakpoint } = Grid;

export const CustomHeader: React.FC = () => {
  const { Text } = Typography;
  const { data: user } = useGetIdentity();
  //   const { mutate: logout } = useLogout();
  //   const { show } = useNavigation();
  const screens = useBreakpoint();
  //   const [currentId, setCurrentId] = useState<any>();
  //   const [changePasswordModal, setChangePasswordModal] = useState(false);
  //   const accountActions = (
  //     <Menu selectedKeys={['ar']}>
  //       <Menu.Item onClick={() => show('admin', currentId?.id)}>
  //         {'Account Info'}
  //       </Menu.Item>
  //       <Menu.Item onClick={() => setChangePasswordModal(currentId?.id)}>
  //         {'Reset Password'}
  //       </Menu.Item>
  //       <Menu.Item onClick={() => logout()}>{'Logout'}</Menu.Item>
  //     </Menu>
  //   );
  //   const getAccountData = async () =>
  //     setCurrentId(await AccountStore.get('account'));
  return (
    <>
      <AntdLayout.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          //   alignItems: "center",
          backgroundColor: "#fef8e1",
        }}
      >
        {/* <Dropdown overlay={accountActions} onVisibleChange={getAccountData}> */}

        <Text ellipsis strong style={{ display: screens.xs ? "none" : "" }}>
          {"Name: " + user?.name}
        </Text>
        <Text ellipsis strong style={{ display: screens.xs ? "none" : "" }}>
          {"Role: " + user?.role}
        </Text>
      </AntdLayout.Header>
      {/* <ChangePasswordModal
        visible={changePasswordModal}
        setVisible={setChangePasswordModal}
      /> */}
    </>
  );
};
